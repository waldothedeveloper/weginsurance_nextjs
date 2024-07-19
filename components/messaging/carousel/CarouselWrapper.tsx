import { openResourceUploadModalAtom, uploadedFilesAtom } from "@/lib/state/atoms";

import { CarouselLoaderSkeleton } from "@/components/messaging/carousel/CarouselLoaderSkeleton";
import { CarouselSlider } from "@/components/messaging/carousel/CarouselSlider";
import { EditorWithAttachments } from "@/components/messaging/EditorWithAttachments";
import Image from "next/image";
import { ShowFileTypeIcon } from "@/components/messaging/carousel/ShowFileTypeIcon";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { areAllFilesTypeOfImage } from "@/utils/areAllFilesTypeOfImage";
import { calculateFileSize } from "@/utils/calculateFileSize";
import { currentSelectedFile } from "@/utils/currentSelectedFile";
import { getFileExtensionFromName } from "@/utils/getFileExtensionFromName";
import { getNameFromFile } from "@/utils/getNameFromFile";
import { useAtomValue } from "jotai";
import { useDeleteAllUploadedFiles } from "@/hooks/fileUploader/useDeleteAllUploadedFiles";
import { useEditorWithImages } from "@/hooks/messaging/useEditorWithImages";
import { useSelectedUploadedFile } from "@/hooks/fileUploader/useSelectedUploadedFile";
import { useSendOutboundMessage } from "@/hooks/messaging/useSendOutboundMessage";

export const CarouselWrapper = () => {
  const openCloseResourceUploadModal = useAtomValue(
    openResourceUploadModalAtom
  );
  const editorWithImages = useEditorWithImages();
  const uploadedResources = useAtomValue(uploadedFilesAtom);
  const handleDeleteAllFiles = useDeleteAllUploadedFiles();
  const { handleSelectedFile, selectedFile } = useSelectedUploadedFile();
  const { handleSubmitMessage } = useSendOutboundMessage();

  return (
    <Transition show={openCloseResourceUploadModal}>
      {uploadedResources.length > 0 ? (
        <form
          onSubmit={(e) => handleSubmitMessage(e, editorWithImages)}
          className="absolute inset-0 z-50 flex h-full flex-1 flex-col"
        >
          <div className="relative flex flex-1 flex-col bg-slate-50 p-16">
            <div className="absolute left-0 top-0 hidden pl-4 pt-4 sm:block">
              <button
                type="button"
                className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleDeleteAllFiles}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[60vh] w-full">
              {uploadedResources &&
                uploadedResources.length > 0 &&
                areAllFilesTypeOfImage(uploadedResources) && (
                  <Image
                    className="absolute top-0 h-full w-full rounded-sm object-contain drop-shadow-md"
                    src={currentSelectedFile(uploadedResources, selectedFile)}
                    alt="file preview"
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 800px"
                  />
                )}

              {uploadedResources &&
                uploadedResources.length > 0 &&
                !areAllFilesTypeOfImage(uploadedResources) && (
                  <div className="relative flex h-full w-full flex-col items-center justify-center">
                    <ShowFileTypeIcon
                      fileType={getFileExtensionFromName(
                        uploadedResources,
                        selectedFile
                      )}
                      classString="mx-auto h-60 w-60 text-slate-300"
                    />

                    <h3 className="mt-12 text-xl font-semibold text-slate-700">
                      {getNameFromFile(uploadedResources, selectedFile)}
                    </h3>
                    <p className="mt-2 text-base font-medium text-slate-500">
                      {calculateFileSize(uploadedResources, selectedFile)} -{" "}
                      {getFileExtensionFromName(
                        uploadedResources,
                        selectedFile
                      )?.toUpperCase()}
                    </p>
                  </div>
                )}
            </div>

            <EditorWithAttachments editor={editorWithImages} />

            <CarouselSlider
              handleSelectedFile={handleSelectedFile}
              selectedImage={selectedFile}
            />
          </div>
        </form>
      ) : (
        <CarouselLoaderSkeleton />
      )}
    </Transition>
  );
};
