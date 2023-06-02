import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
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
import { saveMessageInSelectedUserConversations } from "@/lib/messaging/saveMessageInSelectedUserConversations";

const developmentNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER || "";
const productionNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_PRODUCTION_NUMBER || "";

//
export const useSendOutboundMessage = () => {
  const setProgressAtom = useSetAtom(progressPercentageAtom);
  const userId = useAtomValue(userIdAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setUploadedResources = useSetAtom(uploadedFilesAtom);
  const uploadedResources = useAtomValue(uploadedFilesAtom);
  const phone = useAtomValue(userPhoneAtom);

  const handleSubmitMessage = async (
    event: React.SyntheticEvent,
    editor: Editor | null
  ) => {
    if (event) event.preventDefault();
    const messageHasAttachments = () =>
      uploadedResources?.length > 0 ? true : false;

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

    if (!innerText?.trim() && uploadedResources.length === 0) {
      failureNotification(
        `El mensaje de texto esta vacio, por favor escribe algun texto para poder enviarlo. Intenta de nuevo por favor`
      );
      return;
    }

    const resetProgressAndNumberOfUploadedFiles = () => {
      setNumberOfFilesUploaded(0);
      setUploadedResources([]);
      setProgressAtom(0);
    };

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
      mediaUrl: messageHasAttachments()
        ? uploadedResources.map((file) => file.url)
        : [],
    };

    try {
      if (userId) {
        await saveMessageInSelectedUserConversations(newMessage);
        editor?.commands?.clearContent();
        resetProgressAndNumberOfUploadedFiles();
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
