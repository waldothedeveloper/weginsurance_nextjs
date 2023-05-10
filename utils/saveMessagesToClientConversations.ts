import { Day, TwilioAPIMessage } from "@/interfaces/index";
import { collection, doc, writeBatch } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { transformMessages } from "@/utils/transformMessages";

export const saveMessagesToClientConversations = async (
  userId: string | null,
  arrayOfMessages: (TwilioAPIMessage & Day)[]
) => {
  if (!userId || userId.length === 0) throw new Error("userId is required");
  if (!arrayOfMessages || arrayOfMessages.length === 0)
    throw new Error("arrayOfMessages is required");
  // Get a new write batch
  const batch = writeBatch(db);

  const batchOfMessages = transformMessages(userId, arrayOfMessages);

  try {
    const collectionRef = collection(db, `Users/${userId}/conversations`);
    if (batchOfMessages.length > 0) {
      batchOfMessages.forEach((message) => {
        const docRef = doc(collectionRef);
        batch.set(docRef, message);
      });
      await batch.commit();
    }
  } catch (error) {
    return error;
  }
};
