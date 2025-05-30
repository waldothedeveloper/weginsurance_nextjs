"use client";

import Image from "next/image";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
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

export const ChatHistory = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! How was your weekend?",
      sender: "other",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000
      ),
    },
    {
      id: "2",
      content:
        "It was great! Went hiking and had a barbecue with friends. How about yours?",
      sender: "user",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 - 1.5 * 60 * 60 * 1000
      ),
    },
    {
      id: "3",
      content:
        "Sounds amazing! I spent most of it reading and relaxing at home.",
      sender: "other",
      timestamp: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000
      ),
    },
    // Messages from yesterday
    {
      id: "4",
      content: "Good morning! Ready for another productive day?",
      sender: "other",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000
      ),
    },
    {
      id: "5",
      content:
        "Morning! Absolutely! I have a few meetings lined up but looking forward to them.",
      sender: "user",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 7.5 * 60 * 60 * 1000
      ),
    },
    {
      id: "6",
      content: "That's the spirit! Let me know how they go.",
      sender: "other",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 7 * 60 * 60 * 1000
      ),
    },
    {
      id: "7",
      content: "The meetings went really well! Thanks for asking 😊",
      sender: "user",
      timestamp: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000
      ),
    },
    // Messages from today
    {
      id: "8",
      content: "Hey there! How are you doing today?",
      sender: "other",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: "9",
      content:
        "I'm doing great! Just working on some new projects. How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    },
    {
      id: "10",
      content:
        "That sounds exciting! I'm just catching up on some reading and planning for the weekend.",
      sender: "other",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50" id="chat-messages">
      {groupMessagesByDate(messages).map(([dateKey, dayMessages]) => (
        <div key={dateKey} className="mb-6">
          {/* Date Header */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {formatDate(new Date(dateKey))}
            </div>
          </div>

          {/* Messages for this date */}
          <div className="space-y-4">
            {dayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "other" && (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"} rounded-2xl px-4 py-2 shadow-sm`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
