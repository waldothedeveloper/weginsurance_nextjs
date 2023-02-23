import "firebase/auth";
import "firebase/firestore";

import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

//
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY_DEV,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN_DEV,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL_DEV,
  projectId: process.env.NEXT_PUBLIC_PROJECTID_DEV,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET_DEV,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID_DEV,
  appId: process.env.NEXT_PUBLIC_APPID_DEV,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID_DEV,
};

const createFirebaseApp = (config) => {
  try {
    return getApp();
  } catch (error) {
    return initializeApp(config);
  }
};

export const firebaseApp = createFirebaseApp(firebaseConfig);
export const db = getFirestore(firebaseApp);