interface Config {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  [key: string]: string | undefined; // This is the index signature
}

const firebaseDevelopmentConfig: Config = {
  apiKey: process.env.NEXT_PUBLIC_DEVELOPMENT_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_DEVELOPMENT_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_DEVELOPMENT_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_DEVELOPMENT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DEVELOPMENT_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_DEVELOPMENT_APPID,
};

const firebaseProductionConfig: Config = {
  apiKey: process.env.NEXT_PUBLIC_PRODUCTION_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_PRODUCTION_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_PRODUCTION_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_PRODUCTION_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_PRODUCTION_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PRODUCTION_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_PRODUCTION_APPID,
};

// When deployed, there are quotes that need to be stripped
// Object.keys(firebaseProductionConfig).forEach((key) => {
//   const configValue = firebaseProductionConfig[key] + "";
//   if (configValue.charAt(0) === '"') {
//     firebaseProductionConfig[key] = configValue.substring(
//       1,
//       configValue.length - 1
//     );
//   }
// });

// This might not be needed because development wouldn't be deployed, right? Keeping it for now
// Object.keys(firebaseDevelopmentConfig).forEach((key) => {
//   const configValue = firebaseDevelopmentConfig[key] + "";
//   if (configValue.charAt(0) === '"') {
//     firebaseDevelopmentConfig[key] = configValue.substring(
//       1,
//       configValue.length - 1
//     );
//   }
// });

export const firebaseConfig =
  process.env.NODE_ENV === "development"
    ? firebaseDevelopmentConfig
    : firebaseProductionConfig;
