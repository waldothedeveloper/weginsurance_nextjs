import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "failed";
}

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

const renderStatusIndicator = (status?: string) => {
  switch (status) {
    case "sending":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ClockIcon className="text-slate-200 size-4" />
        </div>
      );
    case "sent":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <CheckIcon className="text-slate-200 size-4" />
        </div>
      );
    case "delivered":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center">
            <CheckIcon className="text-green-400 size-4" />
            <CheckIcon className="text-green-400 size-4 -ml-3" />
          </div>
        </div>
      );
    case "failed":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ExclamationCircleIcon className="text-red-500 size-4" />
        </div>
      );
    default:
      return null;
  }
};

const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const dateKey = message.timestamp.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return Object.entries(groups).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );
};

export const ChatHistory = async () => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return <div>test</div>;

  // return (
  //   <div className="flex-1 overflow-y-auto p-4 bg-slate-50" id="chat-messages">
  //     {groupMessagesByDate(messages).map(([dateKey, dayMessages]) => (
  //       <div key={dateKey} className="mb-6">
  //         {/* Date Header */}
  //         <div className="flex justify-center mb-4">
  //           <div className="bg-slate-500 text-slate-50 text-xs px-3 py-1 rounded-full font-medium">
  //             {formatDate(new Date(dateKey))}
  //           </div>
  //         </div>

  //         <div className="space-y-4">
  //           {dayMessages.map((message) => (
  //             <div
  //               key={message.id}
  //               className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  //             >
  //               {message.sender === "other" && (
  //                 <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2 shrink-0">
  //                   <Image
  //                     src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //                     alt="User Avatar"
  //                     width={32}
  //                     height={32}
  //                     className="object-cover"
  //                   />
  //                 </div>
  //               )}
  //               <div
  //                 className={`max-w-[75%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-slate-800"} rounded-2xl px-4 py-2 shadow-xs`}
  //               >
  //                 <p>{message.content}</p>
  //                 <div
  //                   className={`flex items-end justify-end gap-2 text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-slate-500"}`}
  //                 >
  //                   <span>{formatTime(message.timestamp)}</span>
  //                   {message.sender === "user" && (
  //                     <div className="shrink-0">
  //                       {renderStatusIndicator(message.status)}
  //                     </div>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};
