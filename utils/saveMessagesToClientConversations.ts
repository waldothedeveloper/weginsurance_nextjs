import { Day, TwilioAPIMessage } from "@/interfaces/index";
import { collection, doc, writeBatch } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { transformMessages } from "@/utils/transformMessages";

export const saveMessagesToClientConversations = async (
  userId: string | null | undefined,
  arrayOfMessages: (TwilioAPIMessage & Day)[]
) => {
  if (!userId || userId.length === 0) throw new Error("userId is required");
  if (!arrayOfMessages || arrayOfMessages.length === 0)
    throw new Error("arrayOfMessages is required");

  const batchOfMessages = transformMessages(userId, arrayOfMessages);

  try {
    const collectionRef = collection(db, `Users/${userId}/conversations`);
    if (batchOfMessages.length > 0) {
      // Get a new write batch
      let batch = writeBatch(db);
      let counter = 0;
      for (const message of batchOfMessages) {
        const docRef = doc(collectionRef);
        batch.set(docRef, message);
        counter++;
        if (counter === 499) {
          try {
            await batch.commit();
          } catch (error) {
            return error;
          }
          batch = writeBatch(db);
          counter = 0;
        }
      }
      if (counter > 0) {
        try {
          await batch.commit();
        } catch (error) {
          return error;
        }
      }
    }
  } catch (error) {
    console.log("error on saveMessagesToClientConversations: ", error);
    return error;
  }
};
