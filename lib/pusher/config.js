import Pusher from "pusher-js";

// TODO: do NOT do this in production
// Pusher.logToConsole = true;

const pusherCredentials =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PUSHER_APP_KEY_PRODUCTION
    : process.env.NEXT_PUBLIC_PUSHER_APP_KEY_DEVELOPMENT;
export const pusher = new Pusher(pusherCredentials, {
  cluster: "us2",
});
