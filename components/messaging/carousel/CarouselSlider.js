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
    <div className="mt-6">
      <div className="mx-auto flex max-w-xs space-x-2">
        {files.map((file, index) => (
          <div
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={() => handleMouseLeave()}
            key={file?.id}
            className="relative"
          >
            <button
              type="button"
              onClick={() => handleSelectedFile(file)}
              className={classNames(
                file?.id === selectedImgId
                  ? "ring ring-blue-500 ring-offset-0 hover:shadow-lg hover:shadow-blue-500/30"
                  : "ring ring-slate-300 ring-offset-0 hover:shadow-lg",
                "block h-14 w-14 overflow-hidden rounded-sm duration-300 ease-in-out"
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
                <div class="absolute inset-0 h-5 bg-slate-500/50 backdrop-blur-sm backdrop-opacity-75" />

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
          </div>
        ))}
        {files[0]?.type.startsWith("image/") ? (
          <button
            {...additionalImageDropZone.getRootProps()}
            type="button"
            className="rounded-sm border border-slate-300 bg-slate-50 p-2 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <PlusIcon className="h-6 w-7 text-slate-900" aria-hidden="true" />
            <input {...additionalImageDropZone.getInputProps()} />
          </button>
        ) : (
          <button
            {...additionalDocumentDropZone.getRootProps()}
            type="button"
            className="rounded-sm border border-slate-300 bg-slate-50 p-2 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <PlusIcon className="h-6 w-7 text-slate-900" aria-hidden="true" />
            <input {...additionalDocumentDropZone.getInputProps()} />
          </button>
        )}
      </div>
    </div>
  );
};
