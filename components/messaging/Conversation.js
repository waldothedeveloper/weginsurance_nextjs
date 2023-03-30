import { EditorWrapper } from "@/components/messaging/EditorWrapper";
import { MessageList } from "@/components/messaging/MessageList";

export const Conversation = () => {
  return (
    <div className="flex h-screen flex-1 flex-col px-6 pb-6">
      <MessageList />
      <EditorWrapper />
    </div>
  );
};
