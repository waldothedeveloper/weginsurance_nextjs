import { editorAtom, editorAtomwithImages } from "@/lib/state/atoms";

import Image from "@tiptap/extension-image";
import { ImagesArray } from "@/interfaces/index";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useAtom } from "jotai";
import { useEditor } from "@tiptap/react";
import { useEffect } from "react";

//
export const useEditorHook = (allValues: ImagesArray) => {
  const [editorAtomValue, setEditorAtomValue] = useAtom(editorAtom);
  const [editorAtomValueWithImages, setEditorAtomValueWithImages] =
    useAtom(editorAtomwithImages);

  const editor = useEditor({
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

  const editorWithImages = useEditor({
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
          "max-w-none px-6 py-3 max-h-[7.35rem] min-h-[1.47rem] overflow-y-auto rounded-md bg-white text-slate-800 w-full flex-1 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) setEditorAtomValue(editor);

    return () => setEditorAtomValue(null);
  }, [editor, setEditorAtomValue]);

  useEffect(() => {
    const json = editor?.getJSON() || null;
    if (allValues && allValues.length > 0 && editorWithImages && json) {
      setEditorAtomValueWithImages(editorWithImages);
      editorWithImages?.commands?.setContent(json);
    } else {
      setEditorAtomValueWithImages(null);
    }

    return () => setEditorAtomValueWithImages(null);
  }, [allValues, setEditorAtomValueWithImages, editorWithImages, editor]);

  return [editorAtomValue, editorAtomValueWithImages];
};
