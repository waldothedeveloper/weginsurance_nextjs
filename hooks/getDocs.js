import { doc, getDoc } from "firebase/firestore";

//
import { db } from "@/lib/firebaseConfig";

const docRef = doc(db, "ChatRooms", "+12142052944");

export const getPeople = async () => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    throw new Error(`error`);
  }
};
