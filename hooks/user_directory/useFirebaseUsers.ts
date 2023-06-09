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
  const [isLoadingFirebaseUsers, setIsLoadingFirebaseUsers] = useState(false);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    // const userCollection =
    //   process.env.NODE_ENV === "production" ? "Users" : "UsersDev";
    try {
      setIsLoadingFirebaseUsers(true);
      const dbQuery = query(collection(db, "Users"), orderBy("firstname"));
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
      setIsLoadingFirebaseUsers(false);
    } catch (error: any) {
      setIsLoadingFirebaseUsers(false);
      setFirebaseError(JSON.stringify(error, null, 2));
    }

    return () => {
      if (unsubscribe) unsubscribe();
      setFirebaseUsers(null);
    };
  }, []);

  return { firebaseUsers, firebaseError, isLoadingFirebaseUsers };
};
