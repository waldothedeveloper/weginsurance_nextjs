import { Day, Message, VirtualizedConversationType } from "@/interfaces/index";

import { DocumentData } from "firebase/firestore";
import { getToday } from "@/utils/getToday";

export const isTodayPresentInArray = (
  arrayOfMessages: VirtualizedConversationType | DocumentData
) => {
  const today = getToday();

  // Check if the array is empty
  if (!arrayOfMessages) return false;
  // get the last messag of day type in the array
  const isDayTypeMessage = arrayOfMessages.findLast(
    (elem: Day | Message) => "type" in elem
  );

  // If there is no message of type day, return false
  if (!isDayTypeMessage) return false;

  // Return true if the message's date created is today
  return isDayTypeMessage.dateCreated === today;
};
