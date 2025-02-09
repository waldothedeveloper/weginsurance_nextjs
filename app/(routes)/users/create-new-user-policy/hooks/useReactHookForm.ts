import { Dispatch, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { principalClientSchema } from "../principalClientSchema";
import { significantPartnerSchema } from "../significantPartnerSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useReactHookForm = (
  currStep: CreateNewUserPolicyMultiStepForm | undefined,
  dispatchSteps: Dispatch<{
    type: string;
    data: Partial<UserPolicyInputs> | object;
    stepNumber: number;
  }>,
  steps: CreateNewUserPolicyMultiStepForm[]
) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [userEventDispatch, setUserEventDispatch] = useState("");
  const validationSchema =
    currStep?.id === 0 ? principalClientSchema : significantPartnerSchema;

  const methods = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      accepts_insurance: "Selecione una opcion",
      firstname: "",
      second_name: "",
      lastname: "",
      second_lastname: "",
      phone: "",
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
      genre: "Selecione una opcion",
      legal_status: "",
      legal_status_notes: "",
      bank_account: "",
      routing_number: "",
      bank_account_number: "",
      bank_account_number_confirmation: "",
      payment_method: null,
      card_number: "",
      card_holder_fullname: "",
      card_expiration_date: "",
      card_cvv: "",
      work_type: "",
      company_name: "",
      wages: "",
      prima: "",
      insurance_policy_number: "",
      policy_start_date: "",
      notes: "",
      insurance_plan_type: "",
    },
  });

  // console.log(`errors in the form `, errors);

  const { reset, formState } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof validationSchema>> = (data) => {
    if (data.firstname === "" && data.lastname === "") {
      dispatchSteps({
        type: userEventDispatch,
        data: {},
        stepNumber: currStep?.id ?? steps.length,
      });
    } else {
      dispatchSteps({
        type: userEventDispatch,
        data,
        stepNumber: currStep?.id ?? steps.length,
      });
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      const step = steps.find(
        (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
      );
      const isData = step?.data && Object.keys(step?.data).length > 0;

      if (isData) {
        reset(step.data);
      } else {
        reset();
        const formElement = document.getElementById(
          "insurance_form"
        ) as HTMLFormElement;
        if (formElement) {
          formElement.reset();
        }
      }
    }
  }, [formState.isSubmitSuccessful, reset, steps]);

  useEffect(() => {
    const step = steps.find(
      (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
    );
    if (step?.data) {
      reset(step.data);
    }
  }, [reset, steps]);

  return {
    methods,
    onSubmit,
    setUserEventDispatch,
    formRef,
  };
};
