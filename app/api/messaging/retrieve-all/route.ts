import { Message } from "types/global";
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const retrieveTwilioToMessages = async () => {
  const messages = await client.messages.list({
    to: "+17865213075",
    // limit: 20,
  });
  return messages;
};

const retrieveTwilioFromMessages = async () => {
  const messages = await client.messages.list({
    from: "+17865213075",
    // limit: 20,
  });
  return messages;
};

const formatMessage = (m: any): Message => ({
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

export async function GET(request: Request) {
  const twilioToMsg = await retrieveTwilioToMessages();
  const twilioFromMsg = await retrieveTwilioFromMessages();

  const allMessages = [...twilioToMsg, ...twilioFromMsg]
    .map(formatMessage)
    .sort(sortByDate);

  return NextResponse.json(
    { messages: allMessages },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    }
  );
}
