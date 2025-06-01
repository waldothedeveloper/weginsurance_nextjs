import { User, signInWithCustomToken } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { auth } from "@/_lib/firebase/clientApp";
import { onIdTokenChanged } from "@/_lib/firebase/auth";
import { useAuth } from "@clerk/nextjs";

//
export const useFirebaseToken = () => {
  const { getToken } = useAuth();
  const [firebaseState, setFirebaseState] = useState<{
    firebaseTokenAuth: `ok` | null;
    firebaseTokenError: Error | null;
  }>({
    firebaseTokenAuth: null,
    firebaseTokenError: null,
  });
  const { firebaseTokenAuth, firebaseTokenError } = firebaseState;

  useEffect(() => {
    const signInWithClerk = async () => {
      try {
        const token = await getToken({
          template: "integration_firebase",
        });

        if (token) {
          const userCredentials = await signInWithCustomToken(
            auth,
            token || ""
          );

          if (userCredentials.user) {
            const gToken = await userCredentials.user.getIdToken();
            await setCookie("__firebase_session", gToken);
            setFirebaseState({
              firebaseTokenAuth: `ok`,
              firebaseTokenError: null,
            });
          } else {
            deleteCookie("__firebase_session");
            setFirebaseState({
              firebaseTokenAuth: null,
              firebaseTokenError: new Error(
                "User credentials not found after sign-in"
              ),
            });
          }
          return userCredentials.user;
        }
        return () => {
          deleteCookie("__firebase_session");
          setFirebaseState({
            firebaseTokenAuth: null,
            firebaseTokenError: null,
          });
        };
      } catch (error) {
        return error;
      }
    };

    signInWithClerk();
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (user: User) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__firebase_session", idToken);
        setFirebaseState({
          firebaseTokenAuth: `ok`,
          firebaseTokenError: null,
        });
      } else {
        await deleteCookie("__firebase_session");
        setFirebaseState({
          firebaseTokenAuth: null,
          firebaseTokenError: new Error(
            "User is no longer authenticated with Firebase. Please sign in again as normal."
          ),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    firebaseTokenAuth,
    firebaseTokenError,
  };
};
