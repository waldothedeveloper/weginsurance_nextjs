import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { pdfDataAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

type DocumentModalProps = {
  canDoNextStep: boolean;
  urlCopied: boolean;
  error: string | null;
  isOpen: boolean,
  questions: { title: string }[],
  step: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  children: React.ReactNode;
  handleResetStep: () => void;
  isLoading: boolean;

}

export const DocumentModal = ({ canDoNextStep, urlCopied, error, isLoading, questions, isOpen, step, handleNextStep, handlePrevStep, children, handleResetStep }: DocumentModalProps) => {
  const pdfData = useAtomValue(pdfDataAtom);
  const pages = React.Children.toArray(children)
  const currentPage = pages[step - 1]
  const cancelButtonRef = useRef(null)


  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleResetStep}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => handleResetStep()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex w-full">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mx-0 sm:h-10 sm:w-10">
                    {step}
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-slate-900">
                      {questions[step - 1]?.title}
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                      {currentPage}
                      {/* Make SURE you dont have William selected here */}
                      {(step === 5 && !urlCopied && pdfData.agent.includes("Lorena")) && (
                        <p className="mt-2 text-sm text-red-600">
                          Por favor, copie el enlace para continuar
                        </p>
                      )}
                      {(step === 6 && !urlCopied) && (
                        <p className="mt-2 text-sm text-red-600">
                          Por favor, copie el enlace para continuar
                        </p>
                      )}

                      {error && (<p className="mt-2 text-sm text-red-600">
                        {JSON.stringify(error)}
                      </p>)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    disabled={isLoading || !canDoNextStep}
                    className={isLoading || !canDoNextStep ? "opacity-50 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" : "inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"}
                    onClick={() => handleNextStep()}
                  >

                    {step === questions.length ? 'Finalizar' : isLoading ? 'Procesando' : 'Siguiente'}
                    {isLoading && <div
                      className="ml-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-slate-300 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    />}
                  </button>
                  <button
                    type="button"
                    disabled={step === 1 || isLoading}
                    className={step === 1 || isLoading ? "opacity-50 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 sm:mt-0 sm:w-auto" : "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"}
                    onClick={() => handlePrevStep()}
                    ref={cancelButtonRef}
                  >
                    Anterior
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
