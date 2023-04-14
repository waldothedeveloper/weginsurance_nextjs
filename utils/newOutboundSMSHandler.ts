import { VirtualizedConversationType } from "@/interfaces/index";
import dayjs from "dayjs";
import { getToday } from "@/utils/getToday";
import { nanoid } from "nanoid";

export const newOutboundSMSHandler = (
  data: VirtualizedConversationType,
  smsMessage: string,
  phone: string
) => {
  // Output something like: "2023-04-12T00:00:00.000Z"
  const todayISO = dayjs.utc().toISOString();

  // this is the new message that will be added to the local cache
  const newOutboundSMS = {
    dateCreated: todayISO,
    body: smsMessage,
    to: phone,
    status: "sent",
    direction: "outbound-api",
    sid: nanoid(),
  };

  // let's find if the message sent today already has a type = day in the local cache
  const isTodayPresent = data.find((elem) => elem.date === getToday());

  //  if the day object is not present in the local array, we need to add it
  if (typeof isTodayPresent === "undefined") {
    const newLocalMessages = [
      ...data,
      newOutboundSMS,
      { type: "day", date: getToday(), id: getToday() },
    ];

    return newLocalMessages;
  } else {
    return [...data, newOutboundSMS];
  }
};
