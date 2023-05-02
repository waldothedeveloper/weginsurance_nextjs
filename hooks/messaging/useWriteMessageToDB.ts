import { Day, Message, VirtualizedConversationType } from "@/interfaces/index";
import { messagesAtom, userIdAtom, userPhoneAtom } from "@/lib/state/atoms";

import { Editor } from "@tiptap/react";
import React from "react";
import { createMessage } from "@/lib/messaging/createMessage";
import dayjs from "dayjs";
import { failureNotification } from "@/components/notifications/failureNotification";
import { getToday } from "@/utils/getToday";
import { nanoid } from "nanoid";
import { useAtomValue } from "jotai";

const developmentNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER || "";
const productionNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_PRODUCTION_NUMBER || "";

export const useWriteMessageToDB = () => {
  const phone = useAtomValue(userPhoneAtom);
  const userId = useAtomValue(userIdAtom);
  const messagesFromDB = useAtomValue(messagesAtom);

  const handleSubmitMessage = async (
    event: React.SyntheticEvent,
    editor: Editor
  ) => {
    if (!editor) {
      failureNotification(
        `No hemos encontrado el editor. Intenta de nuevo por favor`
      );
      return;
    }
    if (event) event.preventDefault();
    const todayISO: string = dayjs.utc().toISOString();
    const {
      view: {
        dom: { innerText },
      },
    } = editor;

    if (!innerText?.trim()) {
      failureNotification(
        `No hemos encontrado el mensaje a crear. Intenta de nuevo`
      );
      return;
    }

    const todayTypeMessage: Day = {
      type: "day",
      dateCreated: getToday(),
      id: getToday(),
    };

    const newMessage: Message = {
      body: innerText,
      from:
        process.env.NODE_ENV === "production"
          ? productionNumber
          : developmentNumber,
      to: phone,
      dateCreated: todayISO,
      sid: nanoid(),
      direction: "outbound-api",
      status: "sent",
    };

    if (!userId) {
      failureNotification(
        `No hemos encontrado el usuario al que se le debe enviar el mensaje. Intenta de nuevo`
      );
      return;
    }

    if (!messagesFromDB) {
      failureNotification(
        `No hemos encontrado los mensajes del usuario. Intenta de nuevo`
      );
      return;
    }

    const isTodayPresent = messagesFromDB.findLast(
      (elem: VirtualizedConversationType) => "type" in elem
    );

    try {
      if (isTodayPresent && isTodayPresent.dateCreated === getToday()) {
        await createMessage([newMessage], userId);
        editor?.commands?.clearContent();
        return;
      } else {
        await createMessage([newMessage, todayTypeMessage], userId);
        editor?.commands?.clearContent();
        return;
      }
    } catch (error) {
      failureNotification(
        `Un error ocurrió al crear el mensaje en la base de datos ${error}`
      );
      return;
    }
  };

  return { handleSubmitMessage };
};
