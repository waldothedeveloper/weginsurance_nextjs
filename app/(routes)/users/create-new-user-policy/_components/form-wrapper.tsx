"use client";

import { useRef, useState } from "react";

import { AddMoreDependantsDialog } from "./add-more-dependants-dialog";
import { BankInfo } from "./bank-info";
import { Divider } from "./divider";
import { HeadStepper } from "./head-stepper";
import { InsuranceInfo } from "./insurance-info";
import { LegalStatus } from "./legal-status";
import { Notes } from "./notes";
import PersonalInfo from "./personal-info";
import { Stepper } from "./footer-stepper";
import { SubmitHandler } from "react-hook-form";
import { WorkInfo } from "./work-info";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";
import { z } from "zod";

export const FormWrapper = () => {
  const [userEventDispatch, setUserEventDispatch] = useState<string>("");
  const {
    steps,
    dispatchSteps,
    openMoreDependantsDialog,
    setOpenMoreDependantsDialog,
    currStep,
    validationSchema,
    handleSubmit,
  } = useCreateUserPolicy();

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit: SubmitHandler<z.infer<typeof validationSchema>> = (data) => {
    dispatchSteps({
      type: userEventDispatch,
      data: data ?? {},
      stepNumber: currStep?.id ?? steps.length,
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(onSubmit)(evt);
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
            onClick={() => setUserEventDispatch("previous")}
            className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
  );
};
