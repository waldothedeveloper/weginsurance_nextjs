"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { BankInfo } from "./bank-info";
import { Divider } from "./divider";
import { HeadStepper } from "./head-stepper";
import { InsuranceInfo } from "./insurance-info";
import { LegalStatus } from "./legal-status";
import { Notes } from "./notes";
import PersonalInfo from "./personal-info";
import { Stepper } from "./footer-stepper";
import { WorkInfo } from "./work-info";
// import CreateUserHeader from "./create-user-header";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";

export const FormWrapper = () => {
  const { steps, handleNextStep, handlePreviousStep } = useCreateUserPolicy();
  const currStep = steps.find(
    (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
  );
  console.log('currStep: ', currStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPolicyInputs>();
  console.log("errors: ", errors);
  const onSubmit: SubmitHandler<UserPolicyInputs> = (data) => {
    // console.log(`data`, data);
    handleNextStep();
  };
  return (
    <>
      {/* <CreateUserHeader /> */}
      <HeadStepper currStep={currStep} handlePreviousStep={handlePreviousStep} handleNextStep={handleSubmit(onSubmit)} />
      <div className="border-t border-gray-100 mt-6 flex flex-col justify-center items-start size-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfo register={register} />
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
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Anterior
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {currStep?.id === 3 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
          <Stepper steps={steps} />
        </form>
      </div>
    </>
  );
};
