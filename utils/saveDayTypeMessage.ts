import { addDoc, collection } from "firebase/firestore";

import { Day } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { getToday } from "@/utils/getToday";

//
export const saveDayTypeMessage = async (userId: string | null) => {
  const today = getToday();

  const groupRef = collection(db, `Users/${userId}/conversations`);
  const todayTypeMessage: Day = {
    type: "day",
    dateCreated: today,
    id: today,
  };

  try {
    await addDoc(groupRef, todayTypeMessage);
  } catch (error) {
    throw new Error(`Unable to save day type message to user's collection`);
  }
};
