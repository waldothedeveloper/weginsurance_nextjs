import { Message, VirtualizedConversationType } from "@/interfaces/index";
import { NextApiRequest, NextApiResponse } from "next";

import dayjs from "dayjs";
import { findMessagesWithMedia } from "@/utils/findMessagesWithMedia";
import { getMessages } from "@/utils/getMessages";

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

  const app =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER
      : process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER;
  const user = user_phone;

  try {
    // get me all messages SENT from WEG INSURANCE to this user
    const smsFromApptoUser = await getMessages(app, user);
    // get me all messages RECEIVED from this user to APP
    const smsFromUserToApp = await getMessages(user, app);

    // it is important to recognize that if the Twilio API fails for some reason, we should return an Error
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

    const smsFromApptoUserWithMedia = await findMessagesWithMedia(
      smsFromApptoUser
    );

    const smsFromUserToAppWithMedia = await findMessagesWithMedia(
      smsFromUserToApp
    );

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

    const finalMessagesArrayNotSorted =
      smsFromApptoUserWithMedia &&
      smsFromUserToAppWithMedia &&
      smsFromApptoUserWithMedia.concat(smsFromUserToAppWithMedia);

    /*
    the groupedDays function below is creating a object similar to this one:
            {
          '2022-05-26': [
            {
              from: '+5553332211',
              sid: 'SM63e433054d8043dab81b6b5b9aaa5222',
              dateCreated: '2022-05-26T18:33:28.000Z',
              delivery: [Object],
              direction: 'outbound-api',
              userId: 'uPVAYp0fZED0D03YZyY4',
              to: '+3055555555',
              body: 'test',
              mediaUrl: [],
              documentUrl: []
                }
              ]
            }
    */
    const groupedDays = (
      messages: Message[]
    ): {
      [key: string]: Message[];
    } =>
      messages.reduce((acc: { [key: string]: Message[] }, el) => {
        const messageDay = dayjs(el.dateCreated).format("YYYY-MM-DD");
        if (acc[messageDay]) {
          return { ...acc, [messageDay]: [...acc[messageDay], el] };
        }
        return { ...acc, [messageDay]: [el] };
      }, {});

    const generateItems = (
      messages: Message[]
    ): VirtualizedConversationType[] => {
      const days = groupedDays(messages);
      const sortedDays = Object.keys(days).sort(
        (x, y) => dayjs(y, "YYYY-MM-DD").unix() - dayjs(x, "YYYY-MM-DD").unix()
      );

      const items = sortedDays.reduce(
        (acc: VirtualizedConversationType[], date) => {
          const sortedMessages = days[date].sort((x, y) =>
            dayjs(y.dateCreated).diff(dayjs(x.dateCreated))
          );
          return acc.concat([
            ...sortedMessages,
            { type: "day", dateCreated: date, id: date },
          ]);
        },
        []
      );
      return items;
    };

    if (
      finalMessagesArrayNotSorted &&
      Array.isArray(finalMessagesArrayNotSorted)
    ) {
      const allMsg = generateItems(finalMessagesArrayNotSorted).reverse();
      return res.status(200).json(allMsg);
    } else {
      return res.status(500).json({
        message: "Our system has detected an unexpected error.",
        status: 500,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      message: "Our system has detected an unexpected error.",
      status: 500,
      error,
    });
  }
}
