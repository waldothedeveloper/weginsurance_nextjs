import { Message, VirtualizedConversationType } from "@/interfaces/index";

import dayjs from "dayjs";

export const sortMessages = (
  messages: Message[],
  // eslint-disable-next-line no-unused-vars
  groupedDays: (messages: Message[]) => { [key: string]: Message[] }
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
