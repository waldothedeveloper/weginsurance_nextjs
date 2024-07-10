import {
  onAuthStateChanged as _onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";

import { auth } from "@/_lib/firebase/clientApp";
import { auth as clerkAuth } from "@clerk/nextjs/server";

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithCustomClerkToken() {
  const { getToken } = clerkAuth();
  const template = "firebase";
  const token = await getToken({ template });

  try {
    const res = await signInWithCustomToken(auth, token || "");
    console.log("res firebase custom token sign in?: ", res);
  } catch (error) {
    console.error(
      "Error signing in with custom token from Clerk in Firebase",
      error
    );
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
