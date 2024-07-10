import "server-only";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { initializeServerApp } from "firebase/app";

export async function getAuthenticatedAppForUser() {
  try {
    const { getToken } = clerkAuth();
    const template = "firebase";
    const token = await getToken({ template });

    const firebaseServerApp = initializeServerApp(
      firebaseConfig,
      token
        ? {
            authIdToken: token,
          }
        : {}
    );

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    return { firebaseServerApp, currentUser: auth.currentUser };
  } catch (error) {
    console.error("Error in getAuthenticatedAppForUser:", error);
    throw error;
  }
}
