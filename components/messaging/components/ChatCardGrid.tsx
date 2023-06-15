import Image from "next/image";
import { Message } from "@/interfaces/index";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";
import { decodeUrlName } from "@/utils/decodeUrlName";
import { hasImageExtension } from "@/utils/hasImageExtension";

export const ChatCardGrid = ({ msg }: { msg: Message }) => {

  const failedMsg = msg?.delivery?.info?.status === "failed" || msg?.delivery?.info?.status === "undelivered" || null;
  return (
    <div className={failedMsg ? "mt-0.5 grid grid-cols-2 gap-1 rounded-2xl bg-red-50 p-1" : "mt-0.5 grid grid-cols-2 gap-1 rounded-2xl bg-blue-500 p-1"}>
      {msg?.mediaUrl?.map((element) => {
        if (!hasImageExtension(element)) {
          return (
            <div key={element} className="flex w-full flex-col">
              <a
                href={element}
                target="_blank"
                rel="noopener noreferrer"
                className={failedMsg ? "flex justify-between rounded-xl bg-red-50 p-3" : "flex justify-between rounded-xl bg-slate-100 p-3"}
              >
                <ShowFileTypeIcon
                  fileType={element?.split(".")?.pop()?.split("?")?.shift()}
                  classString={failedMsg ? "text-red-500 h-20 w-20" : "text-slate-400 h-20 w-20"}
                />
                <p className={failedMsg ? "text-red-500 ml-2" : "text-slate-400 ml-2"}>{decodeUrlName(element)}</p>
              </a>
            </div>
          );
        } else {
          return (
            <div key={element}>
              <div className="group aspect-h-7 aspect-w-10 relative block w-full overflow-hidden rounded-lg bg-slate-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-100">
                <Image
                  className="object-cover group-hover:opacity-75"
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
        }
      })}
      <p className={failedMsg ? "row-start-4 my-2 block px-2 text-sm font-medium text-red-500" : "row-start-4 my-2 block px-2 text-sm font-medium text-slate-50"}>
        {msg.body}
      </p>
    </div>
  );
};
