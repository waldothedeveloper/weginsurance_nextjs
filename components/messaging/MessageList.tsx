import {
  CheckIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { ConversationProps, Messages, RealUser } from "@/interfaces/index";

import { TimeDivider } from "@/components/messaging/TimeDivider";
import { messageStatus } from "@/utils/messageStatus";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { userPhoneAtom } from "@/lib/state/atoms";

//
export const MessageList = ({ data }: { data: ConversationProps }) => {
  const userPhoneNumber: string = useAtomValue(userPhoneAtom);
  const selectedUser: RealUser | any = useAtomValue(selectedUserAtom);

  return (
    <ul className="grid h-full grid-cols-1 space-y-4 overflow-y-auto bg-white py-6 px-1">
      {Object.keys(data.messages).map((value: string) => {
        return (
          <li className="block h-full w-full" key={value}>
            <TimeDivider time={value} />

            {data.messages[value].map((message: Messages) => {
              return message.from === userPhoneNumber ? (
                <div
                  key={message.dateCreated}
                  className="flex flex-row py-2 px-3 hover:bg-gray-100"
                >
                  <h3 className="mr-1 flex flex-col text-sm">
                    <div>
                      <span className="whitespace-nowrap text-[10px] font-medium text-gray-600">
                        <time
                          dateTime={new Date(message.dateCreated).toString()}
                        >
                          {new Date(message.dateCreated).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </time>
                      </span>
                      <span className="ml-1 whitespace-nowrap font-medium text-blue-500">
                        {selectedUser
                          ? selectedUser?.fullname
                          : "Usuario desconocido"}
                      </span>
                    </div>
                  </h3>
                  <p className="whitespace-pre-wrap px-2 py-0.5 text-sm font-medium text-gray-800">
                    {message.body}
                  </p>
                </div>
              ) : (
                <div
                  key={message.dateCreated}
                  className={
                    message.status === "undelivered" ||
                    message.status === "failed"
                      ? "flex flex-row bg-red-50 py-2 px-3 hover:bg-red-100"
                      : "flex flex-row py-2 px-3 hover:bg-gray-50"
                  }
                >
                  <h3 className="mr-1 flex flex-col text-sm">
                    <div>
                      <span className="whitespace-nowrap text-[10px] font-medium text-gray-600">
                        <time
                          dateTime={new Date(message.dateCreated).toString()}
                        >
                          {new Date(message.dateCreated).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </time>
                      </span>
                      <span className="ml-1 whitespace-nowrap font-medium text-orange-600">
                        Weg Insurance
                      </span>
                    </div>
                    <span className="self-end text-xs">
                      {message.status === "delivered" && (
                        <span className="flex">
                          <span className="text-green-600">
                            {messageStatus(message.status)?.status}
                          </span>
                          <CheckIcon className="h-4 w-4 font-semibold text-green-600" />
                          <CheckIcon className="-ml-3 h-4 w-4 font-semibold text-green-600" />
                        </span>
                      )}
                      {(message.status === "queued" ||
                        message.status === "sent") && (
                        <span className="flex">
                          <span>{messageStatus(message.status)?.status}</span>
                          <PaperAirplaneIcon className="ml-2 h-4 w-4 font-semibold text-blue-600" />
                        </span>
                      )}
                      {(message.status === "undelivered" ||
                        message.status === "failed") && (
                        <span className="flex">
                          <span className="animate-pulse text-red-600">
                            {messageStatus(message.status)?.status}
                          </span>
                          <ExclamationTriangleIcon className="ml-2 h-4 w-4 animate-pulse font-semibold text-red-600" />
                        </span>
                      )}
                    </span>
                  </h3>
                  <p
                    className={
                      message.status === "undelivered" ||
                      message.status === "failed"
                        ? "whitespace-pre-wrap px-2 py-0.5 text-sm font-medium text-red-800"
                        : "whitespace-pre-wrap px-2 py-0.5 text-sm font-medium text-gray-800"
                    }
                  >
                    {message.body}
                  </p>
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};
