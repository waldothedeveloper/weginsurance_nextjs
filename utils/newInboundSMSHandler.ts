import {
  IdentifiedUser,
  VirtualizedConversationType,
} from "@/interfaces/index";

import dayjs from "dayjs";
import { getToday } from "@/utils/getToday";

//
export const newInboundSMSHandler = (
  data: VirtualizedConversationType,
  identifiedUser: IdentifiedUser | null
) => {
  // Output something like: "2023-04-12T00:00:00.000Z"
  const todayISO = dayjs.utc().toISOString();
  const newInboundSMS = {
    dateCreated: todayISO,
    body: identifiedUser?.message?.Body,
    to: identifiedUser?.message?.To,
    status: identifiedUser?.message?.SmsStatus,
    direction: "inbound",
    sid: identifiedUser?.message?.SmsMessageSid,
  };
  // let's find if the message sent today already has a type = day in the local cache
  const isTodayPresent = data.find((elem) => elem.date === getToday());

  //  if the day object is not present in the local array, we need to add it
  if (typeof isTodayPresent === "undefined") {
    const newLocalMessages = [
      ...data,
      newInboundSMS,
      { type: "day", date: getToday(), id: getToday() },
    ];

    return newLocalMessages;
  }

  return [...data, newInboundSMS];
};
