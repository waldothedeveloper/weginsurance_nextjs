"use client";

import { FormProvider } from "react-hook-form";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";
import { useReactHookForm } from "../hooks/useReactHookForm";
import { AddMoreDependantsDialog } from "./add-more-dependants-dialog";
import { BankInfo } from "./bank-info";
import { Divider } from "./divider";
import { Stepper } from "./footer-stepper";
import { HeadStepper } from "./head-stepper";
import { InsuranceInfo } from "./insurance-info";
import { LegalStatus } from "./legal-status";
import { Notes } from "./notes";
import PersonalInfo from "./personal-info";
import { VerifyInfo } from "./verify-info";
import { VerifyInfoHeader } from "./verify-info-header";
import { WorkInfo } from "./work-info";

export const FormWrapper = () => {
  const {
    steps,
    dispatchSteps,
    openMoreDependantsDialog,
    setOpenMoreDependantsDialog,
    currStep,
    formReadyToSubmit,
  } = useCreateUserPolicy();

  const { methods, onSubmit, setUserEventDispatch, formRef } = useReactHookForm(
    currStep,
    dispatchSteps,
    steps
  );

  if (formReadyToSubmit) {
    return (
      // className="-mt-12"
      <div>
        <VerifyInfoHeader dispatchSteps={dispatchSteps} steps={steps} />
        <VerifyInfo />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        id="insurance_form"
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          methods.handleSubmit(onSubmit)(evt);
        }}
      >
        <HeadStepper
          currStep={currStep}
          setUserEventDispatch={setUserEventDispatch}
        />
        <div className="border-t border-gray-100 mt-6 flex flex-col justify-center items-start size-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
          <PersonalInfo />
          <Divider />
          <LegalStatus />
          <Divider />
          <BankInfo />
          <Divider />
          <WorkInfo />
          <Divider />
          <InsuranceInfo />
          <Divider />
          <Notes />
          <Divider />
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="submit"
              disabled={currStep?.id === 0}
              onClick={() => setUserEventDispatch("previous")}
              className={
                currStep?.id === 0
                  ? "inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50 ring-1 ring-inset ring-gray-300"
                  : "inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              }
            >
              Anterior
            </button>
            <button
              onClick={() => setUserEventDispatch("next")}
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {currStep?.id === steps.length - 1 ? "Finalizar" : "Continuar"}
            </button>
          </div>
          <Stepper steps={steps} />
        </div>
        <AddMoreDependantsDialog
          open={openMoreDependantsDialog}
          setOpen={setOpenMoreDependantsDialog}
          currStep={currStep}
          dispatchSteps={dispatchSteps}
          steps={steps}
        />
      </form>
    </FormProvider>
  );
};
