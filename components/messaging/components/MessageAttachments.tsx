import Image from "next/image";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";

export const MessageAttachments = ({ attachments }: { attachments: string[] | undefined }) => {
  if (!attachments) return null;

  return (
    <div className="relative flex flex-col space-y-2 w-full">
      {attachments?.map((image: string) => {
        if (!image.includes(`jpeg` || `png` || `jpg` || `gif` || `svg`)) {
          return (
            <dd className="block relative" key={image}>
              <a href={image} target="_blank" rel="noopener noreferrer">
                <ShowFileTypeIcon
                  fileType={image?.split(".")?.pop()?.split("?")?.shift()}
                  classString="w-32 h-32 text-slate-400"
                />
              </a>
            </dd>
          )
        } else {
          return (
            <dd className="block relative w-64 h-72" key={image}>
              <Image
                className="h-full w-full rounded-md object-cover absolute inset-0 shadow-md"
                src={image}
                alt="message image"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </dd>
          )
        }
      })}
    </div>
  );
};


