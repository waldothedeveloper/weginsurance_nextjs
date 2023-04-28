const Pusher = require("pusher");
const { MessagingResponse } = require("twilio").twiml;

const pusherCredentialsDevelopment = {
  appId: process.env.PUSHER_APP_ID_DEVELOPMENT,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY_DEVELOPMENT,
  secret: process.env.PUSHER_APP_SECRET_DEVELOPMENT,
  cluster: "us2",
  useTLS: true,
};

const pusherCredentialsProduction = {
  appId: process.env.PUSHER_APP_ID_PRODUCTION,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY_PRODUCTION,
  secret: process.env.PUSHER_APP_SECRET_PRODUCTION,
  cluster: "us2",
  useTLS: true,
};

const pusherCredentials =
  process.env.NODE_ENV === "production"
    ? pusherCredentialsProduction
    : pusherCredentialsDevelopment;

const pusher = new Pusher(pusherCredentials);

// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint

export default async function handler(req, res) {
  const twiml = new MessagingResponse();
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  const { From } = req?.body || null;

  if (!From) {
    return res.status(404).json({ message: "No inbound sms details found!" });
  }

  await pusher
    .trigger("sms", "inbound-sms", req?.body)
    .then(() => {
      res.setHeader("Content-Type", "text/html");
      res.send(null, twiml);
    })
    .catch(() => {
      res.setHeader("Content-Type", "text/html");
      res.send(null, twiml);
    });
}
