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
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

//
export const useGetDateHeaders = () => {
  const [isLoadingDayHeader, setIsLoadingDayHeader] = useState(false);
  const [dateHeaders, setDateHeaders] = useState<Day[] | null>([]);
  const [dayHeaderError, setDayHeaderError] = useState<Error | null | unknown>(
    null
  );
  const selectedUser = useAtomValue(selectedUserAtom);
  // this gets the date headers from the firestore sub-collection
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    if (selectedUser && selectedUser?.id) {
      try {
        setIsLoadingDayHeader(true);
        const q = query(
          collection(db, `Users/${selectedUser?.id}/conversations`),
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
            setDateHeaders(null);
          }
          setIsLoadingDayHeader(false);
        });
      } catch (error) {
        failureNotification(
          `Ha ocurrido un error obteniendo los date headers desde la base de datos. Por favor, contacte al administrador. ${error}`
        );
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
  }, [selectedUser]);

  return { dateHeaders, isLoadingDayHeader, dayHeaderError };
};
