import { ChatWrapper } from "./components/chat-wrapper";
import { getSingleFirebaseUser } from "@/_lib/firebase/firestore";
import { getTwilioMessages } from "@/_lib/twilio/server-actions";
import { myFirebaseServerApp } from "@/_lib/firebase/serverApp";

interface MessagesPageProps {
  searchParams: {
    userId?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function Conversation({
  searchParams,
}: MessagesPageProps) {
  const { db } = await myFirebaseServerApp();

  const selectedFirebaseUser = await getSingleFirebaseUser(
    searchParams?.userId,
    db
  );

  const conversation = await getTwilioMessages(
    selectedFirebaseUser?.user?.personal_info?.phone
  );
  return <ChatWrapper conversation={conversation} />;
}
