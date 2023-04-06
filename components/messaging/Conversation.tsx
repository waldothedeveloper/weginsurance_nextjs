import { messagesListAtom, sendingSMSAtom } from "@/lib/state/atoms";

import { ChatHeader } from "@/components/messaging/ChatHeader";
import { EditorWrapper } from "@/components/messaging/EditorWrapper";
import { ErrorComponent } from "@/components/Error";
import { MessageList } from "@/components/messaging/MessageList";
import { Spinning } from "@/components/Spinning";
import { useAtomValue } from "jotai";
import { useRetrieveMessages } from "@/hooks/messaging/useRetrieveMessages";

//
export const Conversation = () => {
  const messagesList = useAtomValue(messagesListAtom);
  const isNotSendingSMS = useAtomValue<boolean>(sendingSMSAtom);
  const { error, isMutating, trigger } = useRetrieveMessages();

  if (isMutating && isNotSendingSMS) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <Spinning message="Un momento por favor. Estamos cargando la conversacion..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <ErrorComponent error_message={error} />
      </div>
    );
  }

  if (!messagesList) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Bandeja de Mensajes
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Seleccione un usuario de la lista para ver las conversaciones SMS
              y abrir el chat.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (messagesList && Object.keys(messagesList).length === 0) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold text-red-500">500</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Bandeja de Mensajes
            </h2>
            <p className="mt-6 text-xl font-medium leading-8 text-red-500">
              Lo sentimos. No hay mensajes para mostrar
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-1 flex-col pb-6">
      <ChatHeader />
      {/* TODO: These two below need to receive the ATOM instead of the full data object */}
      <MessageList />
      <EditorWrapper updateLocalMessagesCache={trigger} />
    </div>
  );
};
