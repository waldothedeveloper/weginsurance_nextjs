import { EditorContent, FloatingMenu } from "@tiptap/react";

import { FloatingMenuButtons } from "@/components/messaging/FloatingMenuButtons";
import { FloatingMenuTextButton } from "@/components/messaging/FloatingMenuTextButton";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEditorHook } from "@/hooks/messaging/useEditor";
import { useHandleOutboundSMS } from "@/hooks/messaging/useHandleOutboundSMS";

export const EditorWrapper = ({ updateLocalMessagesCache, data }) => {
  const editor = useEditorHook();
  const { handleSubmit } = useHandleOutboundSMS(
    editor,
    updateLocalMessagesCache,
    data
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-2 pt-6">
        <div className="flex justify-between">
          <div className="mr-2 w-full">
            {editor && (
              <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="relative isolate inline-flex rounded-md shadow-sm">
                  <FloatingMenuTextButton editor={editor} />
                  <FloatingMenuButtons editor={editor} />
                </div>
              </FloatingMenu>
            )}
            <EditorContent editor={editor} />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-500 px-5 py-1.5 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
          >
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
          </button>
        </div>
      </div>
    </form>
  );
};
