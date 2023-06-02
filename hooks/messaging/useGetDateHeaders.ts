import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Day } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { failureNotification } from "@/components/notifications/failureNotification";
import { useAtomValue } from "jotai";
import { userIdAtom } from "@/lib/state/atoms";

//
export const useGetDateHeaders = () => {
  const [isLoadingDayHeader, setIsLoadingDayHeader] = useState(false);
  const [dateHeaders, setDateHeaders] = useState<Day[] | null>(
    []
  );
  const [dayHeaderError, setDayHeaderError] = useState<Error | null | unknown>(
    null
  );
  const userId = useAtomValue(userIdAtom);
  // this gets the date headers from the firestore sub-collection
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    if (userId && userId.length > 0) {
      try {
        setIsLoadingDayHeader(true);
        const q = query(
          collection(db, `Users/${userId}/conversations`),
          where("type", "==", "day"),
          orderBy("dateCreated", "asc")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            setDateHeaders(
              querySnapshot.docs.map((doc) => {
                return doc.data() as Day;
              })
            );
          } else {
            //! if there are no messages in the firestore sub-collection, MAKE SURE you set the messagesAtom to an empty array, because if you don't, the messagesAtom will be set to the previous messages from the previous user, if there were any
            setDateHeaders(null);
          }
          setIsLoadingDayHeader(false);
        });
      } catch (error) {
        failureNotification(`Ha ocurrido un error obteniendo los date headers desde la base de datos. Por favor, contacte al administrador. ${error}`)
        setIsLoadingDayHeader(false);
        setDayHeaderError(error);
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
        setDateHeaders(null);
      }
    };
  }, [userId]);

  return { dateHeaders, isLoadingDayHeader, dayHeaderError };
};
