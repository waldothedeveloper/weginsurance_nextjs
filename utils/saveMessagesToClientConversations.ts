import { Day, TwilioAPIMessage } from "@/interfaces/index";
import {
  collection,
  doc,
  getDocs,
  runTransaction,
  writeBatch,
} from "firebase/firestore";

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
    await runTransaction(db, async (transaction) => {
      const previousUserConversations = await getDocs(collectionRef);

      if (!previousUserConversations.empty) {
        for (const doc of previousUserConversations.docs) {
          transaction.delete(doc.ref);
        }
      }

      if (batchOfMessages.length > 0) {
        const batches = [];
        let currentBatch = writeBatch(db);
        let counter = 0;
        for (const message of batchOfMessages) {
          const docRef = doc(collectionRef);
          currentBatch.set(docRef, message);
          counter++;
          if (counter === 499) {
            batches.push(currentBatch);
            currentBatch = writeBatch(db);
            counter = 0;
          }
        }
        if (counter > 0) {
          batches.push(currentBatch);
        }
        for (const batch of batches) {
          try {
            await batch.commit();
          } catch (error) {
            return error;
          }
        }
      }

      return "success";
    });
  } catch (error) {
    // console.log("error on saveMessagesToClientConversations: ", error);
    return error;
  }
};
