"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

export const SavingModal = ({
  open,
  setOpen,
  success,
  setSuccess,
  submissionError,
  setSubmissionError,
  submissionErrorMessage,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  submissionError: boolean;
  setSubmissionError: Dispatch<SetStateAction<boolean>>;
  submissionErrorMessage: string;
}) => {
  return (
    <Dialog
      open={success || open || submissionError}
      onClose={setOpen || setSuccess || setSubmissionError}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSuccess(false);
                  setSubmissionError(false);
                }}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div>
              <div
                className={
                  success
                    ? "mx-auto flex size-12 items-center justify-center rounded-full bg-green-100"
                    : submissionError
                      ? "mx-auto flex size-12 items-center justify-center rounded-full bg-red-100"
                      : "w-full flex items-center justify-center"
                }
              >
                {success && (
                  <CheckIcon
                    aria-hidden="true"
                    className="size-6 text-green-600"
                  />
                )}

                {submissionError && (
                  <ExclamationCircleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                )}

                {open && (
                  <svg
                    className="mr-3 -ml-1 size-12 animate-spin text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {success && "¡Listo!"}
                  {open && "Guardando..."}
                  {submissionError && "Error al intentar guardar los datos"}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {success && "La información se ha guardado exitosamente."}
                    {open &&
                      "Por favor espere mientras guardamos la información."}
                    {submissionError &&
                      `${submissionErrorMessage}. Si el error persiste, contacte al soporte tecnico.`}
                  </p>
                </div>
              </div>
            </div>
            {success && (
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Cerrar
                </button>
              </div>
            )}

            {submissionError && (
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setSubmissionError(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Cerrar
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
