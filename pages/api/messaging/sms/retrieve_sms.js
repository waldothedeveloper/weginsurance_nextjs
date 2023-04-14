import dayjs from "dayjs";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
  autoRetry: true,
  maxRetries: 6,
});

// TODO: Make sure to add Twilio webhook security verification, so that only Twilio can send requests to this endpoint

export default async function handler(req, res) {
  const { user_phone } = req?.body || null;

  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  if (!user_phone) {
    return res.status(500).json({
      message: "A valid client user user_phone number is required!",
      status: 500,
    });
  }

  try {
    // get me all messages SENT from WEG INSURANCE to this user
    const smsFromApptoUser = await client.messages
      .list({
        from:
          process.env.NODE_ENV === "production"
            ? process.env.WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER
            : process.env.WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER,
        to: user_phone,
      })
      .then((data) => data)
      .catch((err) => {
        // console.log(
        //   "ERROR RETRIEVING SMS MESSAGES SENT FROM APP TO USER: ",
        //   err
        // );
        return res.status(500).json({
          message: "Our system has detected an unexpected error.",
          status: err?.status || 500,
          error: err,
        });
      });

    // get me all messages RECEIVED from this user to APP
    const smsFromUserToApp = await client.messages
      .list({
        from: user_phone,
        to:
          process.env.NODE_ENV === "production"
            ? process.env.WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER
            : process.env.WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER,
      })
      .then((data) => data)
      .catch((err) => {
        return res.status(500).json({
          message: "Our system has detected an unexpected error.",
          status: err?.status || 500,
          error: err,
        });
      });

    const finalMessagesArrayNotSorted =
      smsFromApptoUser.concat(smsFromUserToApp);

    const groupedDays = (messages) =>
      messages.reduce((acc, el) => {
        const messageDay = dayjs(el.dateCreated).format("YYYY-MM-DD");
        if (acc[messageDay]) {
          return { ...acc, [messageDay]: [...acc[messageDay], el] };
        }
        return { ...acc, [messageDay]: [el] };
      }, {});

    const generateItems = (messages) => {
      const days = groupedDays(messages);
      const sortedDays = Object.keys(days).sort(
        (x, y) => dayjs(y, "YYYY-MM-DD").unix() - dayjs(x, "YYYY-MM-DD").unix()
      );
      const items = sortedDays.reduce((acc, date) => {
        const sortedMessages = days[date].sort(
          (x, y) => dayjs(y.dateCreated).diff(dayjs(x.dateCreated))
          // (x, y) => new Date(y.dateCreated) - new Date(x.dateCreated)
        );
        return acc.concat([...sortedMessages, { type: "day", date, id: date }]);
      }, []);
      return items;
    };

    const allMsg = generateItems(finalMessagesArrayNotSorted).reverse();

    return res.status(200).json(allMsg);
  } catch (error) {
    // console.log("error: ", error);
    return res.status(500).json({
      message: "Our system has detected an unexpected error.",
      status: error?.status || 500,
      error,
    });
  }
}
