import {
  CheckIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

import { ConversationInterface } from "@/interfaces/index";
import { TimeDivider } from "@/components/messaging/TimeDivider";
import { messageStatus } from "@/utils/messageStatus";

type MessageListProps = { messagesList: ConversationInterface };

export const MessageList = ({ messagesList }: MessageListProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    if (messagesList) scrollToBottom();
  }, [messagesList]);

  //
  return (
    <>
      <div className="grid h-full grid-cols-1 overflow-y-auto overflow-x-hidden">
        {messagesList &&
          Object.keys(messagesList)?.map((timestampKey: string) => {
            return (
              <div key={timestampKey}>
                <TimeDivider time={messagesList[timestampKey][0].dateCreated} />
                <div className="grid grid-cols-1 space-y-2 px-5">
                  {messagesList &&
                    messagesList[timestampKey].map((message) => (
                      <div
                        ref={messagesEndRef}
                        key={message.sid}
                        className={
                          message.direction === "outbound-api"
                            ? "max-w-md place-self-end"
                            : "max-w-lg place-self-start"
                        }
                      >
                        <div>
                          <div className="ml-2 text-xs font-medium text-slate-400">
                            {new Date(message.dateCreated).toLocaleTimeString(
                              "en",
                              {
                                hour: "numeric",
                                minute: "numeric",
                                // hour12: true,
                              }
                            )}
                          </div>
                          <div
                            key={message.dateCreated}
                            className={
                              message.direction === "outbound-api"
                                ? "mt-1 rounded-2xl rounded-br-none bg-green-500 p-3"
                                : message.status === "undelivered" ||
                                  message.status === "failed"
                                ? "mt-1 rounded-2xl rounded-br-none bg-red-50 p-3"
                                : "mt-1 rounded-2xl rounded-bl-none bg-slate-100 p-3"
                            }
                          >
                            <p
                              className={
                                message.direction === "outbound-api"
                                  ? "whitespace-pre-wrap text-white"
                                  : message.status === "undelivered" ||
                                    message.status === "failed"
                                  ? "whitespace-pre-wrap text-red-700"
                                  : "whitespace-pre-wrap text-slate-900"
                              }
                            >
                              {message.body}
                            </p>
                          </div>
                          {message.direction === "outbound-api" && (
                            <div className="mt-1 flex items-center justify-end">
                              <p
                                className={
                                  message.status === "undelivered" ||
                                  message.status === "failed"
                                    ? "animate-pulse text-xs font-medium text-red-600"
                                    : "text-xs font-medium text-gray-400"
                                }
                              >
                                {messageStatus(message.status).status}
                              </p>
                              {message.status === "delivered" && (
                                <div className="flex">
                                  <CheckIcon className="h-5 w-5 text-green-500" />
                                  <CheckIcon className="-ml-4 h-5 w-5 text-green-500" />
                                </div>
                              )}
                              {message.status === "undelivered" && (
                                <div className="flex">
                                  <ExclamationTriangleIcon className="ml-2 h-5 w-5 animate-pulse text-red-500" />
                                </div>
                              )}
                              {message.status === "sent" && (
                                <div className="flex">
                                  <PaperAirplaneIcon className="ml-0.5 h-5 w-5 -rotate-12 text-slate-400" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
