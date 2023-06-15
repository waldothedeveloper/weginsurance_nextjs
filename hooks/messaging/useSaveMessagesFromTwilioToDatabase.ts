import { FakeUser, RealUser } from "@/interfaces/index";
import React, { useEffect, useState } from "react";

import { failureNotification } from "@/components/notifications/failureNotification";
import { makeFirstTimeVisitTrue } from "@/utils/makeFirstTimeVisitTrue";
import { saveMessagesToClientConversations } from "@/utils/saveMessagesToClientConversations";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

export const useSaveMessagesFromTwilioToDatabase = (
  messagesFromTwilioAPI: [],
  setKey: React.Dispatch<React.SetStateAction<[string, string | null] | null>>,
  setUser: React.Dispatch<React.SetStateAction<RealUser | FakeUser | null>>
) => {
  const [isSavingMessagesToDb, setIsSavingMessagesToDb] = useState(false);
  const [errorSavingMessagesToDb, setErrorSavingMessagesToDb] = useState<
    Error | unknown | null
  >(null);
  const selectedUser = useAtomValue(selectedUserAtom);

  //
  useEffect(() => {
    const saveMessagesToFirestore = async () => {
      try {
        await saveMessagesToClientConversations(
          selectedUser?.id,
          messagesFromTwilioAPI
        );
      } catch (error) {
        return error;
      }
    };
    if (
      messagesFromTwilioAPI &&
      messagesFromTwilioAPI.length > 0 &&
      selectedUser
    ) {
      try {
        setIsSavingMessagesToDb(true);
        saveMessagesToFirestore()
          .then(() => {
            // stop getting messages from twilio api
            setKey(null);
            // put the firstTimeVisit to TRUE
            makeFirstTimeVisitTrue(selectedUser);
            // set the user to activate the real-time listener db
            setUser(selectedUser);
          })
          .catch((error) => {
            failureNotification(
              `Error tratando de salvar los mensajes a la base de datos desde Twilio: ${error}`
            );
            setErrorSavingMessagesToDb(error);
            return error;
          });
      } catch (error) {
        failureNotification(
          `Error tratando de salvar los mensajes a la base de datos desde Twilio: ${error}`
        );
        setIsSavingMessagesToDb(false);
        setErrorSavingMessagesToDb(error);
      }
      setIsSavingMessagesToDb(false);
    } else {
      // this covers the case when the user has no messages from the Twilio API or database, so this is basically a new conversation with a new user most likely
      if (
        Array.isArray(messagesFromTwilioAPI) &&
        messagesFromTwilioAPI.length === 0
      ) {
        // stop getting messages from twilio api
        setKey(null);
        // put the firstTimeVisit to TRUE
        makeFirstTimeVisitTrue(selectedUser);
        // set the user to activate the real-time listener db
        setUser(selectedUser);
      }
    }
  }, [messagesFromTwilioAPI, selectedUser, setKey, setUser]);

  return { isSavingMessagesToDb, errorSavingMessagesToDb };
};
