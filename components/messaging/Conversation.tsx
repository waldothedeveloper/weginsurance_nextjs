import { CarouselWrapper } from "@/components/messaging/carousel/CarouselWrapper";
import { ChatHeader } from "@/components/messaging/ChatHeader";
import { EditorWrapper } from "@/components/messaging/EditorWrapper";
import { ErrorComponent } from "@/components/Error";
import { Spinning } from "@/components/Spinning";
import { VirtualizedConversation } from "@/components/messaging/VirtualizedConversation";
import { VirtualizedConversationType } from "@/interfaces/index";

type ConversationProps = {
  isLoading: boolean;
  isSavingMessagesToDb: boolean;
  isLoadingMessagesFromTwilioAPI: boolean;
  error: Error | null | unknown;
  errorSavingMessagesToDb: Error | null | unknown;
  errorFromTwilioAPI: Error | null | unknown;
  saveDateHeadersError: Error | null | unknown;
  messages: VirtualizedConversationType | null;
}

// 
export const Conversation = ({ messages, isLoading, error, saveDateHeadersError, isLoadingMessagesFromTwilioAPI, errorFromTwilioAPI, isSavingMessagesToDb, errorSavingMessagesToDb }: ConversationProps) => {


  if (isLoading || isLoadingMessagesFromTwilioAPI || isSavingMessagesToDb) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <Spinning message="Un momento por favor. Cargando la conversacion..." />
      </div>
    );
  }

  if (error || saveDateHeadersError || errorFromTwilioAPI || errorSavingMessagesToDb) {
    return (
      <div className="grid h-screen place-items-center overflow-hidden">
        <ErrorComponent error_message={error || saveDateHeadersError || errorFromTwilioAPI || errorSavingMessagesToDb} />
      </div>
    );
  }

  if (!messages) {
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
        <VirtualizedConversation messages={messages} />
        <EditorWrapper />
      </>
    </div>
  );
};
