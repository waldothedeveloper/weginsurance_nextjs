import { doc, writeBatch } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

export const deleteMultipleUsers = async (userIds: string[]): Promise<void> => {
  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error("No user ids provided");
  }
  const batch = writeBatch(db);

  try {
    for (const userId of userIds) {
      const docRef = doc(db, "Users", userId);
      batch.delete(docRef);
    }

    await batch.commit();
    console.log("Documents deleted successfully.");
  } catch (error) {
    console.error("Error deleting documents:", error);
    throw error; // Re-throw the error to be caught by the caller if needed.
  }
};
