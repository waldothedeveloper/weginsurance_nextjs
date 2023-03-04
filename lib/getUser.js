import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

const usersRef = collection(db, "Users");

export const getUser = async (phone) => {
  if (!phone || typeof phone !== "string")
    throw new Error(
      `A valid phone number must be provided to search for users`
    );
  const dbQuery = query(usersRef, where("phone", "==", phone));
  const existingUsers = [];
  const querySnapshot = await getDocs(dbQuery);
  querySnapshot.forEach((doc) => {
    existingUsers.push({ data: doc.data(), id: doc.id });
  });

  return existingUsers;
};
