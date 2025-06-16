import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default async function Messages() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <ChatBubbleOvalLeftEllipsisIcon className="mx-auto size-16 text-gray-300" />
          </div>
          <h3 className="text-2xl font-medium text-gray-700 mb-2">
            Comienza una conversación
          </h3>
          <p className="text-gray-500 text-base leading-relaxed">
            Para ver un chat, selecciona un usuario de la lista a la izquierda y
            comienza a intercambiar mensajes.
          </p>
        </div>
      </div>
    </div>
  );
}
