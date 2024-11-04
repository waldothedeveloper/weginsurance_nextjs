"use client";

import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";
import { registrationSchema } from "../registrationSchema";
import { AddMoreDependantsDialog } from "./add-more-dependants-dialog";
import { BankInfo } from "./bank-info";
import { Divider } from "./divider";
import { Stepper } from "./footer-stepper";
import { HeadStepper } from "./head-stepper";
import { InsuranceInfo } from "./insurance-info";
import { LegalStatus } from "./legal-status";
import { Notes } from "./notes";
import PersonalInfo from "./personal-info";
import { WorkInfo } from "./work-info";

export const FormWrapper = () => {
  const [openAdditionalDependantsDialog, setOpenAdditionalDependantDialog] =
    useState(false);
  const [addMoreDependants, setAddMoreDependants] = useState(false);
  const [userEventDispatch, setUserEventDispatch] = useState<string>("");
  const { steps, dispatchSteps } = useCreateUserPolicy();
  // console.log(
  //   "steps: ",
  //   steps.map((step) => JSON.stringify(step.data, null, 2))
  // );
  const currStep = steps.find(
    (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
  )!;

  // console.log(`Current step:`, currStep?.data);

  // create one more step for the additional dependants
  useEffect(() => {
    if (addMoreDependants) {
      dispatchSteps({
        type: "additional_dependants",
        data: {},
        stepNumber: currStep.id ?? steps.length,
      });
      setAddMoreDependants(false);
    }

    return () => setAddMoreDependants(false);
  }, [addMoreDependants]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      second_name: "",
      second_lastname: "",
      civil_status: "",
      email: "",
      ssn: "",
      birthdate: "",
      age: 0,
      country: "",
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      legal_status: "",
      legal_status_notes: "",
      bank_account: "",
      routing_number: 0,
      bank_account_number: 0,
      bank_account_number_confirmation: 0,
      payment_method: "",
      card_number: 0,
      card_holder_fullname: "",
      card_expiration_date: "",
      card_cvv: 0,
      work_type: "",
      company_name: "",
      wages: "",
      prima: 0,
      insurance_policy_number: 0,
      policy_start_date: "",
      notes: "",
      insurance_plan_type: "",
    },
  });
  console.log("errors: ", errors);
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit: SubmitHandler<z.infer<typeof registrationSchema>> = (
    data
  ) => {
    console.log(`Data being submitted`, data);
    if (currStep.id === steps.length - 1 && userEventDispatch !== "previous") {
      setOpenAdditionalDependantDialog(true);
    } else {
      dispatchSteps({
        type: userEventDispatch,
        data: data ?? {},
        stepNumber: currStep.id ?? steps.length,
      });
      // reset the form
      formRef.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(onSubmit)(evt);
        // handleSubmit(() => {
        //   formAction(new FormData(formRef.current!));
        // })(evt);
      }}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <HeadStepper
        currStep={currStep}
        setUserEventDispatch={setUserEventDispatch}
      />
      <div className="border-t border-gray-100 mt-6 flex flex-col justify-center items-start size-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
        <PersonalInfo register={register} control={control} />
        <Divider />
        <LegalStatus register={register} control={control} />
        <Divider />
        <BankInfo register={register} />
        <Divider />
        <WorkInfo register={register} control={control} />
        <Divider />
        <InsuranceInfo register={register} control={control} />
        <Divider />
        <Notes register={register} />
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
            {currStep.id === 3 ? "Finalizar" : "Continuar"}
          </button>
        </div>
        <Stepper steps={steps} />
      </div>
      <AddMoreDependantsDialog
        open={openAdditionalDependantsDialog}
        setOpen={setOpenAdditionalDependantDialog}
        addMoreDependants={setAddMoreDependants}
      />
    </form>
  );
};
