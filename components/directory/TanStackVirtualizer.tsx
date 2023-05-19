import { RealUser } from "@/interfaces/index";
import { UserList } from "@/components/directory/UserList";
import { useRef } from 'react'
import { useVirtualizer } from "@tanstack/react-virtual";
// 
// eslint-disable-next-line no-unused-vars
export const TanStackVirtualizer = ({ users, getMessages }: { users: RealUser[], getMessages: (userId: string) => Promise<void> }) => {

  const parentRef = useRef(null);
  // 
  const count = users.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();


  {/* The large inner element to hold all of the items */ }
  return (
    <div
      ref={parentRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden"
      style={{ contain: "strict" }}
    >

      < div
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }
        }
      >
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
                <UserList user={users[virtualRow.index]} getMessages={getMessages} />
              </div>
            )
          })}
        </div>
      </div >
    </div>
  )

}