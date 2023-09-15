import { Day, Message, VirtualizedConversationType } from "@/interfaces/index";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { excludeRepeatedDateHeaders } from "@/utils/excludeRepeatedDateHeaders";
import { failureNotification } from "@/components/notifications/failureNotification";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

export const useGetMessagesNewerThanLastDayHeader = (
  dateHeaders: Day[] | null,
  isLoadingDayHeader: boolean,
  dayHeaderError: Error | null | unknown,
  messages: VirtualizedConversationType | null
) => {
  // const [isLoadingNewDateHeaders, setIsLoadingNewDateHeaders] = useState(false);
  const [newDateHeaders, setNewDateHeaders] = useState<string[] | null>(null);
  const [newDateHeadersError, setNewDateHeadersError] = useState<
    Error | null | unknown
  >(null);
  const selectedUser = useAtomValue(selectedUserAtom);

  //
  useEffect(() => {
    if (dayHeaderError) return;
    if (
      selectedUser &&
      selectedUser?.id &&
      dateHeaders &&
      dateHeaders.length > 0 &&
      messages &&
      messages?.length > 0
    ) {
      try {
        // setIsLoadingNewDateHeaders(true);
        const newDateHeaders = messages.filter((message: Message | Day) => {
          const lastDateHeader =
            dateHeaders[dateHeaders.length - 1]?.dateCreated;

          if (lastDateHeader) {
            return (
              dayjs(message.dateCreated).format("YYYY-MM-DD") > lastDateHeader
            );
          }
        });
        // this will take care of the repeated date headers, so that we save only the new ones
        const dateHeadersToCreate = excludeRepeatedDateHeaders(newDateHeaders);
        setNewDateHeaders(dateHeadersToCreate);
      } catch (error) {
        failureNotification(
          `Error obteniendo mensajes mas recientes que la ultima fecha de date header. Por favor informar al administrador. ${error}`
        );
        // setIsLoadingNewDateHeaders(false);
        setNewDateHeadersError(error);
      }
    }

    return () => {
      setNewDateHeaders(null);
      // setIsLoadingNewDateHeaders(false);
      setNewDateHeadersError(null);
    };
  }, [selectedUser, dateHeaders, messages, dayHeaderError]);

  return { newDateHeaders, newDateHeadersError };
};
//
