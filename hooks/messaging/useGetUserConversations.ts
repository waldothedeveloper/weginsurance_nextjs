import { NextRouter, useRouter } from "next/router";
import { useAtomValue, useSetAtom } from "jotai";

import { selectedUserAtom } from "@/lib/state/atoms";
import { useEffect } from "react";
import { useGetDateHeaders } from "@/hooks/messaging/useGetDateHeaders";
import { useGetMessagesFromTwilio } from "@/hooks/messaging/useGetMessagesFromTwilio";
import { useGetMessagesNewerThanLastDayHeader } from "@/hooks/messaging/useGetMessagesNewerThanLastDayHeader";
import { useGetRealTimeUserConversations } from "@/hooks/messaging/useGetRealTimeUserConversations";
import { useSaveDateHeadersToDB } from "@/hooks/messaging/useSaveDateHeadersToDB";
import { useSaveMessagesFromTwilioToDatabase } from "@/hooks/messaging/useSaveMessagesFromTwilioToDatabase";

export const useGetUserConversations = () => {
  const router: NextRouter = useRouter();
  const selectedUser = useAtomValue(selectedUserAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);

  // get messages from database
  const { isLoading, error, messages, setUser, setMessages } =
    useGetRealTimeUserConversations();

  // get date headers from database
  const { dateHeaders, isLoadingDayHeader, dayHeaderError } =
    useGetDateHeaders();

  // get messages newer than the last date headers from the database
  const { newDateHeaders, newDateHeadersError } =
    useGetMessagesNewerThanLastDayHeader(
      dateHeaders,
      isLoadingDayHeader,
      dayHeaderError,
      messages
    );

  // save date headers to database
  const { saveDateHeadersError } = useSaveDateHeadersToDB(
    newDateHeaders,
    newDateHeadersError
  );

  // get messages from Twilio API
  const {
    setKey,
    messagesFromTwilioAPI,
    errorFromTwilioAPI,
    isLoadingMessagesFromTwilioAPI,
  } = useGetMessagesFromTwilio();

  // Handle logic to either get the messages from Twilio API or from the database
  useEffect(() => {
    setKey(null);
    setUser(null);
    setMessages(null);
    if (selectedUser && !selectedUser?.firstTimeVisit) {
      setKey(["/api/messaging/sms/retrieve_sms", selectedUser?.id]);
    } else {
      setUser(selectedUser);
    }
  }, [selectedUser, setKey, setSelectedUser, setUser, setMessages]);

  // Save messages from Twilio API to the database
  const { isSavingMessagesToDb, errorSavingMessagesToDb } =
    useSaveMessagesFromTwilioToDatabase(messagesFromTwilioAPI, setKey, setUser);

  // Cleanup function to reset the selected user when we leave the messages dashboard
  useEffect(() => {
    if (!router?.query?.dashboard?.includes("messages")) {
      setSelectedUser(null);
      setKey(null);
      setUser(null);
      setMessages(null);
    }
  }, [router, setKey, setSelectedUser, setUser, setMessages]);

  return {
    messages,
    isLoading,
    error,
    isLoadingMessagesFromTwilioAPI,
    errorFromTwilioAPI,
    isSavingMessagesToDb,
    errorSavingMessagesToDb,
    saveDateHeadersError,
  };
};
