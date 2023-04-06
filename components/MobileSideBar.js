import { Dialog, Transition } from "@headlessui/react";

import { Fragment } from "react";
import Link from "next/link";
import { LoggedInUserButton } from "@/components/auth/LoggedInUserButton";
import { NavigationLinks } from "@/components/navigation/links";
import { NovuNotificationsCenter } from "@/components/notifications/NovuConfig";
import { XMarkIcon } from "@heroicons/react/24/outline";

//
export const MobileSideBar = ({
  sidebarOpen,
  setSidebarOpen,
  handleCloseSideBar,
}) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-600/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-100 focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={handleCloseSideBar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link href="/admin/dashboard">
                    <span className="text-xl font-bold uppercase tracking-tight text-blue-600">
                      weg <br /> insurance
                    </span>
                    <span className="ml-2 self-end text-base font-extralight lowercase text-slate-500">
                      sms
                    </span>
                  </Link>
                </div>
                <NavigationLinks />
              </div>
              <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
                <div className="flex w-full items-center justify-between">
                  <LoggedInUserButton />
                  <NovuNotificationsCenter />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
