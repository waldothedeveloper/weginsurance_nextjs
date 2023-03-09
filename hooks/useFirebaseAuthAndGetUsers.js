import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseApp } from "@/lib/firebaseConfig";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";

//
export const useFirebaseAuthAndGetUsers = () => {
  const { getToken } = useAuth();

  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const [firebaseError, setFirebaseError] = useState(null);

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth(firebaseApp);
      let token;
      try {
        try {
          token = await getToken({ template: "integration_firebase" });
        } catch (error) {
          setFirebaseError(JSON.stringify(error, null, 2));
        }

        try {
          const userCredentials = await signInWithCustomToken(auth, token);
          return userCredentials;
        } catch (error) {
          return error;
        }
      } catch (error) {
        setFirebaseError(JSON.stringify(error, null, 2));
      }

      if (!token) {
        return;
      }

      return token;
    };

    signInWithClerk().catch((error) =>
      setFirebaseError(JSON.stringify(error, null, 2))
    );

    return () => {
      setFirebaseUsers([]);
      setFirebaseError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const dbQuery = query(collection(db, "Users"), orderBy("firstname"));
    const unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const tempUser = doc.data();
        tempUser.id = doc?.id;
        users.push(tempUser);
      });

      setFirebaseUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return { firebaseUsers, firebaseError };
};
