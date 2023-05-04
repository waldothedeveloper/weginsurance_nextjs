import Image from "next/image";

export const MessageAttachments = ({ attachments }: { attachments: string[] | undefined }) => {
  return (
    <div className="relative flex flex-col space-y-2 w-full">
      <dt className="sr-only">Commenters</dt>
      {attachments?.map((image: string) => (
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
      ))}
    </div>
  );
};
