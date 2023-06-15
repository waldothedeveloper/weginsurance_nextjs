import {
  Day,
  FakeUser,
  Message,
  RealUser,
  VirtualizedConversationType,
} from "@/interfaces/index";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";
import { failureNotification } from "@/components/notifications/failureNotification";

export const useGetRealTimeUserConversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);
  const [messages, setMessages] = useState<VirtualizedConversationType | null>(
    null
  );
  const [user, setUser] = useState<RealUser | FakeUser | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    if (user) {
      setIsLoading(true);
      setMessages([]);
      try {
        const currUserQuery = query(
          collection(db, `Users/${user?.id}/conversations`),
          orderBy("dateCreated", "asc")
        );
        unsubscribe = onSnapshot(
          currUserQuery,
          (querySnapshot) => {
            if (querySnapshot.empty) {
              setMessages([]);
            } else {
              setMessages(
                querySnapshot.docs.map((doc) => {
                  return doc.data() as Message | Day;
                })
              );
            }

            setIsLoading(false);
          },
          (error) => {
            // if the listener fails
            setIsLoading(false);
            setError(error);
          }
        );
      } catch (error) {
        failureNotification(
          `Error trayendo los mensajes desde la base de datos: ${error}`
        );
        setIsLoading(false);
        setError(error);
      }
    }
    setIsLoading(false);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return { isLoading, error, messages, setUser, setMessages };
};
