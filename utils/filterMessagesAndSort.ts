import { groupBy, keys, map, object, sortBy } from "underscore";

import { Message } from "@/interfaces/index";

//
export const filterMessagesAndSort = (data: Message[]) => {
  console.log("data: ", data);
  const sortedMessages = sortBy(data, (elem) => {
    return `${new Date(elem.dateCreated)} UTC`;
  });

  const messagesGroupedByDate = groupBy(sortedMessages, (message) => {
    // console.log("message: ", message);
    const date = new Date(`${message.dateCreated} UTC`);

    return date.toString().slice(0, 16);
  });

  // console.log("messagesGroupedByDate: ", messagesGroupedByDate);

  const sortedKeys = sortBy(keys(messagesGroupedByDate), (key) => {
    return new Date(key);
  });

  const sortedMsg = map(sortedKeys, (key) => {
    return [key, messagesGroupedByDate[key]];
  });

  const sortedObject = object(sortedMsg);

  return sortedObject;
};
