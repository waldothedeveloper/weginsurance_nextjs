import { Dispatch, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { principalClientSchema } from "../schemas/principalClientSchema";
import { significantPartnerSchema } from "../schemas/significantPartnerSchema";
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
      accepts_insurance: undefined,
      firstname: "",
      second_name: "",
      lastname: "",
      second_lastname: "",
      phone: "",
      civil_status: "Soltero",
      email: "",
      ssn: "",
      birthdate: undefined,
      age: 0,
      country: "",
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      genre: undefined,
      legal_status: undefined,
      legal_status_notes: "",
      bank_account: "",
      routing_number: "",
      bank_account_number: "",
      bank_account_number_confirmation: "",
      payment_method: undefined,
      card_number: "",
      card_holder_fullname: "",
      card_expiration_date: "",
      card_cvv: "",
      work_type: undefined,
      company_name: "",
      wages: "",
      prima: "",
      insurance_policy_number: "",
      policy_start_date: "",
      notes: "",
      insurance_plan_type: undefined,
    },
  });

  const {
    reset,
    formState,
    formState: { errors },
  } = methods;
  // console.log("form errors: ", errors);
  // console.log(`steps: `, steps);

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

  //! Don't ask me how this works or why it doesn't makes sense, whatever your feelings in the future, just don't touch it ok?
  //! It fukin works ok?
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      const isData = currStep?.data && Object.keys(currStep?.data).length > 0;
      if (isData) {
        reset(currStep.data as z.infer<typeof validationSchema>);
      } else {
        reset();
      }
    } else {
      if (currStep?.data) {
        reset(currStep.data as z.infer<typeof validationSchema>);
      }
    }
  }, [formState.isSubmitSuccessful, reset, currStep]);

  return {
    methods,
    onSubmit,
    setUserEventDispatch,
    formRef,
  };
};
