export const FooterStepperButtons = ({
  currStep,
  setUserEventDispatch,
  steps,
}: {
  currStep: CreateNewUserPolicyMultiStepForm | undefined;
  setUserEventDispatch: React.Dispatch<React.SetStateAction<string>>;
  steps: CreateNewUserPolicyMultiStepForm[];
}) => {
  return (
    <>
      <div className="mt-6 flex items-center justify-end space-x-3">
        <button
          type="submit"
          disabled={currStep?.id === 0}
          onClick={() => setUserEventDispatch("previous")}
          className={
            currStep?.id === 0
              ? "inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50 ring-1 ring-inset ring-gray-300"
              : "inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          }
        >
          Anterior
        </button>
        <button
          onClick={() => setUserEventDispatch("next")}
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {currStep?.id === steps.length - 1 ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </>
  );
};
