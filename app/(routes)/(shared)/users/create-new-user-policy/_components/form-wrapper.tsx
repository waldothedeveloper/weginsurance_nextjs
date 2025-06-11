"use client";

import { AddMoreDependantsDialog } from "./add-more-dependants-dialog";
import { BankInfo } from "./bank-info";
import { Divider } from "./divider";
import { FooterStepperButtons } from "./footer-stepper-buttons";
import { FormProvider } from "react-hook-form";
import { HeadStepper } from "./head-stepper";
import { InsuranceInfo } from "./insurance-info";
import { LegalStatus } from "./legal-status";
import { Notes } from "./notes";
import PersonalInfo from "./personal-info";
import { Stepper } from "./footer-stepper";
import { VerifyInfo } from "./verify-info";
import { VerifyInfoFooter } from "./verify-info-footer";
import { VerifyInfoHeader } from "./verify-info-header";
import { WorkInfo } from "./work-info";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";
import { useReactHookForm } from "../hooks/useReactHookForm";

export const FormWrapper = () => {
  const {
    steps,
    dispatchSteps,
    openMoreDependantsDialog,
    setOpenMoreDependantsDialog,
    currStep,
    formReadyToSubmit,
  } = useCreateUserPolicy();

  const { methods, onSubmit, setUserEventDispatch, formRef, formErrors } =
    useReactHookForm(currStep, dispatchSteps, steps);

  if (formReadyToSubmit) {
    return (
      <div>
        <VerifyInfoHeader dispatchSteps={dispatchSteps} steps={steps} />
        <VerifyInfo />
        <VerifyInfoFooter dispatchSteps={dispatchSteps} steps={steps} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        id="insurance_form"
        ref={formRef}
        // old one that still works
        onSubmit={(evt) => {
          evt.preventDefault();
          methods.handleSubmit(onSubmit)(evt);
        }}
      >
        <HeadStepper
          steps={steps}
          currStep={currStep}
          setUserEventDispatch={setUserEventDispatch}
        />
        <div className="border-t border-gray-100 mt-6 flex flex-col justify-center items-start size-full max-w-(--breakpoint-2xl) mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
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
          <FooterStepperButtons
            steps={steps}
            currStep={currStep}
            setUserEventDispatch={setUserEventDispatch}
          />
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
