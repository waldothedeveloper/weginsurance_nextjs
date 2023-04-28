import { smsFetcherPost } from "@/utils/smsFetcherPost";

export const sendOutboundSMS = async (
  smsMessage: string | undefined,
  phone: string,
  uploadedFiles: string[] | null
) => {
  if (!smsMessage) throw new Error("NO SMS MESSAGE PROVIDED");
  try {
    const res = await smsFetcherPost(
      "/api/messaging/sms/outbound_sms",
      smsMessage,
      phone,
      uploadedFiles
    );

    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
