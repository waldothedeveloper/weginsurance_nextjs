import { ChatHeader } from "./components/chat-header";
import { ChatHistory } from "./components/chat-history";
import { ChatInput } from "./components/chat-input";
import { ChatWrapper } from "./components/chat-wrapper";

export default function Messages() {
  return (
    <div>
      <ChatWrapper>
        <ChatHeader />
        <ChatHistory />
        <ChatInput />
      </ChatWrapper>
    </div>
  );
}
