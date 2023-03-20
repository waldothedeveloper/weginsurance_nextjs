import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

export const deleteUser = async (id) => {
  const user = await deleteDoc(doc(db, "Users", id));

  return user;
};
