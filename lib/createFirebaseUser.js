import { addDoc, collection } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { isValueAnObject } from "@/utils/isValueAnObject";

//
export const createFirebaseUser = async (newUser) => {
  if (!newUser || !isValueAnObject(newUser))
    throw new Error(
      `A user object must exist so that it can be saved in the database`
    );
  const result = await addDoc(collection(db, "Users"), newUser);
  return result;
};
