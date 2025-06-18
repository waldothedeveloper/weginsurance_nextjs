import { ChatHeader } from "./chat-header";
import { ChatHistory } from "./chat-history";
import { ChatInput } from "./chat-input";
import type { Message } from "types/global";

export const ChatWrapper = ({
  conversation: { messages } = { messages: [] },
}: {
  conversation: { messages: Message[] };
}) => {
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <ChatHistory messages={messages} />
      <ChatInput />
    </div>
  );
};
