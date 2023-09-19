import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { FaUserEdit, FaUserMinus, } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { pdfDataAtom, selectedUserAtom } from "@/lib/state/atoms";

import { BsFiletypePdf } from "react-icons/bs";
import { DateSelect } from "@/components/documents/DateSelect";
import { DocumentModal } from "@/components/documents/DocumentModal";
import { Fragment } from "react";
import { Questions } from "@/components/documents/Questions";
import { URLCopy } from "@/components/documents/URLCopy";
import { UserIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/classNames";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { pdfModalTitles } from "@/components/documents/utils/pdfModalTitles";
import { useAtomValue } from "jotai";
import { usePDFWizard } from "@/components/documents/hooks/usePDFWizard";

export const ChatHeader = () => {
  const selectedUser = useAtomValue(selectedUserAtom);
  const pdfData = useAtomValue(pdfDataAtom);
  const { isOpen,
    canDoNextStep,
    error,
    urlCopied,
    copyToClipboard,
    url,
    setIsOpen, initPdfModal,
    step,
    handleNextStep,
    handleResetStep,
    handlePrevStep, isLoading } = usePDFWizard();
  return (
    <div className="border-b-2 border-b-slate-200 px-4 py-5 sm:px-6">
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <UserIcon className="h-16 w-16 rounded-full bg-slate-50 p-2 font-light text-slate-400" />
          <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
            <ChatBubbleLeftEllipsisIcon
              className="h-6 w-6 text-slate-400"
              aria-hidden="true"
            />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {selectedUser?.fullname || "No hay usuario seleccionado"}
          </p>
          <p className="text-xs text-slate-500">
            {formatPhoneNumberToNationalUSAformat(selectedUser?.phone) || ""}
          </p>
        </div>
        <div className="flex flex-shrink-0 self-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-slate-400 hover:text-slate-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex w-full px-4 py-2 text-sm"
                        )}
                      >
                        <FaUserEdit
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Actualizar Usuario</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={initPdfModal}
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex w-full px-4 py-2 text-sm"
                        )}
                      >
                        <BsFiletypePdf
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Documentos PDF</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-700",
                          "flex w-full px-4 py-2 text-sm"
                        )}
                      >
                        <FaUserMinus
                          className="mr-3 h-5 w-5 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>Eliminar Usuario</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <DocumentModal canDoNextStep={canDoNextStep} urlCopied={urlCopied} error={error} isLoading={isLoading} questions={pdfModalTitles(pdfData?.agent.includes("William"))} isOpen={isOpen} setIsOpen={setIsOpen} step={step} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} handleResetStep={handleResetStep}>
        <Questions step={step} name="language" subtitle="El documento PDF sera enviado con el idioma selecionado." options={[{ id: 'en', item: 'Ingles' }, { id: 'es', item: 'Español' }]} />
        <Questions step={step} name="agent" subtitle="El documento PDF sera enviado con los datos del agente selecionado." options={[{ id: 'agent1', item: 'William Gola-Romero' }, { id: 'agent2', item: 'Lorena Zozaya' }]} />
        {pdfData?.agent.includes("William") && (<Questions step={step} name="optionalAgentPhone" subtitle="Para clientes de Texas escoja el telefono privado. Para cualquier otro cliente, escoja el telefono general." options={[{ id: 'privado', item: process.env.NEXT_PUBLIC_PERSONAL_PHONE as string }, { id: 'general', item: process.env.NEXT_PUBLIC_WILLIAM_GENERAL_PHONE as string }]} />)}
        <DateSelect name="expirationDate" subtitle="La fecha por defecto son 10 años. Puede escoger otra fecha si desea." />
        <URLCopy url={url} copy={copyToClipboard} urlCopied={urlCopied} />
      </DocumentModal>
    </div>
  );
};
