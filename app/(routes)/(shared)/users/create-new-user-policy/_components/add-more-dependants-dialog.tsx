import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

import { UserPlusIcon } from "@heroicons/react/24/outline";

export function AddMoreDependantsDialog({
  open,
  setOpen,
  currStep,
  dispatchSteps,
  steps,
}: {
  open: boolean | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currStep: CreateNewUserPolicyMultiStepForm | undefined;
  dispatchSteps: Dispatch<{
    type: string;
    data: UserPolicyInputs | object;
    stepNumber: number;
  }>;
  steps: CreateNewUserPolicyMultiStepForm[];
}) {
  return (
    // the onClose on the Dialog is intentional. We don't want the users to dismiss the dialog without taking an action on any of the buttons at the bottom
    <Dialog open={open} onClose={() => void 0} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full">
                <UserPlusIcon
                  aria-hidden="true"
                  className="size-8 text-gray-400"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Dependientes Adicionales
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Desea agregar más dependientes?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  dispatchSteps({
                    type: "additional_dependants",
                    data: {},
                    stepNumber: currStep?.id ?? steps.length,
                  });
                  setOpen(false);
                }}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
              >
                Si, continuar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  dispatchSteps({
                    type: "finish",
                    data: {},
                    stepNumber: currStep?.id ?? steps.length,
                  });
                  setOpen(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                No, he terminado
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
