import { CarouselSlider } from "@/components/messaging/carousel/CarouselSlider";
import { EditorWithAttachments } from "@/components/messaging/EditorWithAttachments";
import Image from "next/image";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { calculateFileSize } from "@/utils/calculateFileSize";
import { currentSelectedFile } from "@/utils/currentSelectedFile";
import { getFileExtensionFromName } from "@/utils/getFileExtensionFromName";
import { getNameFromFile } from "@/utils/getNameFromFile";
import { isFileTypeAnImage } from "@/utils/isFileTypeAnImage";
//
export const CarouselWrapper = ({
  handleSetFiles,
  files,
  handleSelectedFile,
  selectedImgId,
  handleRemoveFile,
  additionalImageDropZone,
  additionalDocumentDropZone,
  children,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute inset-0 z-50 flex h-full flex-1 flex-col"
    >
      <div className="relative flex flex-1 flex-col bg-slate-50 p-16">
        <div className="absolute left-0 top-0 hidden pl-4 pt-4 sm:block">
          <button
            type="button"
            className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSetFiles}
          >
            <span className="sr-only">Close</span>

            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative h-[60vh] w-full">
          {isFileTypeAnImage(files) ? (
            <Image
              className="absolute top-0 h-full w-full rounded-sm object-contain drop-shadow-md"
              src={currentSelectedFile(files, selectedImgId)?.preview}
              alt="file preview"
              fill
            />
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <ShowFileTypeIcon
                fileType={getFileExtensionFromName(files, selectedImgId)}
                classString="mx-auto h-60 w-60 text-slate-300"
              />

              <h3 className="mt-12 text-xl font-semibold text-slate-700">
                {getNameFromFile(files, selectedImgId)}
              </h3>
              <p className="mt-2 text-base font-medium text-slate-500">
                {calculateFileSize(files, selectedImgId)} -{" "}
                {getFileExtensionFromName(files, selectedImgId)?.toUpperCase()}
              </p>
            </div>
          )}
        </div>
        {/* Editor when attachments or images are uploaded */}
        <EditorWithAttachments>{children}</EditorWithAttachments>

        <CarouselSlider
          files={files}
          handleSelectedFile={handleSelectedFile}
          selectedImgId={selectedImgId}
          handleRemoveFile={handleRemoveFile}
          additionalImageDropZone={additionalImageDropZone}
          additionalDocumentDropZone={additionalDocumentDropZone}
        />
      </div>
    </form>
  );
};
