import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { AttachmentDropDown } from "@/components/messaging/components/AttachmentDropDown";
import { MyCustomEditor } from "@/components/messaging/MyCustomEditor";
import { useEditorHook } from "@/hooks/messaging/useEditorHook";
// import { useHandleOutboundSMS } from "@/hooks/messaging/useHandleOutboundSMS";
import { useWriteMessageToDB } from "@/hooks/messaging/useWriteMessageToDB"

export const EditorWrapper = () => {
  const editor = useEditorHook()
  // const { handleSubmit } = useHandleOutboundSMS();
  const { handleSubmitMessage } = useWriteMessageToDB()

  return (
    <form onSubmit={(e) => handleSubmitMessage(e, editor)}>
      <div className="px-2 pt-2">
        <div className="flex justify-between">
          <button
            className="inline-flex items-center justify-center rounded-lg py-1 pl-3 text-slate-500 transition duration-500 ease-in-out"
            type="button"
          >
            <FaceSmileIcon className="h-6 w-6 text-slate-400" />
          </button>
          <AttachmentDropDown
          />

          <div className="mr-2 w-full max-h-[50vh]">
            <MyCustomEditor editor={editor} />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-1 text-white transition duration-500 ease-in-out hover:bg-blue-300 focus:outline-none"
            >
              <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
