import {
  messagesListAtom,
  numberOfFilesUploadedAtom,
  sendingSMSAtom,
  userPhoneAtom,
} from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { Editor } from "@tiptap/react";
import React from "react";
import { e164Regex } from "@/utils/e164Regex";
import { failureNotification } from "@/components/notifications/failureNotification";
import { newOutboundSMSHandler } from "@/utils/newOutboundSMSHandler";
import { sendOutboundSMS } from "@/utils/sendOutboundSMS";
import { uploadedFilesAtom } from "@/lib/state/atoms";

export const useHandleOutboundSMS = () => {
  const phone = useAtomValue(userPhoneAtom);
  const setIsNotSendingSMS = useSetAtom(sendingSMSAtom);
  const setMessagesList = useSetAtom(messagesListAtom);
  const listOfLocalMessages = useAtomValue(messagesListAtom);
  const uploadedFiles = useAtomValue(uploadedFilesAtom);
  const setUploadedFiles = useSetAtom(uploadedFilesAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);

  const handleSubmit = async (
    event: React.SyntheticEvent,
    trigger: any,
    editor: Editor | null
  ) => {
    if (event) event.preventDefault();
    const smsMessage = editor?.view?.dom?.innerText?.trim();
    const smsMessageWithAttachment = editor?.view?.dom?.innerText?.trim();

    try {
      if (!e164Regex.test(phone)) {
        throw new Error("THIS PHONE NUMBER DOESN'T MATCH THE E164 FORMAT");
      } else {
        setIsNotSendingSMS(false);

        if (uploadedFiles && uploadedFiles.length > 0) {
          const urlsArray = uploadedFiles.map((file) => file.url);
          // step 1. it it's crucial to sent the message first and then update the local cache after the message has been sent
          await sendOutboundSMS(smsMessageWithAttachment, phone, urlsArray)
            .then((message) => {
              // clear the uploaded files array
              setNumberOfFilesUploaded(0);
              // step 2. update the local cache => this fn is just calling the trigger from SWR useSWRMutation() hook
              trigger(phone, {
                optimisticData: () => {
                  const newSMS = newOutboundSMSHandler(
                    listOfLocalMessages,
                    smsMessageWithAttachment,
                    phone
                  );
                  if (newSMS) setMessagesList(newSMS);
                  return newSMS;
                },
                rollbackOnError: false,
                populateCache: true,
                onSuccess: () => setIsNotSendingSMS(true),
                onError: () => setIsNotSendingSMS(true),
              });
              // clear the editor to have it ready for the next message
              editor?.commands?.clearContent();
              // clear the uploaded files array
              setUploadedFiles([]);
              return message;
            })
            .catch((err) => {
              setIsNotSendingSMS(true);
              failureNotification(
                "Ha ocurrido un error al intentar enviar el SMS. Intentelo nuevamente. Si el error persiste contacte al soporte tecnico."
              );
              return err;
            });
        } else {
          if (!smsMessage || smsMessage.length === 0) {
            throw new Error("NO SMS MESSAGE PROVIDED");
          }

          // step 1. it it's crucial to sent the message first and then update the local cache after the message has been sent
          await sendOutboundSMS(smsMessage, phone, null)
            .then((message) => {
              // step 2. update the local cache => this fn is just calling the trigger from SWR useSWRMutation() hook
              trigger(phone, {
                optimisticData: () => {
                  const newSMS = newOutboundSMSHandler(
                    listOfLocalMessages,
                    smsMessage,
                    phone
                  );
                  if (newSMS) setMessagesList(newSMS);
                  return newSMS;
                },
                rollbackOnError: false,
                populateCache: true,
                onSuccess: () => setIsNotSendingSMS(true),
                onError: () => setIsNotSendingSMS(true),
              });
              // clear the editor to have it ready for the next message
              editor?.commands?.clearContent();
              return message;
            })
            .catch((err) => {
              setIsNotSendingSMS(true);
              failureNotification(
                "Ha ocurrido un error al intentar enviar el SMS. Intentelo nuevamente. Si el error persiste contacte al soporte tecnico."
              );
              return err;
            });
        }
      }
    } catch (error) {
      // TODO: PLEASE MAKE SURE TO HANDLE THIS ERROR PROPERLY!!!!!!!!!! I WOULD LIKE SOMETHING LIKE AN ALERT BOX TO POP UP AND TELL THE USER THAT THE PHONE NUMBER IS NOT VALID
      failureNotification(
        "Ha ocurrido un error al intentar enviar el SMS. Intentelo nuevamente. Si el error persiste contacte al soporte tecnico."
      );
      return error;
    }
  };

  return { handleSubmit };
};
//
