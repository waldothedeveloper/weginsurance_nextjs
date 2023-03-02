import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseApp } from "@/lib/firebaseConfig";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

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

        const authUser = await signInWithCustomToken(auth, token);

        if (!token) {
          return false;
        }

        return authUser;
      } catch (error) {
        setFirebaseError(error);
      }
    };

    signInWithClerk()
      .then((authUser) => {
        if (authUser) setFirebaseAuth(true);

        return authUser;
      })
      .catch((err) => setFirebaseError(err));

    return () => {
      setFirebaseUsers([]);
      setFirebaseAuth(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    if (firebaseAuth) {
      const dbQuery = query(collection(db, "ChatRooms"), orderBy("firstname"));
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const users = [];
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
