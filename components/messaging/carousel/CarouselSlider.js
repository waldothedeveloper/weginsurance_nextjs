import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAtomValue, useSetAtom } from "jotai";

import Image from "next/image";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";
import { classNames } from "@/utils/classNames";
import { deleteStorageFile } from "@/utils/deleteStorageFile";
import { splitFileName } from "@/utils/splitFileName";
import { uploadedFilesAtom } from "@/lib/state/atoms";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { useDropAndUploadFiles } from "@/hooks/fileUploader/useDropAndUploadFiles";
import { useHoverFile } from "@/hooks/fileUploader/useHoverFile";

//
export const CarouselSlider = ({ handleSelectedFile, selectedImage }) => {
  const uploadedImages = useAtomValue(uploadedFilesAtom);
  const setUploadedImages = useSetAtom(uploadedFilesAtom);
  const { isCurrentHoveredFile, handleMouseOver, handleMouseLeave } =
    useHoverFile();
  const { imageDropZone, documentDropZone } = useDropAndUploadFiles();

  const handleRemoveFile = useAtomCallback(
    useCallback(
      (get, set, arg) => {
        const remainingImages = get(uploadedFilesAtom).filter(
          (file) => file.id !== arg.id
        );

        if (remainingImages) {
          // async function to delete the recently uploaded file...
          !arg.type.startsWith("image/")
            ? deleteStorageFile(arg?.name, "documents")
            : deleteStorageFile(arg?.name, "images");
          setUploadedImages(remainingImages);
        }
      },
      [setUploadedImages]
    )
  );

  //
  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <ul className="scrollbar flex max-w-[72rem] space-x-2 overflow-x-scroll scroll-smooth px-2">
        {uploadedImages.map((file, index) => (
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
                file?.id === selectedImage
                  ? "ring ring-blue-500 ring-offset-0"
                  : "ring ring-slate-300 ring-offset-0",
                "relative block h-14 w-14 overflow-hidden rounded-sm duration-300 ease-in-out"
              )}
            >
              {file?.type.startsWith("image/") ? (
                <Image
                  className="rounded-sm object-cover"
                  src={file?.url}
                  alt={file?.name}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 800px"
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
      {uploadedImages[0]?.type.startsWith("image/") ? (
        <div className="h-14 self-start">
          <button
            {...imageDropZone.getRootProps()}
            type="button"
            className="mt-1.5 rounded-sm border border-slate-300 bg-slate-50 p-0 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <span className="flex h-14 w-14 items-center justify-center">
              <PlusIcon className="h-6 w-6 text-slate-900" aria-hidden="true" />
              <input {...imageDropZone.getInputProps()} />
            </span>
          </button>
        </div>
      ) : (
        <div className="h-14 self-start">
          <button
            {...documentDropZone.getRootProps()}
            type="button"
            className="mt-1.5 rounded-sm border border-slate-300 bg-slate-50 p-0 text-white shadow-sm duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            <span className="flex h-14 w-14 items-center justify-center">
              <PlusIcon className="h-6 w-6 text-slate-900" aria-hidden="true" />
              <input {...documentDropZone.getInputProps()} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
