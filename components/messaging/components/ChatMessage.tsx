import {
  CheckIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { ChatCard } from "@/components/messaging/components/ChatCard";
import { ChatCardGrid } from "@/components/messaging/components/ChatCardGrid";
import { Message } from "@/interfaces/index";
// import { MessageAttachments } from "@/components/messaging/components/MessageAttachments";
import { classNames } from "@/utils/classNames";
import dayjs from "dayjs";
import { messageStatus } from "@/utils/messageStatus";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

type ChatMessageProps = { msg: Message };
//
export const ChatMessage = ({ msg }: ChatMessageProps) => {
  // console.log('msg: ', msg);


  const { direction, delivery } = msg;

  const inboundMsg = direction === "inbound";
  const outboundMsg = direction === "outbound-api";
  const deliveredMsg = delivery?.info?.status === "delivered";
  const undeliveredMsg = delivery?.info?.status === "undelivered";
  const failedMsg = delivery?.info?.status === "failed";
  const sentMsg = delivery?.info?.status === "sent" || delivery?.info?.status === "queued";

  return (
    <div className="grid grid-cols-1 space-y-2 px-6">
      <div
        className={
          outboundMsg ? "max-w-lg place-self-end" : "max-w-lg place-self-start"
        }
      >
        <div>
          <div className="ml-2 text-xs font-medium text-slate-400">
            {dayjs.utc(msg?.dateCreated).tz("America/New_York").format("h:mm a")}
          </div>
          <div className="flex flex-col items-start justify-start">
            {msg?.mediaUrl !== undefined && msg?.mediaUrl?.length === 1 || msg.documentUrl !== undefined && msg.documentUrl.length === 1 ? <ChatCard msg={msg} /> : msg?.mediaUrl !== undefined && msg?.mediaUrl?.length > 1 || msg.documentUrl !== undefined && msg.documentUrl.length > 1 ? (<ChatCardGrid msg={msg} />) : (<div
              className={classNames(
                outboundMsg && (undeliveredMsg || failedMsg)
                  ? "bg-red-50 rounded-br-none"
                  : inboundMsg
                    ? "rounded-bl-none bg-slate-100"
                    : "rounded-br-none bg-blue-500 p-3",
                "mt-2 rounded-2xl p-3"
              )}
            >
              <p
                className={classNames(
                  outboundMsg && (undeliveredMsg || failedMsg)
                    ? "text-red-700"
                    : inboundMsg
                      ? "text-slate-900"
                      : "text-slate-50",
                  "whitespace-pre-wrap break-words"
                )}
              >
                {msg?.body?.trim()}

              </p>
            </div>)}
          </div>
          {outboundMsg && (
            <div className="mt-1 flex items-center justify-end">
              <p
                className={
                  undeliveredMsg || failedMsg
                    ? "animate-pulse text-xs font-medium text-red-600"
                    : "text-xs font-medium text-gray-400"
                }
              >
                {messageStatus(delivery?.info?.status || '').status}
              </p>
              {deliveredMsg && (
                <div className="flex">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <CheckIcon className="-ml-4 h-5 w-5 text-green-500" />
                </div>
              )}
              {undeliveredMsg && (
                <div className="flex">
                  <ExclamationTriangleIcon className="ml-2 h-5 w-5 animate-pulse text-red-500" />
                </div>
              )}
              {sentMsg && (
                <div className="flex">
                  <PaperAirplaneIcon className="ml-0.5 h-5 w-5 -rotate-12 text-slate-400" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
