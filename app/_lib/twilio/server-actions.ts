import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { Message } from "types/global";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const retrieveTwilioToMessages = async (phone: string) => {
  const messages = await client.messages.list({
    to: phone,
    // limit: 20,
  });
  return messages;
};

const retrieveTwilioFromMessages = async (phone: string) => {
  const messages = await client.messages.list({
    from: phone,
    // limit: 20,
  });
  return messages;
};

const formatMessage = (m: MessageInstance): Message => ({
  body: m.body,
  from: m.from,
  to: m.to,
  direction: m.direction,
  numMedia: m.numMedia,
  uri: m.uri,
  status: m.status,
  sid: m.sid,
  dateCreated: m.dateCreated,
  dateSent: m.dateSent,
});

// sort descending by dateCreated
const sortByDate = (a: Message, b: Message) =>
  new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();

export async function getTwilioMessages(
  phone: string | null | undefined
): Promise<{ messages: Message[] }> {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    if (!accountSid || !authToken) {
      console.error("Twilio credentials are not set.");
      throw Error("Twilio credentials are not set.");
    }

    if (!phone) {
      console.error("Phone number is required.");
      throw Error("Phone number is required.");
    }

    const twilioToMsg = await retrieveTwilioToMessages(phone);
    const twilioFromMsg = await retrieveTwilioFromMessages(phone);

    const allMessages = [...twilioToMsg, ...twilioFromMsg]
      .map(formatMessage)
      .sort(sortByDate);

    return { messages: allMessages };
  } catch (error) {
    console.error("Error retrieving Twilio messages:", error);
    return { messages: [] };
  }
}
