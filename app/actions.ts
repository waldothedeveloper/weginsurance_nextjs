"use server";
const AccessToken = require("twilio").jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid =
  process.env.NODE_ENV !== "development"
    ? process.env.TWILIO_ACCOUNT_SID
    : process.env.TWILIO_TEST_ACCOUNT_SID;
const twilioApiKey =
  process.env.NODE_ENV !== "development"
    ? process.env.TWILIO_API_SID_KEY_PROD
    : process.env.TWILIO_API_SID_KEY_DEV;
const twilioApiSecret =
  process.env.NODE_ENV !== "development"
    ? process.env.TWILIO_API_SECRET_KEY_PROD
    : process.env.TWILIO_API_SECRET_KEY_DEV;

export const createTwilioConversationToken = () => {
  try {
    // Used specifically for creating Chat tokens
    const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
    const identity = "user@example.com";

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: serviceSid,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {
        identity: identity,
      }
    );

    token.addGrant(chatGrant);

    // Serialize the token to a JWT string
    // console.log(`CREATED TWILIO TOKEN`, token.toJwt());

    return token.toJwt();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error;
    } else {
      return new Error("An error occurred while creating Twilio token");
    }
  }
};
