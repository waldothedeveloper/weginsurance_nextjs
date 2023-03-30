import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";

export const useEditorHook = () => {
  const editor = useEditor({
    content: "",
    extensions: [
      Underline.configure({
        HTMLAttributes: {
          class: "underline underline-offset-1",
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
          "prose prose-sm max-w-none rounded-xl px-6 py-3 max-h-[50vh] overflow-y-auto ring-2 ring-inset ring-gray-300 border-0 bg-gray-50 text-gray-800 w-full flex-1 focus:outline-none",
      },
    },
  });

  return editor;
};
