import { Dispatch } from "react";

export const VerifyInfoHeader = ({
  dispatchSteps,
  steps,
}: {
  steps: CreateNewUserPolicyMultiStepForm[];
  dispatchSteps: Dispatch<{
    type: string;
    data: Partial<UserPolicyInputs> | object;
    stepNumber: number;
  }>;
}) => {
  return (
    <div className="md:flex md:items-center md:justify-between border-b border-gray-200 py-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Verificar Informacion
        </h2>
        <p className="mt-2 max-w-screen-sm text-gray-700">
          Revise la informacion para asegurarse que todo esta correcto.
        </p>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          onClick={() =>
            dispatchSteps({
              type: "make_changes",
              data: {},
              stepNumber: steps.length,
            })
          }
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Hacer nuevos cambios
        </button>
        <button
          onClick={() =>
            dispatchSteps({
              type: "save_and_continue",
              data: {},
              stepNumber: steps.length,
            })
          }
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
