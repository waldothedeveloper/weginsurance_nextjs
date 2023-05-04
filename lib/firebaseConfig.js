import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getApp, initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

//
const firebaseDevelopmentConfig = {
  apiKey: process.env.NEXT_PUBLIC_DEVELOPMENT_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_DEVELOPMENT_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_DEVELOPMENT_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_DEVELOPMENT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DEVELOPMENT_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_DEVELOPMENT_APPID,
  measurementId: process.env.NEXT_PUBLIC_DEVELOPMENT_MEASUREMENTID,
};

const firebaseProductionConfig = {
  apiKey: process.env.NEXT_PUBLIC_PRODUCTION_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_PRODUCTION_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_PRODUCTION_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_PRODUCTION_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_PRODUCTION_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PRODUCTION_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_PRODUCTION_APPID,
  measurementId: process.env.NEXT_PUBLIC_PRODUCTION_MEASUREMENTID,
};

const createFirebaseApp = (config) => {
  try {
    if (process.env.NODE_ENV === "development") {
      const db = getFirestore();
      const functions = getFunctions(getApp());
      connectFunctionsEmulator(functions, "localhost", 5001);
      connectFirestoreEmulator(db, "localhost", 8080);
    }
    return getApp();
  } catch (error) {
    return initializeApp(config);
  }
};

export const firebaseApp = createFirebaseApp(
  process.env.NODE_ENV === "development"
    ? firebaseDevelopmentConfig
    : firebaseProductionConfig
);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
