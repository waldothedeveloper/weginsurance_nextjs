import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { RealUser } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";

//
export const useFirebaseUsers = () => {
  const [firebaseUsers, setFirebaseUsers] = useState<RealUser[] | null>(null);
  const [firebaseError, setFirebaseError] = useState<{} | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const userCollection =
      process.env.NODE_ENV === "production" ? "Users" : "UsersDev";
    try {
      const dbQuery = query(
        collection(db, userCollection),
        orderBy("firstname")
      );
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const users: RealUser[] = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const tempUser: RealUser = doc.data() as RealUser;
            tempUser.id = doc?.id;
            users.push(tempUser);
          });
          setFirebaseUsers(users);
        }
      });
    } catch (error: any) {
      setFirebaseError(JSON.stringify(error, null, 2));
    }

    return () => {
      if (unsubscribe) unsubscribe();
      setFirebaseUsers(null);
    };
  }, []);

  return { firebaseUsers, firebaseError };
};
