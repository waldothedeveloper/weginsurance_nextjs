import Pusher from "pusher-js";

// TODO: do NOT do this in production
// Pusher.logToConsole = true;

export const pusher = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY_DEVELOPMENT,
  {
    cluster: "us2",
  }
);
