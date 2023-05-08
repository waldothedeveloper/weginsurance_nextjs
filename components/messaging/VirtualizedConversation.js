import { useEffect, useRef } from "react";

import { ChatWindow } from "@/components/messaging/components/ChatWindow";
import { messagesAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { useUpdateUserConversations } from "@/hooks/messaging/useUpdateUserConversations";
import { useVirtualizer } from "@tanstack/react-virtual";

export const VirtualizedConversation = () => {
  const parentRef = useRef(null);
  const { error } = useUpdateUserConversations();
  const messagesFromDB = useAtomValue(messagesAtom);

  const count = (messagesFromDB && messagesFromDB.length) || 0;
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
