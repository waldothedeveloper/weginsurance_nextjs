const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID_DEVELOPMENT,
  key: process.env.PUSHER_APP_KEY_DEVELOPMENT,
  secret: process.env.PUSHER_APP_SECRET_DEVELOPMENT,
  cluster: "us2",
  useTLS: true,
});

// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  const { Body, From, FromCity, FromCountry, FromState, FromZip, To } =
    req?.body || null;
  const twilioIncomingMessage = {
    Body,
    From,
    FromCity,
    FromCountry,
    FromState,
    FromZip,
    To,
  };

  if (!twilioIncomingMessage) {
    return res.status(404).json({ message: "No inbound sms details found!" });
  }

  pusher
    .trigger("sms", "inbound-sms", {
      body: twilioIncomingMessage.Body,
      from: twilioIncomingMessage.From,
      fromCity: twilioIncomingMessage.FromCity,
      fromCountry: twilioIncomingMessage.FromCountry,
      fromState: twilioIncomingMessage.FromState,
      fromZip: twilioIncomingMessage.FromZip,
      to: twilioIncomingMessage.To,
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });

  return res.status(200).json({ message: "success" });
}
