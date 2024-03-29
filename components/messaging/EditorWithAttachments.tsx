import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { Editor } from "@tiptap/react";
import { MyCustomEditor } from "@/components/messaging/MyCustomEditor";

export const EditorWithAttachments = ({ editor }: { editor: Editor | null }) => {

  return (
    <div className="mt-12 px-2">
      <div className="flex justify-between">
        <button
          className="mr-2 inline-flex items-center justify-center rounded-lg py-1 pl-3 text-slate-500 transition duration-500 ease-in-out"
          type="button"
        >
          <FaceSmileIcon className="h-6 w-6 text-slate-400" />
        </button>
        <div className="w-full max-h-[7.35rem]">
          <MyCustomEditor editor={editor} />
        </div>
        <div className="ml-2 flex">
          <button
            // disabled={editor?.isEmpty}
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-1 text-white transition duration-500 ease-in-out hover:bg-blue-300 focus:outline-none"
          >
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
};
