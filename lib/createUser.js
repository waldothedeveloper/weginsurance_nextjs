import { doc, setDoc } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const createUser = async (id, newUser) => {
  // remember that the id will be the user's phone number
  // the newUser MUST be an object that contains all of the information for the new user!!
  const cityRef = doc(db, "cities", id);
  const result = await setDoc(cityRef, newUser, { merge: true });
  return result;
};
