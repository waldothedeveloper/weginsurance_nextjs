import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";

//! this is not needed anymore
export const useWriteUpdatesToConversationsSubCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [newMessage, setNewMessage] = useState<unknown[]>([]);
  console.log(`new Message`, newMessage);
  console.log(`error`, error);

  //
  useEffect(() => {
    let unsubscribe: any = null;

    try {
      const messagesQuery = query(collection(db, "messages"));
      unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const newMessage: unknown[] = [];
        querySnapshot.forEach((doc) => {
          newMessage.push(doc.data());
        });

        setIsLoading(false);
        setNewMessage(newMessage);
      });
    } catch (error: Error | null | unknown) {
      setIsLoading(false);
      setError(error);
    }

    return () => {
      console.log(`about to unsubscribe from getMessages`);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { isLoading, error, newMessage };
};
