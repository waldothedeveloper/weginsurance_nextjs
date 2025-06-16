import { FaceSmileIcon, PaperClipIcon } from "@heroicons/react/24/outline";

export const ChatInput = () => {
  return (
    <div className="bg-white border-t border-slate-200 px-3 pb-12 pt-3">
      <form
        // onSubmit={handleSendMessage}
        className="flex items-center space-x-2"
      >
        <button
          type="button"
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Add emoji"
        >
          <FaceSmileIcon className="size-6" />
        </button>
        <button
          type="button"
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Attach file"
        >
          <PaperClipIcon className="size-6" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full border border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled
          className="rounded-full bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
