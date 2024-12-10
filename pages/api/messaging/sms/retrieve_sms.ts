import { NextApiRequest, NextApiResponse } from "next";

import { findMessagesWithMedia } from "@/utils/findMessagesWithMedia";
import { getMessages } from "@/utils/getMessages";
import { groupMessages } from "@/utils/groupMessages";
import { sortMessages } from "@/utils/sortMessages";

// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_phone } = req?.body || null;

  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  if (!user_phone) {
    return res.status(500).json({
      message: "A valid client user user_phone number is required!",
      status: 500,
    });
  }

  const app = process.env.NEXT_PUBLIC_WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER;
  // const app =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.NEXT_PUBLIC_WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER
  //     : process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER;
  const user = user_phone;
  // console.log("user_phone provided: ", user);

  try {
    // get me all messages SENT from WEG INSURANCE to this user
    const smsFromApptoUser = await getMessages(app, user);
    // get me all messages RECEIVED from this user to APP
    const smsFromUserToApp = await getMessages(user, app);

    //! it is important to recognize that if the Twilio API fails for some reason, we should return an Error
    if (
      smsFromApptoUser instanceof Error ||
      smsFromUserToApp instanceof Error
    ) {
      //
      return res.status(500).json({
        message: `Error fetching messages. ${
          smsFromApptoUser instanceof Error
            ? smsFromApptoUser
            : smsFromUserToApp
        }`,
      });
    }

    //! if there is the case the no messages have been sent to this user, or this user has never sent any messages to the app, return an empty array.
    //  This is considered a new conversation technically speaking.
    if (
      Array.isArray(smsFromApptoUser) &&
      smsFromApptoUser.length === 0 &&
      Array.isArray(smsFromUserToApp) &&
      smsFromUserToApp.length === 0
    ) {
      // console.log(`No messages found for ${user_phone}`);
      return res.status(200).json([]);
    }

    // There could be the case the user has sent messages to the app, but the app has never sent any messages to the user, or viceversa, so there is no need to try to find messages with media if there are no messages
    //! if there are no messages with media, the findMessagesWithMedia will simply return the messages from Twilio as they are or False if there are no messages.
    const smsFromApptoUserWithMedia =
      Array.isArray(smsFromApptoUser) &&
      smsFromApptoUser.length > 0 &&
      (await findMessagesWithMedia(smsFromApptoUser));

    //! if there are no messages with media, the findMessagesWithMedia will simply return the messages from Twilio as they are or False if there are no messages.
    const smsFromUserToAppWithMedia =
      Array.isArray(smsFromUserToApp) &&
      smsFromUserToApp.length > 0 &&
      (await findMessagesWithMedia(smsFromUserToApp));

    // it is important to recognize that if we are not able to put the messages received and sent a.k.a the Conversation for some reason, we should return an Error
    if (
      smsFromApptoUserWithMedia instanceof Error ||
      smsFromUserToAppWithMedia instanceof Error
    ) {
      return res.status(500).json({
        message: `Error fetching messages with media. ${
          smsFromApptoUserWithMedia instanceof Error
            ? smsFromApptoUserWithMedia
            : smsFromUserToAppWithMedia
        }`,
      });
    }

    /*
    =========================================================================
     the code below might just be a repetition of this, so think about it

          if (
            Array.isArray(smsFromApptoUser) &&
            smsFromApptoUser.length === 0 &&
            Array.isArray(smsFromUserToApp) &&
            smsFromUserToApp.length === 0
          ) {
            return res.status(200).json([]);
          }
    ==========================================================================
    */
    if (!smsFromApptoUserWithMedia && !smsFromUserToAppWithMedia) {
      return res.status(200).json([]);
    }

    // if there are messages from user to app, but not from app to user, we can just return the messages from user to app with media
    if (!smsFromApptoUserWithMedia && smsFromUserToAppWithMedia) {
      const sortedMessagesFromUsertoApp = sortMessages(
        smsFromUserToAppWithMedia,
        groupMessages
      ).reverse();
      // console.log(`CASE WHERE THERE ARE MESSAGES FROM User TO APP 👦🏻 => 💻 `);
      return res.status(200).json(sortedMessagesFromUsertoApp);
    }

    // if there are messages from app to user, but not from user to app, we can just return the messages from app to user with media
    if (smsFromApptoUserWithMedia && !smsFromUserToAppWithMedia) {
      const sortedMessagesFromApptoUser = sortMessages(
        smsFromApptoUserWithMedia,
        groupMessages
      ).reverse();
      // console.log(`CASE WHERE THERE ARE MESSAGES FROM APP TO USER 👦🏻 => 💻 `);

      return res.status(200).json(sortedMessagesFromApptoUser);
    }

    // if both messages contain media, we need to sort them by date and group them by date
    if (smsFromApptoUserWithMedia && smsFromUserToAppWithMedia) {
      const messagesFromUserAndApp = smsFromUserToAppWithMedia.concat(
        smsFromApptoUserWithMedia
      );
      const sortedMessages = sortMessages(
        messagesFromUserAndApp,
        groupMessages
      ).reverse();

      // console.log(
      //   `CASE WHERE THERE ARE MESSAGES FROM APP TO USER AND USER TO APP 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 `
      // );
      return res.status(200).json(sortedMessages);
    }
  } catch (error) {
    // console.log("error: ", error);
    return res.status(500).json({
      message: "Our system has detected an unexpected error.",
      status: 500,
      error,
    });
  }
}
