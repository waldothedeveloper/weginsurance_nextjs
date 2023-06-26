import Image from "next/image";
import { Message } from "@/interfaces/index";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";

export const ChatCard = ({ msg }: { msg: Message }) => {
  const { direction } = msg;
  const inboundMsg = direction === "inbound";
  // const outboundMsg = direction === "outbound-api";

  const failedMsg =
    msg?.delivery?.info?.status === "failed" ||
    msg?.delivery?.info?.status === "undelivered" ||
    null;


  if (!msg?.mediaUrl?.length && !msg?.documentUrl?.length) {
    return null;
  }

  const applyStyle = () => {
    if (failedMsg) {
      return "mt-0.5 rounded-2xl bg-red-50 p-1 w-80";
    } else if (inboundMsg) {
      return "mt-0.5 rounded-2xl bg-slate-200 p-1 w-80";
    } else {
      return "mt-0.5 rounded-2xl bg-blue-500 p-1 w-80";
    }
  }
  // return images
  if (!msg?.documentUrl?.length) {
    return (
      <div
        className={applyStyle()}
      >
        {msg?.mediaUrl?.map((element) => {
          return (
            <div key={element}>
              <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden bg-slate-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-100 w">
                <Image
                  className="object-cover group-hover:opacity-50 duration-300 ease-in-out"
                  src={element}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                />
              </div>
              {msg.body.length > 0 && (
                <p
                  className={
                    failedMsg && inboundMsg
                      ? "my-2 block px-2 text-sm font-medium text-red-500"
                      : inboundMsg ? "my-2 block px-2 text-sm font-medium text-slate-900" : "my-2 block px-2 text-sm font-medium text-slate-50"
                  }
                >
                  {msg.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // return documents
  if (msg?.documentUrl?.length && msg.documentUrl.length === 1) {
    return (
      <div
        className={applyStyle()}
      >
        {msg?.documentUrl?.map((element) => {
          return (
            <div
              key={element?.url}
              className={
                failedMsg
                  ? "mt-0.5 rounded-2xl bg-red-50 p-1"
                  : "mt-0.5 rounded-2xl bg-blue-500 p-1"
              }
            >
              <div className="flex w-full flex-col">
                <a
                  href={element?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    failedMsg
                      ? "flex rounded-xl bg-red-50 hover:bg-red-100 p-3 duration-300 ease-in-out"
                      : "flex rounded-xl bg-slate-100 hover:bg-slate-200 duration-300 ease-in-out p-3"
                  }
                >
                  <ShowFileTypeIcon
                    fileType={element?.type}
                    classString={
                      failedMsg
                        ? "text-red-500 h-28 w-28"
                        : "text-slate-400 h-28 w-28"
                    }
                  />

                  <p className={failedMsg ? "text-red-500" : "text-slate-400"}>
                    {element?.name || `Documento con nombre desconocido`}
                  </p>
                </a>

                <p
                  className={
                    failedMsg
                      ? "my-2 block px-2 text-sm font-medium text-red-500"
                      : "my-2 block px-2 text-sm font-medium text-slate-50"
                  }
                >
                  {msg.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

