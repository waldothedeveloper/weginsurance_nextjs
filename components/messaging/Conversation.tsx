import { CarouselWrapper } from "@/components/messaging/carousel/CarouselWrapper";
import { ChatHeader } from "@/components/messaging/ChatHeader";
import { EditorWrapper } from "@/components/messaging/EditorWrapper";
import { ErrorComponent } from "@/components/Error";
import { Spinning } from "@/components/Spinning";
import { VirtualizedConversation } from "@/components/messaging/VirtualizedConversation";
import { messagesAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

// 
export const Conversation = ({ isLoading, error }: { isLoading: boolean, error: Error | null | unknown }) => {
  const messagesFromDB = useAtomValue(messagesAtom)


  if (isLoading) {
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

  if (!messagesFromDB || messagesFromDB.length === 0) {
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


  return (
    <div className="relative flex h-screen flex-1 flex-col pb-6">
      <>
        <ChatHeader />
        <CarouselWrapper />
        <VirtualizedConversation />
        <EditorWrapper />
      </>
    </div>
  );
};
