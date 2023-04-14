import { ChatMessage } from "@/components/messaging/components/ChatMessage";
import { TimeDivider } from "@/components/messaging/TimeDivider";
import { messagesListAtom } from "@/lib/state/atoms";
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

//
export const ChatWindow = ({ virtualizer, items }: ChatWindowProps) => {
  const messagesAtom = useAtomValue(messagesListAtom);
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
              {messagesAtom && "type" in messagesAtom[virtualRow.index] ? (
                <TimeDivider time={messagesAtom[virtualRow.index]?.date} />
              ) : (
                <ChatMessage msg={messagesAtom[virtualRow.index]} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
