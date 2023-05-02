import { Day, Message, VirtualizedConversationType } from "@/interfaces/index";
import {
  messagesAtom,
  numberOfFilesUploadedAtom,
  uploadedFilesAtom,
  userIdAtom,
  userPhoneAtom,
} from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { Editor } from "@tiptap/react";
import React from "react";
import { createMessage } from "@/lib/messaging/createMessage";
import dayjs from "dayjs";
import { failureNotification } from "@/components/notifications/failureNotification";
import { getToday } from "@/utils/getToday";
import { nanoid } from "nanoid";

const developmentNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER || "";
const productionNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_PRODUCTION_NUMBER || "";

export const useWriteMessageToDB = () => {
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setUploadedFiles = useSetAtom(uploadedFilesAtom);
  const uploadedFiles = useAtomValue(uploadedFilesAtom);
  const phone = useAtomValue(userPhoneAtom);
  const userId = useAtomValue(userIdAtom);
  const messagesFromDB = useAtomValue(messagesAtom);

  const handleSubmitMessage = async (
    event: React.SyntheticEvent,
    editor: Editor | null
  ) => {
    const messageHasAttachments = () =>
      uploadedFiles?.length > 0 ? true : false;

    if (messageHasAttachments() && !editor) {
      failureNotification(
        `Los mensajes con archivos adjuntos deben contener un mensaje de texto. `
      );
      return;
    } else if (!editor) {
      failureNotification(
        `Ha ocurrido un error al cargar el editor de mensajes. Intenta de nuevo por favor`
      );
      return;
    }

    if (event) event.preventDefault();
    const {
      view: {
        dom: { innerText },
      },
    } = editor;

    if (!innerText?.trim() && uploadedFiles.length === 0) {
      failureNotification(
        `Es posible que aun no hayas escrito nada. Intenta de nuevo por favor`
      );
      return;
    }

    const todayISO: string = dayjs.utc().toISOString();

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
      mediaUrl: messageHasAttachments()
        ? uploadedFiles.map((file) => file.url)
        : [],
    };

    if (!userId) {
      failureNotification(
        `No hemos encontrado el usuario al que se le debe enviar el mensaje. Intenta de nuevo`
      );
      return;
    }

    if (!messagesFromDB) {
      failureNotification(
        `No hemos encontrado los mensajes asociados con este usuario. Intenta de nuevo`
      );
      return;
    }

    const isDayTypeMessage = messagesFromDB.findLast(
      (elem: VirtualizedConversationType) => "type" in elem
    );

    const isToday =
      isDayTypeMessage && isDayTypeMessage.dateCreated === getToday();

    const todayTypeMessage: Day = {
      type: "day",
      dateCreated: getToday(),
      id: getToday(),
    };

    try {
      if (messageHasAttachments()) {
        if (isToday) {
          await createMessage([newMessage], userId);
          editor?.commands?.clearContent();
          setNumberOfFilesUploaded(0);
          setUploadedFiles([]);
          return;
        } else {
          await createMessage([newMessage, todayTypeMessage], userId);
          editor?.commands?.clearContent();
          setUploadedFiles([]);
          return;
        }
      }
    } catch (error) {
      failureNotification(
        `Un error ocurrió al crear el mensaje en la base de datos ${error}`
      );
      return;
    }

    try {
      if (isToday) {
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
