import { useEffect, useState } from "react";

import { failureNotification } from "@/components/notifications/failureNotification";
import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";
import { useAtomValue } from "jotai";
import { userIdAtom } from "@/lib/state/atoms";

export const useSaveDateHeadersToDB = (
  newDateHeaders: string[] | null,
  isLoadingNewDateHeaders: boolean,
  newDateHeadersError: Error | null | unknown
) => {
  const userId = useAtomValue(userIdAtom);
  const [saveDateHeadersError, setSaveDateHeadersError] = useState<
    Error | null | unknown
  >(null);

  useEffect(() => {
    const saveDateHeaders = async () => {
      try {
        if (!newDateHeaders?.length) return;
        await Promise.all(
          newDateHeaders.map((date: string) => saveDayTypeMessage(userId, date))
        );
      } catch (error) {
        failureNotification(
          "Ha ocurrido un error guardando los mensajes de tipo dia. Por favor, contacte al administrador."
        );

        setSaveDateHeadersError(error);
        console.error("Error saving day type messages:", error);
      }
    };

    if (!isLoadingNewDateHeaders && !newDateHeadersError && userId?.length)
      saveDateHeaders();
  }, [newDateHeaders, userId, isLoadingNewDateHeaders, newDateHeadersError]);

  return { saveDateHeadersError };
};
