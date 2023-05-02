import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { messagesAtom, userIdAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { VirtualizedConversationType } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";

//
export const useGetMessagesFromDB = () => {
  const setMessagesAtom = useSetAtom(messagesAtom);
  const setUserId = useSetAtom(userIdAtom);
  const userId = useAtomValue(userIdAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  //
  const getMessages = async (userId: string) => {
    if (!userId || userId?.length === 0) throw new Error("userId is required");
    setUserId(userId);
  };

  useEffect(() => {
    let unsubscribe: any = null;

    if (userId && userId.length > 0) {
      try {
        const userMessages = query(
          collection(db, `Users/${userId}/conversations`),
          orderBy("dateCreated", "asc")
        );

        setIsLoading(true);
        unsubscribe = onSnapshot(userMessages, (querySnapshot) => {
          const messages: DocumentData | VirtualizedConversationType = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          setIsLoading(false);
          setMessagesAtom(messages);
        });
      } catch (error: Error | null | unknown) {
        setIsLoading(false);
        setError(error);
      }
    }
    return () => {
      // console.log(`about to unsubscribe from getMessages`);
      if (unsubscribe) unsubscribe();
    };
  }, [userId, setMessagesAtom]);

  return { getMessages, isLoading, error };
};
