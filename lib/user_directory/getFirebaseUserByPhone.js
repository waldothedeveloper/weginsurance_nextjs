import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

export const getFirebaseUserByPhone = async (phone) => {
  if (!phone) throw new Error("Please provide a phone number first");

  const querySnapshot = await getDocs(
    query(collection(db, "Users"), where("phone", "==", phone))
  );

  if (querySnapshot.empty) {
    throw new Error("No such user exist! ");
  } else {
    const tempUser = querySnapshot.docs[0].data();
    tempUser.id = querySnapshot.docs[0]?.id;
    return tempUser;
  }
};
