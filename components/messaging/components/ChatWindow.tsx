import { ChatMessage } from "@/components/messaging/components/ChatMessage";
import { Message } from "@/interfaces/index";
import { TimeDivider } from "@/components/messaging/TimeDivider";
import { messagesAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
//
type ChatWindowProps = {
  items: VirtualItem[];
  virtualizer: any;
};

type VirtualItem = {
  index: number;
  key: number;
  lane: number;
  size: number;
  start: number;
};


export const ChatWindow = ({ virtualizer, items }: ChatWindowProps) => {
  const messagesFromDB = useAtomValue(messagesAtom) as Message[];
  //
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
            <div className="py-0.5">
              {Array.isArray(messagesFromDB) && "type" in messagesFromDB[virtualRow.index] ? (
                <TimeDivider time={messagesFromDB[virtualRow.index]?.dateCreated} />
              ) : (
                <ChatMessage msg={messagesFromDB[virtualRow.index]} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
