import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import Image from "next/image";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";
import { classNames } from "@/utils/classNames";
import { splitFileName } from "@/utils/splitFileName";

export const CarouselSlider = ({
  files,
  handleSelectedFile,
  selectedImgId,
  handleRemoveFile,
  additionalImageDropZone,
  additionalDocumentDropZone,
}) => {
  const [isCurrentHoveredFile, setIsCurrentHoveredFile] = useState(-1);

  const handleMouseOver = useCallback((index) => {
    setIsCurrentHoveredFile(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsCurrentHoveredFile(-1);
  }, []);
  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <ul className="scrollbar flex max-w-[72rem] space-x-2 overflow-x-scroll scroll-smooth px-2">
        {files.map((file, index) => (
          <li
            role="button"
            key={file?.id}
            className="relative my-2"
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <button
              type="button"
              onClick={() => handleSelectedFile(file)}
              className={classNames(
                file?.id === selectedImgId
                  ? "ring ring-blue-500 ring-offset-0 hover:shadow-lg hover:shadow-blue-500/30"
                  : "ring ring-slate-300 ring-offset-0 hover:shadow-lg",
                "relative block h-14 w-14 overflow-hidden rounded-sm duration-300 ease-in-out"
              )}
            >
              {file?.type.startsWith("image/") ? (
                <Image
                  className="rounded-sm object-cover"
                  src={file?.preview}
                  alt={file?.name}
                  fill
                />
              ) : (
                <div className="flex items-center justify-center bg-white/70">
                  <ShowFileTypeIcon
                    fileType={splitFileName(file.name).toLowerCase()}
                    classString="h-10 w-10 text-slate-400"
                  />
                </div>
              )}
            </button>
            {isCurrentHoveredFile === index && (
              <div>
                <div className="absolute inset-0 h-5 bg-slate-500/50 backdrop-blur-sm backdrop-opacity-75" />

                <div className="absolute right-0 top-0">
                  <button type="button" onClick={() => handleRemoveFile(file)}>
                    <span className="sr-only">Close</span>

                    <XMarkIcon
                      className="h-4 w-4 font-extrabold text-slate-50"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {files[0]?.type.startsWith("image/") ? (
        <div className="h-14 self-start">
          <button
            {...additionalImageDropZone.getRootProps()}
            type="button"
            className="mt-1.5 rounded-sm border border-slate-300 bg-slate-50 p-0 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <span className="flex h-14 w-14 items-center justify-center">
              <PlusIcon className="h-6 w-6 text-slate-900" aria-hidden="true" />
              <input {...additionalImageDropZone.getInputProps()} />
            </span>
          </button>
        </div>
      ) : (
        <div className="h-14 self-start">
          <button
            {...additionalDocumentDropZone.getRootProps()}
            type="button"
            className="mt-1.5 rounded-sm border border-slate-300 bg-slate-50 p-0 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <span className="flex h-14 w-14 items-center justify-center">
              <PlusIcon className="h-6 w-6 text-slate-900" aria-hidden="true" />
              <input {...additionalDocumentDropZone.getInputProps()} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
