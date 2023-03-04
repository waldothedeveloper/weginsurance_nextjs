import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { isValueAnObject } from "@/utils/isValueAnObject";

export const updateUser = async (user, docID) => {
  if (!user || isValueAnObject(user))
    throw new Error(`A user must exist to be able to update it`);
  if (!docID) throw new Error(`A Firestore Document ID must exist!`);
  const userRef = doc(db, "Users", docID);
  const result = await updateDoc(userRef, user);

  return result;
};
