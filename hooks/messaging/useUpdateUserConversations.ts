import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { messagesAtom, selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { VirtualizedConversationType } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";

//! this is not needed anymore
export const useUpdateUserConversations = () => {
  const [error, setError] = useState<Error | null | unknown>(null);
  const selectedUser = useAtomValue(selectedUserAtom);
  const setMessagesAtom = useSetAtom(messagesAtom);

  //
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    try {
      const messagesQuery = query(
        collection(db, "messages"),
        where("to", "==", selectedUser?.phone),
        orderBy("dateCreated", "desc"),
        limit(1)
      );
      unsubscribe = onSnapshot(
        messagesQuery,
        { includeMetadataChanges: true },
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";

            if (source === "Local") {
              setMessagesAtom((messages: VirtualizedConversationType) => [
                ...messages,
                doc.data(),
              ]);
            }
          });
        }
      );
    } catch (error: Error | null | unknown) {
      setError(error);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedUser, setMessagesAtom]);

  return { error };
};
