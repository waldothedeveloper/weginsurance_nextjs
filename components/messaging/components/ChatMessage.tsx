import {
  CheckIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { Message } from "@/interfaces/index";
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
  const { direction, status } = msg;

  const inboundMsg = direction === "inbound";
  const outboundMsg = direction === "outbound-api";
  const deliveredMsg = status === "delivered";
  const undeliveredMsg = status === "undelivered";
  const failedMsg = status === "failed";
  const sentMsg = status === "sent";

  return (
    <div className="grid grid-cols-1 space-y-2 px-5">
      <div
        key={msg.sid}
        className={
          outboundMsg ? "max-w-lg place-self-end" : "max-w-lg place-self-start"
        }
      >
        <div>
          <div className="ml-2 text-xs font-medium text-slate-400">
            {dayjs.utc(msg.dateCreated).tz("America/New_York").format("h:mm a")}
          </div>
          <div
            key={msg.dateCreated}
            className={classNames(
              outboundMsg && (undeliveredMsg || failedMsg)
                ? "bg-red-50"
                : inboundMsg
                  ? "rounded-bl-none bg-slate-100"
                  : "rounded-br-none bg-green-500 p-3",
              "mt-1 rounded-2xl p-3"
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
              {msg.body}

            </p>
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
                {messageStatus(status).status}
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
