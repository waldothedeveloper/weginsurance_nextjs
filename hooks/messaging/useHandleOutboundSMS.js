import { e164Regex } from "@/utils/e164Regex";
import { failureNotification } from "@/components/notifications/failureNotification";
import { smsFetcherPost } from "@/utils/smsFetcherPost";
import { useAtomValue } from "jotai";
import { userPhoneAtom } from "@/lib/state/atoms";
//
export const useHandleOutboundSMS = (editor) => {
  const phone = useAtomValue(userPhoneAtom);

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
        // console.log(`THIS PHONE NUMBER DOESN'T MATCH THE E164 FORMAT`);
        throw new Error(`THIS PHONE NUMBER DOESN'T MATCH THE E164 FORMAT`);
        //
      } else {
        return sendOutboundSMS(smsMessage)
          .then((data) => {
            editor.commands.clearContent();
            return data;
          })
          .catch((err) => {
            failureNotification(
              `Ha ocurrido un error al intentar enviar el SMS. Intentelo nuevamente. Si el error persiste contacte al soporte tecnico.`
            );
            return err;
          });
      }
    } catch (error) {
      // TODO: PLEASE MAKE SURE TO HANDLE THIS ERROR PROPERLY!!!!!!!!!! I WOULD LIKE SOMETHING LIKE AN ALERT BOX TO POP UP AND TELL THE USER THAT THE PHONE NUMBER IS NOT VALID
      failureNotification(
        `Ha ocurrido un error al intentar enviar el SMS. Intentelo nuevamente. Si el error persiste contacte al soporte tecnico.`
      );
      return error;
    }
  };

  return { handleSubmit };
};
