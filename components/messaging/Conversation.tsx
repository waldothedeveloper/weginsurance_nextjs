import { CarouselWrapper } from "@/components/messaging/carousel/CarouselWrapper";
import { ChatHeader } from "@/components/messaging/ChatHeader";
import { EditorWrapper } from "@/components/messaging/EditorWrapper";
import { ErrorComponent } from "@/components/Error";
import { MyCustomEditor } from "@/components/messaging/MyCustomEditor";
import { Spinning } from "@/components/Spinning";
import { Transition } from "@headlessui/react";
import { VirtualizedConversation } from "@/components/messaging/VirtualizedConversation";
import { VirtualizedConversationType } from "@/interfaces/index";
import { sendingSMSAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { useDragNDrop } from "@/hooks/insurance_company/useDragNDrop";
import { useEditorHook } from "@/hooks/messaging/useEditorHook";
import { useHandleOutboundSMS } from "@/hooks/messaging/useHandleOutboundSMS";
import { useRetrieveMessages } from "@/hooks/messaging/useRetrieveMessages";
//
export const Conversation = () => {
  const {
    allFiles,
    handleSetFiles,
    documentDropZone,
    imageDropZone,
    handleSelectedFile,
    selectedImgId,
    additionalImageDropZone,
    additionalDocumentDropZone,
    handleRemoveFile,
  } = useDragNDrop();

  const isNotSendingSMS = useAtomValue<boolean>(sendingSMSAtom);
  const {
    data,
    error,
    isMutating,
    trigger,
  }: {
    data: VirtualizedConversationType;
    error: Error;
    isMutating: boolean;
    trigger: any;
  } = useRetrieveMessages();

  const [editorAtomValue, editorAtomValueWithImages] = useEditorHook(allFiles);

  // you need to send the
  const { handleSubmit } = useHandleOutboundSMS(
    editorAtomValue,
    editorAtomValueWithImages,
    trigger
  );

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

  if (!data) {
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

  if (data && data.length === 0) {
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
    <div className="relative flex h-screen flex-1 flex-col pb-6">
      <>
        <ChatHeader />

        <Transition
          show={Boolean(allFiles && allFiles.length > 0)}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {allFiles && allFiles.length > 0 && (
            <CarouselWrapper
              handleSubmit={handleSubmit}
              handleSetFiles={handleSetFiles}
              files={allFiles}
              handleSelectedFile={handleSelectedFile}
              selectedImgId={selectedImgId}
              handleRemoveFile={handleRemoveFile}
              additionalImageDropZone={additionalImageDropZone}
              additionalDocumentDropZone={additionalDocumentDropZone}
            >
              <MyCustomEditor editor={editorAtomValueWithImages} />
            </CarouselWrapper>
          )}
        </Transition>

        <VirtualizedConversation />

        <EditorWrapper
          handleSubmit={handleSubmit}
          documentDropZone={documentDropZone}
          imageDropZone={imageDropZone}
        >
          <MyCustomEditor editor={editorAtomValue} />
        </EditorWrapper>
      </>
    </div>
  );
};
