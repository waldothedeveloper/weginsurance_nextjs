import { client } from "@/lib/twilio/config";
// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint
export default async function handler(req, res) {
  const { message_body, user_phone } = req?.body || null;

  if (req.method !== `POST`) {
    return res
      .status(404)
      .json({ message: `This endpoint requires a POST request!` });
  }

  if (!message_body) {
    return res
      .status(500)
      .json({ message: "A valid message body is required!", status: 500 });
  }

  if (!user_phone) {
    return res.status(404).json({
      message: "A valid client user phone number is required!",
      status: 400,
    });
  }
  try {
    const response = await client.messages
      .create({
        body: message_body,
        from: process.env.WEG_INSURANCE_TWILIO_NUMBER,
        to: user_phone,
        statusCallback:
          process.env.NODE_ENV !== "production"
            ? process.env.TWILIO_SMS_CALLBACK_URL_DEVELOPMENT
            : process.env.TWILIO_SMS_CALLBACK_URL_PRODUCTION,
      })
      .then((message) => message);

    return res.status(200).json({
      status: response.status,
      error_message: response.error_message,
      error_code: response.error_code,
      sid: response.sid,
      date_sent: response.date_sent,
    });
  } catch (error) {
    // console.log("ERROR SENDING SMS MESSAGE: ", error);
    return res.status(500).json({
      message: "Our system has detected an unexpected error.",
      status: error?.status || 500,
      error: error,
    });
  }
}

/*

Messages sent to a US number will have a status of queued, sent, or failed. Messages sent to an international number will have a status of queued, sending, sent, or failed. The status of a message can be checked by making a GET request to the message resource. The status of a message can be one of the following:    

  queued
  failed
  sent
  delivered
  undelivered
  
*/
