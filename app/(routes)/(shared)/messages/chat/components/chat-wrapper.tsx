"use client";

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChatHeader } from "./chat-header";
import { ChatHistory } from "./chat-history";
import { ChatInput } from "./chat-input";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ChatWrapperProps {
  userId: string;
}

export const ChatWrapper = ({ userId }: ChatWrapperProps) => {
  // Use the same query keys as prefetched in server component
  const { data: firebaseUser } = useSuspenseQuery({
    queryKey: ["firebase-user", userId],
    queryFn: () => {
      throw new Error("User data should be prefetched");
    },
  });

  const { data: messages } = useSuspenseQuery({
    queryKey: ["twilio-messages", userId],
    queryFn: () => {
      throw new Error("Messages should be prefetched");
    },
  });

  if (!firebaseUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <ChatBubbleOvalLeftEllipsisIcon className="mx-auto size-16 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Comienza una conversación
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Para ver un chat, selecciona un usuario de la lista a la izquierda y
            comienza a intercambiar mensajes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader user={firebaseUser} />
      <ChatHistory messages={messages} user={firebaseUser} />
      <ChatInput />
    </div>
  );
};
