import { useCallback, useEffect, useState } from "react";

import { failureNotification } from "@/components/notifications/failureNotification";
import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";
import { useAtomValue } from "jotai";
import { userIdAtom } from "@/lib/state/atoms";

export const useSaveDateHeadersToDB = (
  newDateHeaders: string[] | null,
  newDateHeadersError: Error | null | unknown
) => {
  const userId = useAtomValue(userIdAtom);
  const [saveDateHeadersError, setSaveDateHeadersError] = useState<
    Error | null | unknown
  >(null);

  const saveDateHeaders = useCallback(async () => {
    try {
      if (!newDateHeaders || newDateHeaders.length === 0) return;

      for (const dayHeader of newDateHeaders) {
        await saveDayTypeMessage(userId, dayHeader);
      }
    } catch (error) {
      failureNotification(
        "Ha ocurrido un error guardando los mensajes de tipo dia. Por favor, contacte al administrador."
      );

      setSaveDateHeadersError(error);
      console.error("Error saving day type messages:", error);
    }
  }, [newDateHeaders, userId]);

  useEffect(() => {
    if (
      !newDateHeadersError &&
      userId &&
      userId?.length > 0 &&
      newDateHeaders &&
      newDateHeaders?.length > 0
    ) {
      saveDateHeaders();
    }
  }, [newDateHeaders, userId, newDateHeadersError, saveDateHeaders]);

  return { saveDateHeadersError };
};
