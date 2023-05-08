import { Day, RealUser } from "@/interfaces/index";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { getToday } from "@/utils/getToday";

//
export const saveDayTypeMessage = async (selectedUser: RealUser | null) => {
  const today = getToday();

  const groupRef = collection(db, `Users/${selectedUser?.id}/conversations`);
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
