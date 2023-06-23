/* eslint-disable operator-linebreak */
export default {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  },
  location: process.env.LOCATION || "us-central1",
  projectId: process.env.IS_FIREBASE_CLI
    ? process.env.PROJECT_ID_DEV
    : process.env.PROJECT_ID_PROD,
  messageCollection: process.env.MESSAGE_COLLECTION || "messages",
  storageBucket:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_STORAGE_BUCKET
      : process.env.DEV_STORAGE_BUCKET,
};
