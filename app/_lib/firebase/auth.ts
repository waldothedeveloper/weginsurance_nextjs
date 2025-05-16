import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";

import { auth } from "@/_lib/firebase/clientApp";

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: any) {
  return _onIdTokenChanged(auth, cb);
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
