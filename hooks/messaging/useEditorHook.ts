import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";

export const useEditorHook = () => {
  const editor = useEditor({
    immediatelyRender: false,
    content: "",
    extensions: [
      Underline.configure({
        HTMLAttributes: {
          class: "underline underline-offset-1 text-slate-400 font-medium",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class:
            "text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer",
        },
      }),
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Escriba el mensaje de texto aqui...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "max-w-none px-6 py-3 max-h-[50vh] min-h-[1.47rem] overflow-y-auto rounded-md bg-slate-100 text-slate-800 w-full flex-1 focus:outline-none",
      },
    },
  });

  return editor;
};
