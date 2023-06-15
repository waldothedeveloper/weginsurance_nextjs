import {
  numberOfFilesUploadedAtom,
  openResourceUploadModalAtom,
  progressPercentageAtom,
  selectedUserAtom,
  uploadedFilesAtom,
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
  const selectedUser = useAtomValue(selectedUserAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setUploadedResources = useSetAtom(uploadedFilesAtom);
  const uploadedResources = useAtomValue(uploadedFilesAtom);
  const phone = useAtomValue(userPhoneAtom);
  const setOpenResourceUploadModal = useSetAtom(openResourceUploadModalAtom);

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

    if (editor?.isEmpty && uploadedResources.length === 0) {
      failureNotification(
        `El mensaje de texto esta vacio, por favor escribe algun texto para poder enviarlo. Intenta de nuevo por favor`
      );
      return;
    }

    const resetProgressAndNumberOfUploadedFiles = () => {
      setOpenResourceUploadModal(false);
      setNumberOfFilesUploaded(0);
      setUploadedResources([]);
      setProgressAtom(0);
    };

    const todayISO: string = dayjs.utc().toISOString();

    if (!phone) {
      failureNotification(
        `No se ha podido obtener el numero de telefono del usuario. Intenta de nuevo por favor`
      );
      return;
    }

    const newMessage: Message = {
      userId: selectedUser?.id,
      body: innerText,
      from:
        process.env.NODE_ENV === "production"
          ? productionNumber
          : developmentNumber,
      to: phone || "",
      dateCreated: todayISO,
      sid: nanoid(),
      direction: "outbound-api",
      mediaUrl: messageHasAttachments()
        ? uploadedResources.map((file) => file.url)
        : [],
    };

    try {
      if (selectedUser?.id) {
        await saveMessageInSelectedUserConversations(newMessage);
        editor?.commands?.clearContent();
        resetProgressAndNumberOfUploadedFiles();
        return newMessage;
      }

      failureNotification(
        `No se ha podido obtener el id del usuario. ${selectedUser?.id}`
      );
    } catch (error) {
      failureNotification(
        `Un error ocurrió al crear el mensaje en la base de datos ${error}`
      );
      return error;
    }
  };

  return { handleSubmitMessage };
};
