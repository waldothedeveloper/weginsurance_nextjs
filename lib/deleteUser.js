import { deleteDoc, doc } from "firebase/firestore";

import { db } from "./firebaseConfig";

// each user is saved on the db by it's phone number, so that's the user ID.
export const deleteUser = async (id) => {
  const user = await deleteDoc(doc(db, "ChatRooms", id));

  return user;
};