export const FloatingMenuButtons = ({ editor }) => {
  // bold, italic, underline, strike,
  return (
    <>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative inline-flex items-center rounded-l-md bg-slate-100 px-3 py-2 text-xs text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        h2
      </button> */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        <span className="italic">i</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        <span className="underline underline-offset-1">U</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        <span className="line-through">S</span>
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
            : "relative -ml-px inline-flex items-center bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        bullet list
      </button> */}
      {/* this last element has a rounded-sm right corner */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-10"
            : "relative -ml-px inline-flex items-center rounded-r-md bg-slate-100 px-3 py-2 text-xs text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus:z-10"
        }
      >
        ordered list
      </button> */}
    </>
  );
};
