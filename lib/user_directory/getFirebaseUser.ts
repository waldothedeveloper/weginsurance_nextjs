import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

//
export const getFirebaseUser = async (id: string) => {
  if (!id) throw new Error(`Please provide a document id first`);

  const docRef = doc(db, "Users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const tempUser = docSnap.data();
    tempUser.id = docSnap?.id;
    return tempUser;
  } else {
    throw new Error(`No such user exist! `);
  }
};
