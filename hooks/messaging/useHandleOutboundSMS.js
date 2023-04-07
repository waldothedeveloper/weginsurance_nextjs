import { sendingSMSAtom, userPhoneAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { e164Regex } from "@/utils/e164Regex";
import { failureNotification } from "@/components/notifications/failureNotification";
import { messagesListAtom } from "@/lib/state/atoms";
import { nanoid } from "nanoid";
import { smsFetcherPost } from "@/utils/smsFetcherPost";

//
export const useHandleOutboundSMS = (editor, updateLocalMessagesCache) => {
  const messagesList = useAtomValue(messagesListAtom);
  const phone = useAtomValue(userPhoneAtom);
  const setIsNotSendingSMS = useSetAtom(sendingSMSAtom);

  const newSMSSentToUpdateLocalCache = (smsMessage) => {
    const dateSent = new Date().toUTCString().slice(0, -10).toString();
    const newSMSSent = {
      dateCreated: dateSent,
      body: smsMessage,
      to: phone,
      status: "sent",
      direction: "outbound-api",
      sid: nanoid(),
    };

    const newLocalMessages = messagesList;
    newLocalMessages[dateSent] = [newSMSSent];

    return newLocalMessages;
  };

  // handle the outbout sms
  const sendOutboundSMS = async (smsMessage) => {
    const res = await smsFetcherPost(
      "/api/messaging/sms/outbound_sms",
      smsMessage,
      phone
    );

    return res;
  };

  // handle the submit of the outbound sms
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const smsMessage = editor?.view?.dom?.innerText;

    try {
      if (!smsMessage || smsMessage.trim().length === 0) {
        return;
      } else if (!e164Regex.test(phone)) {
        throw new Error("THIS PHONE NUMBER DOESN'T MATCH THE E164 FORMAT");
      } else {
        setIsNotSendingSMS(false);
        // step 1. it it's crucial to sent the message first and then update the local cache after the message has been sent
        return sendOutboundSMS(smsMessage)
          .then((message) => {
            editor.commands.clearContent();
            // step 2. update the local cache => this fn is just calling the trigger from SWR useSWRMutation() hook
            updateLocalMessagesCache(phone, {
              optimisticData: newSMSSentToUpdateLocalCache(smsMessage),
              rollbackOnError: true,
              onSuccess: () => setIsNotSendingSMS(true),
              onError: () => setIsNotSendingSMS(true),
            });
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
