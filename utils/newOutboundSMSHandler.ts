import { Day, Message, VirtualizedConversationType } from "@/interfaces/index";

import dayjs from "dayjs";
import { getToday } from "@/utils/getToday";
import { nanoid } from "nanoid";

export const newOutboundSMSHandler = (
  data: VirtualizedConversationType | null,
  smsMessage: string | undefined,
  phone: string
) => {
  // Output something like: "2023-04-12T00:00:00.000Z"
  const todayISO: string = dayjs.utc().toISOString();
  const todayTypeMessage: Day = {
    type: "day",
    dateCreated: getToday(),
    id: getToday(),
  };

  // this is the new message that will be added to the local cache
  const newOutboundSMS: Message = {
    dateCreated: todayISO,
    body: smsMessage || "",
    to: phone,
    from: process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER,
    status: "sent",
    direction: "outbound-api",
    sid: nanoid(),
  };

  if (data !== null) {
    // let's find if the message sent today already has a type = day in the local cache
    const isTodayPresent = data.findLast((elem) => "date" in elem);

    //  if the day object is not present in the local array, we need to add it
    if (
      isTodayPresent &&
      "date" in isTodayPresent &&
      isTodayPresent.date === getToday()
    ) {
      const newLocalMessages: VirtualizedConversationType = [
        ...data,
        newOutboundSMS,
        todayTypeMessage,
      ];

      return newLocalMessages;
    } else {
      return [...data, newOutboundSMS];
    }
  }
};
