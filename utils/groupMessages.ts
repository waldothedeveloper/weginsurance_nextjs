import { Message } from "@/interfaces/index";
import dayjs from "dayjs";
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
export const groupMessages = (
  messages: Message[]
): {
  [key: string]: Message[];
} =>
  messages.reduce((acc: { [key: string]: Message[] }, el) => {
    const messageDay = dayjs(el.dateCreated).format("YYYY-MM-DD");
    if (acc[messageDay]) {
      // @ts-ignore
      return { ...acc, [messageDay]: [...acc[messageDay], el] };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
