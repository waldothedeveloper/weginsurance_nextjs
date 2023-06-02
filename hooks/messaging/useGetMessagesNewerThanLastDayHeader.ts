import { Day, Message } from "@/interfaces/index";
import { messagesAtom, userIdAtom } from "@/lib/state/atoms";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { excludeRepeatedDateHeaders } from "@/utils/excludeRepeatedDateHeaders";
import { failureNotification } from "@/components/notifications/failureNotification";
import { useAtomValue } from "jotai";

export const useGetMessagesNewerThanLastDayHeader = (
  dateHeaders: Day[] | null,isLoadingDayHeader: boolean, dayHeaderError: Error | null | unknown
) => {
  const [isLoadingNewDateHeaders, setIsLoadingNewDateHeaders] = useState(false);
  const [newDateHeaders, setNewDateHeaders] = useState<string[] | null>(null);
  const [newDateHeadersError, setNewDateHeadersError] = useState<
    Error | null | unknown
  >(null);
  const userId = useAtomValue(userIdAtom);
  const messagesFromDB = useAtomValue(messagesAtom);
  //
  useEffect(() => {
    if(dayHeaderError) return
    if (
      userId &&
      userId.length > 0 &&
      dateHeaders &&
      dateHeaders.length > 0 &&
      !isLoadingDayHeader &&
      !messagesFromDB?.length
    ) {
      try {
        setIsLoadingNewDateHeaders(true);
        const newDateHeaders = messagesFromDB.filter((message: Message) => {
          const lastDateHeader =
            dateHeaders[dateHeaders.length - 1].dateCreated;

          return (
            dayjs(message.dateCreated).format("YYYY-MM-DD") > lastDateHeader
          );
        });
        // this will take care of the repeated date headers, so that we save only the new ones
        const dateHeadersToCreate = excludeRepeatedDateHeaders(newDateHeaders);
        setNewDateHeaders(dateHeadersToCreate);
      } catch (error) {
        failureNotification(`Error obteniendo mensajes mas recientes que la ultima fecha de date header. Por favor informar al administrador. ${error}`);
        setIsLoadingNewDateHeaders(false);
        setNewDateHeadersError(error);
      }
    }

    return () => {
      setNewDateHeaders(null);
      setIsLoadingNewDateHeaders(false);
      setNewDateHeadersError(null);
    };
  }, [userId, dateHeaders, messagesFromDB, isLoadingDayHeader, dayHeaderError]);

  return { newDateHeaders, isLoadingNewDateHeaders, newDateHeadersError };
};
