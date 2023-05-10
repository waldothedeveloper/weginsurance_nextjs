import { Day, RealUser } from "@/interfaces/index";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { getToday } from "@/utils/getToday";

//
export const saveDayTypeMessage = async (
  selectedUser: RealUser | null,
  day: Day | null
) => {
  const today = getToday();

  const groupRef = collection(db, `Users/${selectedUser?.id}/conversations`);
  const dayRef = doc(groupRef, today);
  const todayTypeMessage: Day = {
    type: "day",
    dateCreated: today,
    id: today,
  };

  try {
    if (day) {
      await setDoc(dayRef, { todayTypeMessage });
    } else {
      await addDoc(groupRef, todayTypeMessage);
    }
  } catch (error) {
    throw new Error(`Unable to save day type message to user's collection`);
  }
};
