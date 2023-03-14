import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";

//
export const useFirebaseUsers = () => {
  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const [firebaseError, setFirebaseError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;
    try {
      const dbQuery = query(collection(db, "Users"), orderBy("firstname"));
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const tempUser = doc.data();
          tempUser.id = doc?.id;
          users.push(tempUser);
        });

        setFirebaseUsers(users);
      });
    } catch (error) {
      setFirebaseError(JSON.stringify(error, null, 2));
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { firebaseUsers, firebaseError };
};
