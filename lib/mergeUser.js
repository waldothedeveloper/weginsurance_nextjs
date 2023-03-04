import { doc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { isValueAnObject } from "@/utils/isValueAnObject";

//
export const mergeUser = async (newUser, id) => {
  if (!newUser || isValueAnObject(newUser))
    throw new Error(
      `A user object must exist so that the new properties can be saved in the database`
    );
  if (!id) throw new Error(`A valid document id must be provided`);

  const usersRef = doc(db, "Users", id);
  const result = await setDoc(usersRef, newUser, { merge: true });
  return result;
};
