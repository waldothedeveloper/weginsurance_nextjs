import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { H } from "highlight.run";
import { RealUser } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { useUser } from "@clerk/nextjs";

//
export const useFirebaseUsers = () => {
  const [firebaseUsers, setFirebaseUsers] = useState<RealUser[] | null>(null);
  const [firebaseError, setFirebaseError] = useState<{} | null>(null);
  const [isLoadingFirebaseUsers, setIsLoadingFirebaseUsers] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const email = user?.emailAddresses[0]?.emailAddress;
      const fullname = user?.fullName;
      const id = user?.id;
      H.identify(email, {
        id: id,
        name: fullname || "",
      });
    }
  }, [user]);

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
        } else {
          // if hypotetically there are no users in the database, set the users to an empty array so that the user directory table doesn't show the loading spinner forever
          setFirebaseUsers([]);
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
