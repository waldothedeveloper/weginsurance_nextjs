import { Twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken, {
  autoRetry: true,
  maxRetries: 6,
});

// get messages from Twilio
export const getMessages = async (
  from: string | undefined,
  to: string | undefined
) => {
  if (!from || !to)
    return new Error(`Please provide a valid from and to phone numbers`);
  try {
    const messages = await client.messages.list({ from, to });
    return messages;
  } catch (error) {
    return new Error(`Error fetching messages: ${error}`);
  }
};
