import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronUpIcon, PaperClipIcon } from "@heroicons/react/20/solid";

import { Fragment } from "react";

const items = [
  { name: "Save and schedule", href: "#" },
  { name: "Save and publish", href: "#" },
  { name: "Export PDF", href: "#" },
];

export const FloatingMenuTextButton = ({ editor }) => {
  return (
    <div className="inline-flex rounded-md shadow-xs">
      <button
        type="button"
        className={
          editor.isActive("bold")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        <PaperClipIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
      </button>
      <Menu as="div" className="relative -ml-px block">
        <MenuButton className="relative inline-flex items-center bg-slate-100 px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-10">
          <span className="sr-only">Open options</span>
          <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
        </MenuButton>
        <Transition as={Fragment}>
          <MenuItems className="absolute -top-36 left-0 z-50 mt-5 -mr-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-black-5 focus:outline-none">
            <div className="flex flex-col items-center justify-start py-1">
              {items.map((item) => (
                <MenuItem key={item.name}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                      }
                      className={
                        editor.isActive("heading", { level: 1 }) && focus
                          ? "w-full bg-slate-100 px-4 py-2 text-sm text-slate-900"
                          : "w-full px-4 py-2 text-sm text-slate-700"
                      }
                    >
                      Heading 1
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
