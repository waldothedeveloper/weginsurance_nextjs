import {
  numberOfFilesUploadedAtom,
  uploadedFilesAtom,
  userIdAtom,
  userPhoneAtom,
} from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { Editor } from "@tiptap/react";
import { Message } from "@/interfaces/index";
import React from "react";
import dayjs from "dayjs";
import { failureNotification } from "@/components/notifications/failureNotification";
import { nanoid } from "nanoid";
import { saveMessageInOutboundCollection } from "@/lib/messaging/saveMessageInOutboundCollection";

const developmentNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER || "";
const productionNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_PRODUCTION_NUMBER || "";

//
export const useSendMessage = () => {
  const userId = useAtomValue(userIdAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setUploadedFiles = useSetAtom(uploadedFilesAtom);
  const uploadedFiles = useAtomValue(uploadedFilesAtom);
  const phone = useAtomValue(userPhoneAtom);

  const handleSubmitMessage = async (
    event: React.SyntheticEvent,
    editor: Editor | null
  ) => {
    if (event) event.preventDefault();
    const messageHasAttachments = () =>
      uploadedFiles?.length > 0 ? true : false;

    if (!editor) {
      failureNotification(
        `Ha ocurrido un error al cargar el editor de mensajes. Intenta de nuevo por favor`
      );
      return;
    }

    const {
      view: {
        dom: { innerText },
      },
    } = editor;

    if (!innerText?.trim() && uploadedFiles.length === 0) {
      failureNotification(
        `El mensaje de texto esta vacio, por favor escribe algun texto para poder enviarlo. Intenta de nuevo por favor`
      );
      return;
    }

    const todayISO: string = dayjs.utc().toISOString();

    const newMessage: Message = {
      userId,
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

    try {
      if (userId) {
        await saveMessageInOutboundCollection(newMessage);
        editor?.commands?.clearContent();
        setNumberOfFilesUploaded(0);
        setUploadedFiles([]);
        return newMessage;
      }
    } catch (error) {
      failureNotification(
        `Un error ocurrió al crear el mensaje en la base de datos ${error}`
      );
      return error;
    }
  };

  return { handleSubmitMessage };
};
