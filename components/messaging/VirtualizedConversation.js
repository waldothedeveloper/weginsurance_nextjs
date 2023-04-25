import { useEffect, useRef } from "react";

import { ChatWindow } from "@/components/messaging/components/ChatWindow";
import { messagesListAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { useVirtualizer } from "@tanstack/react-virtual";

export const VirtualizedConversation = () => {
  const parentRef = useRef(null);
  const messagesAtom = useAtomValue(messagesListAtom);

  const count = (messagesAtom && messagesAtom.length) || 0;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    if (count) virtualizer.scrollToIndex(count - 1);
  }, [count, virtualizer]);

  return (
    <div
      ref={parentRef}
      className="h-5/6 w-full overflow-y-auto overflow-x-hidden"
      style={{ contain: "strict" }}
    >
      {/* The large inner element to hold all of the items */}
      <div
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        <ChatWindow virtualizer={virtualizer} items={items} />
      </div>
    </div>
  );
};