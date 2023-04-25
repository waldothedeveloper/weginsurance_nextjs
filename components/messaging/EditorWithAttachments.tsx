import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { ReactNode } from "react";

//
export const EditorWithAttachments = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="mt-12 px-2">
      <div className="flex justify-between">
        <button
          className="mr-2 inline-flex items-center justify-center rounded-lg py-1 pl-3 text-slate-500 transition duration-500 ease-in-out"
          type="button"
        >
          <FaceSmileIcon className="h-6 w-6 text-slate-400" />
        </button>
        <div className="w-full">{children}</div>
        <div className="ml-2 flex">
          <button
            type="submit"
            className="inline-flex items-center justify-center self-end rounded-lg bg-blue-500 px-4 py-4 text-white transition duration-500 ease-in-out hover:bg-blue-300 focus:outline-none"
          >
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
};
