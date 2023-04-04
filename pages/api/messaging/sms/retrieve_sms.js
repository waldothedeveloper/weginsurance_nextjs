import { groupBy, sortBy } from "underscore";

import { client } from "@/lib/twilio/config";

// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint

export default async function handler(req, res) {
  const { user_phone } = req?.body || null;

  if (req.method !== `POST`) {
    return res
      .status(404)
      .json({ message: `This endpoint requires a POST request!` });
  }

  if (!user_phone) {
    return res.status(500).json({
      message: "A valid client user user_phone number is required!",
      status: 500,
    });
  }

  try {
    // get me all messages SENT from WEG INSURANCE to this user
    const smsFromApptoUser = await client.messages
      .list({
        from: process.env.WEG_INSURANCE_TWILIO_NUMBER,
        to: user_phone,
      })
      .then((data) => data)
      .catch((err) => {
        // console.log(
        //   "ERROR RETRIEVING SMS MESSAGES SENT FROM APP TO USER: ",
        //   err
        // );
        return res.status(500).json({
          message: "Our system has detected an unexpected error.",
          status: err?.status || 500,
          error: err,
        });
      });

    // get me all messages RECEIVED from this user to APP
    const smsFromUserToApp = await client.messages
      .list({
        from: user_phone,
        to: process.env.WEG_INSURANCE_TWILIO_NUMBER,
      })
      .then((data) => data)
      .catch((err) => {
        // console.log(
        //   "ERROR RETRIEVING SMS MESSAGES RECEIVED FROM USER TO APP: ",
        //   err
        // );
        return res.status(500).json({
          message: "Our system has detected an unexpected error.",
          status: err?.status || 500,
          error: err,
        });
      });

    const finalMessagesArrayNotSorted =
      smsFromApptoUser.concat(smsFromUserToApp);

    const sortedMessages = sortBy(finalMessagesArrayNotSorted, (elem) => {
      return elem.dateCreated;
    });

    const messagesGroupedByDate = groupBy(sortedMessages, (elem) => {
      return new Date(elem.dateCreated).toUTCString().substring(0, 16);
    });

    return res.status(200).json({
      messages: messagesGroupedByDate,
    });
  } catch (error) {
    // console.log("ERROR RETRIEVING SMS MESSAGES FROM THIS USER: ", error);
    return res.status(500).json({
      message: "Our system has detected an unexpected error.",
      status: error?.status || 500,
      error: error,
    });
  }
}
