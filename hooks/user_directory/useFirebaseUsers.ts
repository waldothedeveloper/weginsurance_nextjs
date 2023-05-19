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
  const [firebaseUsers, setFirebaseUsers] = useState<RealUser[] | []>([]);
  const [firebaseError, setFirebaseError] = useState<{} | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    try {
      /* 
      you can use this db name collection to test large database of users (for testing only): 
       const dbQuery = query(collection(db, "Large_User_DB"), orderBy("firstname"));
      
      */
      const dbQuery = query(collection(db, "Users"), orderBy("firstname"));
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const users: RealUser[] = [];
        querySnapshot.forEach((doc) => {
          const tempUser: RealUser = doc.data() as RealUser;
          tempUser.id = doc?.id;
          users.push(tempUser);
        });

        setFirebaseUsers(users);
      });
    } catch (error: any) {
      setFirebaseError(JSON.stringify(error, null, 2));
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { firebaseUsers, firebaseError };
};
