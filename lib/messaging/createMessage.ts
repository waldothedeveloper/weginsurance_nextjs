import { addDoc, collection } from "firebase/firestore";

import { VirtualizedConversationType } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { failureNotification } from "@/components/notifications/failureNotification";

//
export const createMessage = async (
  newMessage: VirtualizedConversationType,
  userId: string
) => {
  try {
    if (!newMessage || !Array.isArray(newMessage)) {
      failureNotification(
        `No hemos encontrado el mensaje a crear. Intenta de nuevo`
      );
      return;
    }

    const groupRef = collection(db, `Users/${userId}/conversations`);

    if (newMessage.length === 2) {
      // save day and message
      await addDoc(groupRef, newMessage[0]);
      await addDoc(groupRef, newMessage[1]);
    } else {
      const result = await addDoc(groupRef, newMessage[0]);
      return result;
    }
  } catch (error) {
    console.error("An error occurred while creating the message", error);
    failureNotification(`Un error ocurrió al crear el mensaje ${error}`);
  }
};
