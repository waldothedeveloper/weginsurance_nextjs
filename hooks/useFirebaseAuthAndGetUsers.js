import { collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";
import { firebaseApp } from "@/lib/firebaseConfig";
import { useAuth } from "@clerk/nextjs";

export const useFirebaseAuthAndGetUsers = () => {
  const { getToken } = useAuth();
  const [firebaseUsers, setFirebaseUsers] = useState([]);
  const [firebaseError, setFirebaseError] = useState(null);

  useEffect(() => {
    let users = [];
    const signInWithClerk = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const token = await getToken({ template: "integration_firebase" });

        await signInWithCustomToken(auth, token);

        if (!token) {
          return;
        }
      } catch (error) {
        setFirebaseError(error);
      }
    };

    signInWithClerk()
      .then(() => {
        const getFirebaseUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "ChatRooms"));
            querySnapshot.forEach((doc) => {
              users.push(doc.data());
            });

            setFirebaseUsers(users);
          } catch (error) {
            setFirebaseError(error);
          }
        };

        getFirebaseUsers().catch((err) => setFirebaseError(err));
      })
      .catch((err) => setFirebaseError(err));

    return () => {
      users = [];
      setFirebaseUsers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { firebaseUsers, firebaseError };
};
