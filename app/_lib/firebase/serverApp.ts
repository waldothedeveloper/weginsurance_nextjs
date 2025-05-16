import "server-only";

import { cookies } from "next/headers";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { initializeServerApp } from "firebase/app";

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
