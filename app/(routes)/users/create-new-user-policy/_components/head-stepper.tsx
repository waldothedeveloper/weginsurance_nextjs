export const HeadStepper = ({
  currStep,
  handlePreviousStep,
  handleNextStep,
}: {
  currStep: CreateNewUserPolicyMultiStepForm;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}) => {
  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">{currStep?.icon}</div>
        {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
        <div className="pt-1.5">
          <h1 className="text-2xl font-bold text-gray-900">
            Paso {currStep.id}: {` `}
            {currStep.title}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            {currStep.description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {currStep?.id === 3 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};
