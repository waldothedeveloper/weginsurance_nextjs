import { useCallback, useEffect, useState } from "react";

import { failureNotification } from "@/components/notifications/failureNotification";
import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

export const useSaveDateHeadersToDB = (
  newDateHeaders: string[] | null,
  newDateHeadersError: Error | null | unknown
) => {
  const [saveDateHeadersError, setSaveDateHeadersError] = useState<
    Error | null | unknown
  >(null);
  const selectedUser = useAtomValue(selectedUserAtom);
  const saveDateHeaders = useCallback(async () => {
    try {
      if (!newDateHeaders || newDateHeaders.length === 0) return;

      for (const dayHeader of newDateHeaders) {
        await saveDayTypeMessage(selectedUser?.id, dayHeader);
      }
    } catch (error) {
      failureNotification(
        "Ha ocurrido un error guardando los mensajes de tipo dia. Por favor, contacte al administrador."
      );

      setSaveDateHeadersError(error);
      console.error("Error saving day type messages:", error);
    }
  }, [newDateHeaders, selectedUser]);

  useEffect(() => {
    if (
      !newDateHeadersError &&
      selectedUser &&
      selectedUser?.id &&
      newDateHeaders &&
      newDateHeaders?.length > 0
    ) {
      saveDateHeaders();
    }
  }, [newDateHeaders, selectedUser, newDateHeadersError, saveDateHeaders]);

  return { saveDateHeadersError };
};
