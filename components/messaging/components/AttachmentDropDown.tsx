import {
  DocumentIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

import { useDropAndUploadFiles } from "@/hooks/fileUploader/useDropAndUploadFiles";
import { Transition } from "@headlessui/react";
import { useClickAway } from "@uidotdev/usehooks";
import React, { useState } from "react";

export const AttachmentDropDown = () => {
  const [showAttachments, setShowAttachments] = useState(false);
  const { imageDropZone, documentDropZone } = useDropAndUploadFiles();
  const [showDocsToolTip, setShowDocsToolTip] = useState(false);
  const [showImagesToolTip, setShowImagesToolTip] = useState(false);
  const toolTipStyles =
    "absolute left-8 top-8 px-3 py-2 w-max text-xs font-medium text-white bg-slate-800 rounded-full shadow-sm";

  const ref = useClickAway(() => {
    setShowAttachments(false);
  }) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="relative mt-1 inline-flex items-center justify-center px-4 py-1">
      <button onClick={() => setShowAttachments(true)}>
        <PaperClipIcon className="size-6 text-slate-400" aria-hidden="true" />
      </button>
      <Transition
        show={showAttachments}
        as="div"
        className="absolute -top-32 left-0 z-10"
      >
        <div ref={ref} className="space-y-3">
          <button
            onClick={() => setShowDocsToolTip(false)}
            onMouseEnter={() => setShowDocsToolTip(true)}
            onMouseLeave={() => setShowDocsToolTip(false)}
          >
            <span
              {...documentDropZone.getRootProps()}
              className="relative flex"
            >
              <div className="rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 p-3 text-white duration-300 ease-in-out hover:scale-105">
                <DocumentIcon className="size-5" />
                <input {...documentDropZone.getInputProps()} />
              </div>
              <Transition show={showDocsToolTip}>
                <div className={toolTipStyles}>Documentos</div>
              </Transition>
            </span>
          </button>

          <button
            onMouseEnter={() => setShowImagesToolTip(true)}
            onMouseLeave={() => setShowImagesToolTip(false)}
            onClick={() => setShowImagesToolTip(false)}
          >
            <span {...imageDropZone.getRootProps()} className="relative flex">
              <div className="rounded-full bg-gradient-to-tr from-emerald-400 to-green-600 p-3 text-white duration-300 ease-in-out hover:scale-105">
                <PhotoIcon className="size-5" />
                <input {...imageDropZone.getInputProps()} />
              </div>
              <Transition show={showImagesToolTip}>
                <div className={toolTipStyles}>Imagenes</div>
              </Transition>
            </span>
          </button>
        </div>
      </Transition>
    </div>
  );
};
