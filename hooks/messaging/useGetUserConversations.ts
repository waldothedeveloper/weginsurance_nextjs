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
// import { isTodayPresentInArray } from "@/utils/isTodayPresentInArray";
// import { saveDayTypeMessage } from "@/utils/saveDayTypeMessage";
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
  // const messagesFromDB = useAtomValue(messagesAtom);
  const { data: messagesFromTwilioAPI, error: errorFromTwilioAPI } = useSWR(
    key,
    (url) => fetcherPostPhoneNumber(url[0], selectedUser?.phone || null)
  );

  //TODO:  this needs to be modified, it's not working as expected, so it's commented for now
  // useEffect(() => {
  //   if (!isTodayPresentInArray(messagesFromDB) && messagesFromDB.length > 0) {
  //     saveDayTypeMessage(userId);
  //   }
  // }, [messagesFromDB, userId]);

  // this will set everything back to zero when you leave conversations
  useEffect(() => {
    if (!router?.query?.dashboard?.includes("messages")) {
      setUserId(null);
      setKey(null);
      setMessagesAtom([]);
      setSelectedUser(null);
    }
  }, [router, setUserId, setKey, setMessagesAtom, setSelectedUser]);

  // this will save messages from Twilio API to firestore db
  useEffect(() => {
    const saveMessagesToFirestore = async () =>
      await saveMessagesToClientConversations(userId, messagesFromTwilioAPI);
    if (
      messagesFromTwilioAPI &&
      messagesFromTwilioAPI.length > 0 &&
      userId &&
      userId.length > 0
    ) {
      try {
        setIsLoading(true);
        saveMessagesToFirestore();
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
      setIsLoading(false);
    }
  }, [messagesFromTwilioAPI, userId]);

  // this will get messages from firestore db
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
          // do not get messages from Twilio API if we already have messages in the firestore sub-collection
          setKey(null);
        } else {
          //! if there are no messages in the firestore sub-collection, MAKE SURE you set the messagesAtom to an empty array, because if you don't, the messagesAtom will be set to the previous messages from the previous user, if there were any
          setMessagesAtom([]);
          if (userId && userId.length > 0) {
            setKey(["/api/messaging/sms/retrieve_sms", userId]);
          }
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError(error);
      // console.error("Error setting up Firestore listener:", error);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, setMessagesAtom, setSelectedUser]);

  return { getMessages, isLoading, error, errorFromTwilioAPI };
};
