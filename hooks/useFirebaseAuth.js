import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

import { firebaseApp } from "@/lib/firebaseConfig";
import { useAuth } from "@clerk/nextjs";

export const useFirebaseAuth = () => {
  const { getToken } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth(firebaseApp);
      const token = await getToken({ template: "integration_firebase" });
      const userCredentials = await signInWithCustomToken(auth, token);
      return userCredentials?.user;
    };

    signInWithClerk()
      .then((user) => {
        setFirebaseUser(user);
      })
      .catch((err) =>
        console.log(`Error in the signInWithClerk Firebase`, err)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return firebaseUser;
};
