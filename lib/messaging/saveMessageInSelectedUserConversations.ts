import { addDoc, collection } from "firebase/firestore";

import { Message } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { failureNotification } from "@/components/notifications/failureNotification";
import { isValueAnObject } from "@/utils/isValueAnObject";

export const saveMessageInSelectedUserConversations = async (
  newMessage: Message
) => {
  try {
    if (!newMessage || !isValueAnObject(newMessage)) {
      failureNotification(
        `No hemos encontrado el mensaje a crear. Intenta de nuevo`
      );
      return;
    }

    const groupRef = collection(db, "messages");

    const result = await addDoc(groupRef, newMessage);
    return result;
  } catch (error: any) {
    console.error("An error occurred while creating the message", error);
    failureNotification(`Un error ocurrió al crear el mensaje ${error}`);
    throw new Error(error);
  }
};
