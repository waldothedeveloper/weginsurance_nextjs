import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { messagesAtom, selectedUserAtom, userIdAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { VirtualizedConversationType } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { isTodayPresentInArray } from "@/utils/isTodayPresentInArray";
import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";

//
export const useGetUserConversations = () => {
  const setMessagesAtom = useSetAtom(messagesAtom);
  const setUserId = useSetAtom(userIdAtom);
  const userId = useAtomValue(userIdAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);
  const messagesFromDB = useAtomValue(messagesAtom);
  const selectedUser = useAtomValue(selectedUserAtom);
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
        unsubscribe = onSnapshot(
          userMessages,
          { includeMetadataChanges: true },
          (querySnapshot) => {
            const messages: DocumentData | VirtualizedConversationType = [];
            querySnapshot.forEach((doc) => {
              messages.push(doc.data());
            });
            setIsLoading(false);
            setMessagesAtom(messages);
          }
        );
      } catch (error: Error | null | unknown) {
        setIsLoading(false);
        setError(error);
      }
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, setMessagesAtom]);

  // this will ALWAYS make sure to put today if today is not present in the user's conversation array
  useEffect(() => {
    if (!isTodayPresentInArray(messagesFromDB)) {
      // save the day type message to the user's conversation sub-collection and save the message to the messages collection
      saveDayTypeMessage(selectedUser);
    }
  }, [messagesFromDB, selectedUser]);

  return { getMessages, isLoading, error };
};
