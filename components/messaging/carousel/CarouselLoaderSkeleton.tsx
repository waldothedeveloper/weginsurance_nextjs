import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { numberOfFilesUploadedAtom, progressPercentageAtom } from "@/lib/state/atoms";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAtomValue } from "jotai";

export const CarouselLoaderSkeleton = () => {
  const numberOfFilesUploaded = useAtomValue(numberOfFilesUploadedAtom);
  const progress = useAtomValue(progressPercentageAtom);

  return (
    <div className="absolute inset-0 z-50 flex h-full flex-1 flex-col">
      <div className="relative flex flex-1 flex-col bg-slate-50 p-16">
        <div className="absolute left-0 top-0 hidden pl-4 pt-4 sm:block">
          <button
            type="button"
            className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative h-[60vh] w-full animate-pulse rounded-md text-slate-30 flex items-center justify-evenly">
          {progress > 0 && <p className="text-slate-300 font-semibold text-8xl">{progress}%</p>}
          <PhotoIcon className="relative h-64 w-64 animate-pulse rounded-md text-slate-300" />
        </div>
        {/* false Text Editor */}
        <div className="mt-12 animate-pulse px-2">
          <div className="flex justify-between">
            <button
              disabled
              className="mr-2 inline-flex items-center justify-center rounded-lg py-1 pl-3 text-slate-500 transition duration-500 ease-in-out"
              type="button"
            >
              <FaceSmileIcon className="h-6 w-6 text-slate-300" />
            </button>
            <div className="max-h-[7.35rem] w-full">
              <input
                disabled
                type="text"
                name="text"
                className="block w-full rounded-md border-0 px-6 py-3 text-slate-900 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:ring-slate-200 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="ml-2 flex">
              <div className="inline-flex items-center justify-center self-end rounded-lg bg-slate-200 px-4 py-4 text-white transition duration-500 ease-in-out hover:bg-blue-300 focus:outline-none">
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                <span className="sr-only">Send message</span>
              </div>
            </div>
          </div>
        </div>
        {/* False image carousel */}
        <div className="mt-6 flex animate-pulse items-center justify-center space-x-2">
          <ul className="scrollbar flex max-w-[72rem] space-x-2 overflow-x-scroll scroll-smooth px-2">
            {numberOfFilesUploaded > 0 &&
              Array.from({ length: numberOfFilesUploaded }).map(
                (_, index) => (
                  <li key={index} role="button" className="relative my-2">
                    <PhotoIcon className="relative block h-14 w-14 overflow-hidden rounded-sm text-slate-300 ring ring-slate-300 ring-offset-0 duration-300 ease-in-out" />
                  </li>
                )
              )}
          </ul>
          <div className="h-14 animate-pulse self-start">
            <div className="mt-1.5 rounded-sm border border-slate-300 bg-slate-50 p-0 text-white shadow-sm ring ring-slate-300 ring-offset-0 duration-300 ease-in-out hover:bg-slate-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300">
              <span className="flex h-14 w-14 items-center justify-center">
                <PlusIcon
                  className="h-6 w-6 text-slate-400"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
