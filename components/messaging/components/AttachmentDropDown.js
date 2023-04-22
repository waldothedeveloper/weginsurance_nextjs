import {
  DocumentIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";

export const AttachmentDropDown = ({ imageDropZone, documentDropZone }) => {
  return (
    <Menu
      as="div"
      className="relative mt-1 inline-flex items-center justify-center px-4 py-1"
    >
      <div>
        <Menu.Button>
          <PaperClipIcon
            className="h-6 w-6 text-slate-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -top-32 left-0 z-10">
          <div className="space-y-3">
            <Menu.Item {...documentDropZone.getRootProps()}>
              <button
                type="button"
                className="rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 p-3 text-white duration-300 ease-in-out hover:scale-125"
              >
                <DocumentIcon className="h-6 w-6" />
                <input {...documentDropZone.getInputProps()} />
              </button>
            </Menu.Item>
            <Menu.Item {...imageDropZone.getRootProps()}>
              <button
                type="button"
                className="rounded-full bg-gradient-to-tr from-emerald-400 to-green-600 p-3 text-white duration-300 ease-in-out hover:scale-125"
              >
                <PhotoIcon className="h-6 w-6" />
                <input {...imageDropZone.getInputProps()} />
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
