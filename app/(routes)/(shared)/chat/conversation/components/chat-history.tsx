"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import type { Message } from "types/global";
import { UserContext } from "@/global-hooks/useUser";

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Hoy";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Ayer";
  } else {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

const renderStatusIndicator = (status?: Message["status"]) => {
  switch (status) {
    case "queued":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ClockIcon className="text-gray-400 size-4" />
        </div>
      );
    case "accepted":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <CheckIcon className="text-gray-400 size-4" />
        </div>
      );
    case "scheduled":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ClockIcon className="text-gray-400 size-4" />
        </div>
      );
    case "sending":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ClockIcon className="text-blue-400 size-4" />
        </div>
      );
    case "sent":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <CheckIcon className="text-gray-400 size-4" />
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
    case "read":
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
    case "undelivered":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ExclamationCircleIcon className="text-red-500 size-4" />
        </div>
      );
    case "canceled":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ExclamationCircleIcon className="text-red-500 size-4" />
        </div>
      );
    case "receiving":
      return (
        <div className="flex flex-col items-end gap-0.5">
          <ClockIcon className="text-gray-400 size-4" />
        </div>
      );
    default:
      return null;
  }
};

const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    // Convert string to Date first, then get date string
    const dateKey = new Date(message.dateSent).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  // Sort groups by date AND sort messages within each group by time
  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([dateKey, dayMessages]) => ({
      date: dateKey,
      messages: dayMessages.sort(
        (a, b) =>
          new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime()
      ),
    }));
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const ChatHistory = ({ messages }: { messages: Message[] }) => {
  const { selectedUser } = useContext(UserContext);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const scrollToBottom = (smooth = false) => {
    const container = chatContainerRef.current;
    if (container) {
      if (smooth) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  // Reset initialization when user changes
  useEffect(() => {
    const userId = selectedUser?.fireUID;
    if (currentUserId !== userId) {
      setIsInitialized(false);
      setShouldAutoScroll(true);
      setCurrentUserId(userId ?? null);
    }
  }, [selectedUser, currentUserId]);

  // Initial scroll to bottom without animation
  useEffect(() => {
    if (messages.length > 0 && !isInitialized) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        scrollToBottom(false); // No smooth scrolling for initial load
        setIsInitialized(true);
      }, 0);
    }
  }, [messages.length, isInitialized]);

  // Subsequent scrolls (for new messages) with animation
  useEffect(() => {
    if (isInitialized && shouldAutoScroll && messages.length > 0) {
      scrollToBottom(true); // Smooth scrolling for new messages
    }
  }, [messages, isInitialized, shouldAutoScroll]);

  return !messages.length ? (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scroll-smooth">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <ChatBubbleOvalLeftEllipsisIcon className="mx-auto size-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          No hay mensajes aún
        </h3>
        <p className="text-sm text-gray-500">
          Inicia una conversación enviando un mensaje
        </p>
      </div>
    </div>
  ) : (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
      id="chat-messages"
      style={{ scrollBehavior: "auto" }} // Disable smooth scrolling by default
    >
      {groupMessagesByDate(messages).map(({ date, messages: dayMessages }) => (
        <div key={date} className="mb-6">
          {/* Date Header */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-500 text-gray-50 text-xs px-3 py-1 rounded-full font-medium">
              {formatDate(new Date(date))}
            </div>
          </div>

          <div className="space-y-4">
            {dayMessages.map((message) => (
              <div
                key={message.sid}
                className={`flex ${
                  message.from === selectedUser?.user.personal_info.phone
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.from === selectedUser?.user.personal_info.phone && (
                  <div className="relative size-8 rounded-full overflow-hidden mr-2 shrink-0">
                    <Image
                      src={
                        selectedUser?.user.personal_info.avatar ||
                        "/default-avatar.png"
                      }
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] ${
                    message.from === selectedUser?.user.personal_info.phone
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  } rounded-2xl px-4 py-2 shadow-xs max-w-md`}
                >
                  <p>{message.body}</p>
                  <div
                    className={`flex items-end justify-end gap-2 text-xs mt-1 ${
                      message.from === selectedUser?.user.personal_info.phone
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    <span>{formatTime(new Date(message.dateSent))}</span>
                    {message.from !==
                      selectedUser?.user.personal_info.phone && (
                      <div className="shrink-0">
                        {renderStatusIndicator(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
