import { Message, VirtualizedConversationType } from "@/interfaces/index";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

import { ChatMessage } from "@/components/messaging/components/ChatMessage";
import { TimeDivider } from "@/components/messaging/TimeDivider";

type ChatWindowProps = {
  items: VirtualItem<Element>[];
  virtualizer: Virtualizer<Element, Element>;
  messages: VirtualizedConversationType | null
};


export const ChatWindow = ({ virtualizer, items, messages }: ChatWindowProps) => {
  return (
    <div
      style={{
        transform: `translateY(${items[0]?.start}px)`,
      }}
      className="absolute left-0 top-0 w-full"
    >
      {items.map((virtualRow) => {
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
          >
            <div className="py-3">
              {Array.isArray(messages) && "type" in messages[virtualRow.index] ? (
                <TimeDivider time={messages[virtualRow.index]?.dateCreated} />
              ) : messages && messages[virtualRow.index] && (
                <ChatMessage msg={messages[virtualRow.index] as Message} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
