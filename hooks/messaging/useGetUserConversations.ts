import { NextRouter, useRouter } from "next/router";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { messagesAtom, selectedUserAtom, userIdAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";
import { fetcherPostPhoneNumber } from "@/utils/fetcherPostPhoneNumber";
import { isTodayPresentInArray } from "@/utils/isTodayPresentInArray";
import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";
import { saveMessagesToClientConversations } from "@/utils/saveMessagesToClientConversations";
import useSWR from "swr";

//
export const useGetUserConversations = () => {
  const router: NextRouter = useRouter();
  const setMessagesAtom = useSetAtom(messagesAtom);
  const setUserId = useSetAtom(userIdAtom);
  const userId = useAtomValue(userIdAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);
  const selectedUser = useAtomValue(selectedUserAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const [key, setKey] = useState<[string, string | null] | null>(null);

  const getMessages = async (userId: string) => {
    if (!userId || userId?.length === 0) throw new Error("userId is required");
    setUserId(userId);
  };
  const messagesFromDB = useAtomValue(messagesAtom);
  const { data: messagesFromTwilioAPI, error: errorFromTwilioAPI } = useSWR(
    key,
    (url) => fetcherPostPhoneNumber(url[0], selectedUser?.phone || null)
  );

  useEffect(() => {
    if (!isTodayPresentInArray(messagesFromDB) && messagesFromDB.length > 0) {
      saveDayTypeMessage(userId);
    }
  }, [messagesFromDB, userId]);

  useEffect(() => {
    if (!router?.query?.dashboard?.includes("messages")) {
      setUserId(null);
      setKey(null);
      setMessagesAtom([]);
      setSelectedUser(null);
    }
  }, [router, setUserId, setKey, setMessagesAtom, setSelectedUser]);

  useEffect(() => {
    if (
      messagesFromTwilioAPI &&
      messagesFromTwilioAPI.length > 0 &&
      userId &&
      userId.length > 0
    ) {
      saveMessagesToClientConversations(userId, messagesFromTwilioAPI);
    }
  }, [messagesFromTwilioAPI, userId]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    try {
      setIsLoading(true);
      const q = query(
        collection(db, `Users/${userId}/conversations`),
        orderBy("dateCreated", "asc")
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setMessagesAtom(
            querySnapshot.docs.map((doc) => {
              return doc.data();
            })
          );
          setKey(null);
        } else {
          if (userId && userId.length > 0) {
            setKey(["/api/messaging/sms/retrieve_sms", userId]);
          }
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Error setting up Firestore listener:", error);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, setMessagesAtom]);

  return { getMessages, isLoading, error, errorFromTwilioAPI };
};
