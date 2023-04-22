import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { AttachmentDropDown } from "@/components/messaging/components/AttachmentDropDown";
import { EditorContent } from "@tiptap/react";
import React from "react";
import { useEditorHook } from "@/hooks/messaging/useEditor";
import { useHandleOutboundSMS } from "@/hooks/messaging/useHandleOutboundSMS";

type DropZoneType = {
  isFocused: boolean;
  isFileDialogActive: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  acceptedFiles: any[];
  fileRejections: any[];
  rootRef: {
    current: any;
  };
  inputRef: {
    current: any;
  };
};
type EditorWrapperProps = {
  updateLocalMessagesCache: any;
  documentDropZone: DropZoneType;
  imageDropZone: DropZoneType;
};

export const EditorWrapper = ({
  updateLocalMessagesCache,
  documentDropZone,
  imageDropZone,
}: EditorWrapperProps) => {
  const editor = useEditorHook();

  const { handleSubmit } = useHandleOutboundSMS(
    editor,
    updateLocalMessagesCache
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-2 pt-2">
        <div className="flex justify-between">
          <button
            className="inline-flex items-center justify-center rounded-lg py-1 pl-3 text-slate-500 transition duration-500 ease-in-out"
            type="button"
          >
            <FaceSmileIcon className="h-6 w-6 text-slate-400" />
          </button>
          <AttachmentDropDown
            documentDropZone={documentDropZone}
            imageDropZone={imageDropZone}
          />

          <div className="mr-2 w-full">
            <EditorContent editor={editor} />
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
