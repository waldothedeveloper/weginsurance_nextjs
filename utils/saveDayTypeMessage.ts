import { addDoc, collection } from "firebase/firestore";

import { Day } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";

//
export const saveDayTypeMessage = async (
  userId: string | null,
  date: string
) => {
  const groupRef = collection(db, `Users/${userId}/conversations`);
  const todayTypeMessage: Day = {
    type: "day",
    dateCreated: date,
    id: date,
  };

  try {
    await addDoc(groupRef, todayTypeMessage);
  } catch (error) {
    throw new Error(`Unable to save day type message to user's collection`);
  }
};
