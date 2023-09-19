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

const productionNumber =
  process.env.NEXT_PUBLIC_WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER;

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

    // if they change their mind, we simply don't call this functtion and replace it by an empty array if there are no media urls
    const getMediaAndAddCompanyLogo = () => {
      const media = uploadedResources.map((file) => file.url);
      media.push(
        "https://firebasestorage.googleapis.com/v0/b/weginsurance-production.appspot.com/o/images%2Fweg_logo.jpg?alt=media&token=a1fe14e0-3df0-46c0-882a-8e74a2a4d6f4"
      );
      return media;
    };

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
      from: productionNumber as string,
      to: phone || "",
      dateCreated: todayISO,
      sid: nanoid(),
      direction: "outbound-api",
      // by doing this, we are separating documents send from regular images.
      documentUrl: messageHasAttachments()
        ? uploadedResources
            .map((file) => {
              if (!file?.type.startsWith("image/")) {
                return { url: file.url, name: file.name, type: file.type };
              }
            })
            .filter((file) => file !== undefined)
        : [],
      mediaUrl: messageHasAttachments()
        ? getMediaAndAddCompanyLogo()
        : [
            "https://firebasestorage.googleapis.com/v0/b/weginsurance-production.appspot.com/o/images%2Fweg_logo.jpg?alt=media&token=a1fe14e0-3df0-46c0-882a-8e74a2a4d6f4",
          ],
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
