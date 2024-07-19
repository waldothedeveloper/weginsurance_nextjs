import {
  DocumentIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import { useDropAndUploadFiles } from "@/hooks/fileUploader/useDropAndUploadFiles";

export const AttachmentDropDown = () => {
  const { imageDropZone, documentDropZone } = useDropAndUploadFiles();
  const [showDocsToolTip, setShowDocsToolTip] = useState(false);
  const [showImagesToolTip, setShowImagesToolTip] = useState(false);
  const toolTipStyles =
    "absolute left-8 top-8 px-3 py-2 w-max text-xs font-medium text-white bg-slate-800 rounded-full shadow-sm";

  return (
    <Menu
      as="div"
      className="relative mt-1 inline-flex items-center justify-center px-4 py-1"
    >
      <div>
        <MenuButton>
          <PaperClipIcon
            className="h-6 w-6 text-slate-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition as={Fragment}>
        <MenuItems className="absolute -top-32 left-0 z-10">
          <div className="space-y-3">
            <MenuItem
              onClick={() => setShowDocsToolTip(false)}
              onMouseEnter={() => setShowDocsToolTip(true)}
              onMouseLeave={() => setShowDocsToolTip(false)}
              as="button"
              {...documentDropZone.getRootProps()}
            >
              <span className="relative flex">
                <div className="rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 p-3 text-white duration-300 ease-in-out hover:scale-125">
                  <DocumentIcon className="h-6 w-6" />
                  <input {...documentDropZone.getInputProps()} />
                </div>
                <Transition show={showDocsToolTip}>
                  <div className={toolTipStyles}>Documentos</div>
                </Transition>
              </span>
            </MenuItem>

            <MenuItem
              as="button"
              onMouseEnter={() => setShowImagesToolTip(true)}
              onMouseLeave={() => setShowImagesToolTip(false)}
              onClick={() => setShowImagesToolTip(false)}
              {...imageDropZone.getRootProps()}
            >
              <span className="relative flex">
                <div className="rounded-full bg-gradient-to-tr from-emerald-400 to-green-600 p-3 text-white duration-300 ease-in-out hover:scale-125">
                  <PhotoIcon className="h-6 w-6" />
                  <input {...imageDropZone.getInputProps()} />
                </div>
                <Transition show={showImagesToolTip}>
                  <div className={toolTipStyles}>Imagenes</div>
                </Transition>
              </span>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
