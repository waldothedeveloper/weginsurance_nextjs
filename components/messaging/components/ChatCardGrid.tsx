import Image from "next/image";
import { Message } from "@/interfaces/index";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";

export const ChatCardGrid = ({ msg }: { msg: Message }) => {

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
      return "mt-0.5 grid grid-cols-2 gap-1 rounded-2xl bg-red-50 px-1 py-1";
    } else if (inboundMsg) {
      return "mt-0.5 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 px-1 py-1";
    } else {
      return "mt-0.5 grid grid-cols-2 gap-1 rounded-2xl bg-blue-500 px-1 py-1";
    }
  }

  if (!msg?.documentUrl?.length) {
    return (
      <div
        className={applyStyle()}
      >
        {msg?.mediaUrl?.map((element) => {
          return (
            <div key={element}>
              <div className="group w-60 h-48 relative block overflow-hidden rounded-lg bg-slate-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-100">
                <Image
                  className="object-cover group-hover:opacity-75 duration-300 ease-in-out"
                  src={element}
                  alt="photos sent by weginsurance"
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                />
              </div>
            </div>
          );
        })}
        {msg?.body?.length > 1 && (<p
          className={
            failedMsg && inboundMsg
              ? "row-start-4 my-2 block px-2 text-sm font-medium text-red-500"
              : "row-start-4 my-2 block px-2 text-sm font-medium text-slate-900"
          }
        >
          {msg.body.trim()}
        </p>)}
      </div>
    );
  }

  if (msg?.documentUrl?.length && msg.documentUrl.length > 1) {
    return (
      <div
        className={applyStyle()}
      >
        {msg?.documentUrl?.map((element) => {
          return (
            <div key={element?.url} className="flex w-full flex-col">
              <a
                href={element?.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  failedMsg
                    ? "flex justify-between rounded-xl bg-red-100 p-3 hover:bg-red-200 transition-all duration-300 ease-in-out"
                    : "flex justify-between rounded-xl bg-slate-100 p-3 hover:bg-slate-200 transition-all duration-300 ease-in-out"
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
            </div>
          );
        })}
        {msg?.body?.length > 1 && (
          <p
            className={
              failedMsg
                ? "row-start-4 my-2 block px-2 text-sm font-medium text-red-500"
                : "row-start-4 my-2 block px-2 text-sm font-medium text-slate-50"
            }
          >
            {msg.body}
          </p>
        )}
      </div>
    );
  }
  return null;
};

