/* eslint-disable react-hooks/rules-of-hooks */
import { smsFetcherPost } from "@/utils/smsFetcherPost";

//
export const sendOutboundSMS = async (smsMessage: string, phone: string) => {
  try {
    const res = await smsFetcherPost(
      "/api/messaging/sms/outbound_sms",
      smsMessage,
      phone
    );

    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
