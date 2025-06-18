import "server-only";

import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { cookies } from "next/headers";
import { firebaseConfig } from "./config";

export async function getAuthenticatedAppForUser() {
  try {
    const authIdToken = cookies().get("__firebase_session");
    if (!authIdToken) {
      throw new Error(
        "No Firebase auth token found in cookies. Your server app cannot make authenticated requests to Firebase."
      );
    }

    const firebaseServerApp = initializeServerApp(firebaseConfig, {
      authIdToken: authIdToken?.value,
    });

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    return { firebaseServerApp, currentUser: auth.currentUser };
  } catch (error) {
    console.error("Error initializing Firebase app:", error);
    throw error;
  }
}

export async function myFirebaseServerApp() {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);
  return { firebaseServerApp, db };
}
