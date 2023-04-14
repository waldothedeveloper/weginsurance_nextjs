const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "This endpoint only accepts POST requests",
      status: 405,
    });
  }

  try {
    const { fromDate, userPhoneNum } = req.body;
    console.log(`getting all messages from ${fromDate} to present day`);

    const twilioPhoneNum =
      process.env.NODE_ENV === "production"
        ? process.env.WEG_INSURANCE_TWILIO_PRODUCTION_NUMBER
        : process.env.WEG_INSURANCE_DEVELOPMENT_TEST_NUMBER;
    const baseURL = "https://api.twilio.com";

    const urlTwilioToUser = `${baseURL}/2010-04-01/Accounts/${accountSid}/Messages.json?From=${twilioPhoneNum}&To=${userPhoneNum}&DateSent>=${fromDate}`;
    const urlUserToTwilio = `${baseURL}/2010-04-01/Accounts/${accountSid}/Messages.json?From=${userPhoneNum}&To=${twilioPhoneNum}&DateSent>=${fromDate}`;

    const headers = {
      Authorization: `Basic ${Buffer.from(
        `${accountSid}:${authToken}`
      ).toString("base64")}`,
    };

    const messagesTwilio = [];
    const messagesUser = [];

    // all msg from twilio to user
    const getAllMessagesFromTwilioToUser = async (nextPageURL) => {
      const msgTwilio = await fetch(nextPageURL ?? urlTwilioToUser, { headers })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
          return res.status(500).json({
            message:
              "Something is wrong. Couldn't fetch the messages from twilio to user",
            status: error?.status || 500,
            error,
          });
        });
      msgTwilio?.messages?.forEach((message) => messagesTwilio.push(message));

      if (msgTwilio.next_page_uri) {
        const urlTwilioToUserNextPage = `${baseURL}${msgTwilio.next_page_uri}`;
        await getAllMessagesFromTwilioToUser(urlTwilioToUserNextPage);
      } else {
        return;
      }
    };

    await getAllMessagesFromTwilioToUser().catch((error) => {
      console.error(error);
      return res.status(500).json({
        message: "Couldn't fetch the messages from twilio to user",
        status: error?.status || 500,
        error,
      });
    });

    // all msg from user to twilio
    const getAllMessagesFromUserToTwilio = async (nextPageURL) => {
      const msgUser = await fetch(nextPageURL ?? urlUserToTwilio, { headers })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
          return res.status(500).json({
            message:
              "Something is wrong. Couldn't fetch the messages from user to twilio",
            status: error?.status || 500,
            error,
          });
        });
      msgUser?.messages?.forEach((message) => messagesUser.push(message));

      if (msgUser.next_page_uri) {
        const urlUserToTwilioNextPage = `${baseURL}${msgUser.next_page_uri}`;
        await getAllMessagesFromUserToTwilio(urlUserToTwilioNextPage);
      } else {
        return;
      }
    };

    await getAllMessagesFromUserToTwilio().catch((error) => {
      console.error(error);
      return res.status(500).json({
        message: "Couldn't fetch the messages from user to twilio",
        status: error?.status || 500,
        error,
      });
    });

    const allMessages = [...messagesTwilio, ...messagesUser];

    return res.status(200).json(allMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something is wrong. Couldn't fetch the messages at all",
      status: error?.status || 500,
      error,
    });
  }
}
