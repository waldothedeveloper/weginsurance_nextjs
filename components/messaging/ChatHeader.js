import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/classNames";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

export const ChatHeader = () => {
  const selectedUser = useAtomValue(selectedUserAtom);
  return (
    <div className="border-b-2 border-b-slate-200 px-4 py-5 sm:px-6">
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <UserIcon className="h-16 w-16 rounded-full bg-slate-50 p-2 font-light text-slate-400" />
          <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
            <ChatBubbleLeftEllipsisIcon
              className="h-6 w-6 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {selectedUser?.fullname || "No hay usuario seleccionado"}
          </p>
          <p className="text-xs text-slate-500">
            {formatPhoneNumberToNationalUSAformat(selectedUser?.phone) || ""}
          </p>
        </div>
        <div className="flex flex-shrink-0 self-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-slate-400 hover:text-slate-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex w-full px-4 py-2 text-sm"
                        )}
                      >
                        <StarIcon
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Add to favorites</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <CodeBracketIcon
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Embed</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <FlagIcon
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Report content</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
