import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/_lib/firebase/clientApp";

export async function getUsers(db: any) {
  let q = query(collection(db, "Users"), orderBy("firstname"));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export function getUsersSnapshot(cb: (results: any) => void) {
  if (typeof cb !== "function") {
    // console.log("Error: The callback parameter is not a function");
    return;
  }
  // Large_User_DB
  let q = query(collection(db, "Users"), orderBy("firstname"), limit(200));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    cb(results);
  });

  return unsubscribe;
}
