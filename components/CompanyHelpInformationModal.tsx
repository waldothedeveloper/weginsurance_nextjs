import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { Square3Stack3DIcon, XMarkIcon } from "@heroicons/react/24/outline";

type CompanyHelpInformationModalProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
};

export const CompanyHelpInformationModal = ({
  open,
  setOpen,
}: CompanyHelpInformationModalProps) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Square3Stack3DIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-slate-900"
                    >
                      Informacion de Contacto
                    </Dialog.Title>

                    <div className="mx-auto max-w-2xl lg:mx-0">
                      <p className="mt-6 text-lg leading-8 text-slate-600">
                        Necesita ayuda? Contactenos a cualquiera de estos telefono o correo electronico.
                      </p>
                    </div>
                    <div className="mt-6 mx-auto grid grid-cols-1 gap-8 text-base leading-7 gap-y-16 lg:mx-0">
                      <div>
                        <h3 className="border-l border-blue-600 pl-6 font-semibold text-slate-900">
                          Miami
                        </h3>
                        <div className="flex flex-col space-y-4 border-l border-slate-200 pl-6 pt-2 not-italic text-slate-600">
                          <div>
                            <p className="text-slate-700 text-sm font-medium">Telefonos</p>
                            <span className="text-slate-400">
                              (305)-320-4969<br />
                              (305)-749-5529<br />
                              (786)-471-8800 <br />
                            </span>
                          </div>
                          <div>
                            <p className="text-slate-700 text-sm font-medium">Correo elecotronico</p>
                            <span className="text-slate-400">healthinsuranceweg@gmail.com</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};