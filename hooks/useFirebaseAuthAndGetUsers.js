import { collection, onSnapshot, query } from "firebase/firestore";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";
import { firebaseApp } from "@/lib/firebaseConfig";
import { useAuth } from "@clerk/nextjs";

export const useFirebaseAuthAndGetUsers = () => {
  const { getToken } = useAuth();
  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const [firebaseError, setFirebaseError] = useState(null);
  const [firebaseAuth, setFirebaseAuth] = useState(false);

  useEffect(() => {
    const signInWithClerk = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const token = await getToken({ template: "integration_firebase" });
        //

        await signInWithCustomToken(auth, token);

        if (!token) {
          return false;
        }

        return token;
      } catch (error) {
        setFirebaseError(error);
      }
    };

    signInWithClerk()
      .then((token) => {
        if (token) setFirebaseAuth(true);
      })
      .catch((err) => setFirebaseError(err));

    return () => {
      setFirebaseUsers([]);
      setFirebaseAuth(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (firebaseAuth) {
      const q = query(collection(db, "ChatRooms"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });

        setFirebaseUsers(users);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [firebaseAuth]);

  return { firebaseUsers, firebaseError };
};
