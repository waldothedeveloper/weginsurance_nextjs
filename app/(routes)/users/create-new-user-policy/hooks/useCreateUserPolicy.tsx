"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  TbBabyCarriage,
  TbUserHeart,
  TbUserStar,
  TbUsersGroup,
} from "react-icons/tb";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useImmerReducer } from "use-immer";
import { z } from "zod";
import { principalClientSchema } from "../principalClientSchema";
import { significantPartnerSchema } from "../significantPartnerSchema";

//
const stepsData: CreateNewUserPolicyMultiStepForm[] = [
  {
    id: 0,
    tag: "cliente principal",
    status: "current",
    icon: <TbUserStar className="rounded-full shadow-inner size-12" />,
    title: "Cliente Principal",
    description:
      "Recopilar la información del cliente principal de la poliza de seguro.",
    data: {},
  },
  {
    id: 1,
    tag: "conyuge o pareja",
    status: "upcoming",
    icon: <TbUserHeart className="rounded-full shadow-inner size-12" />,
    title: "Conyuge o Pareja",
    description:
      "Recopilar la información del conyuge o pareja del cliente principal.",
    data: {},
  },
  {
    id: 2,
    tag: "dependientes",
    status: "upcoming",
    icon: <TbBabyCarriage className="rounded-full shadow-inner size-12" />,
    title: "Dependientes",
    description:
      "Recopilar la información de los dependientes del cliente principal.",
    data: {},
  },
];

const additionalDependants = (id: number) => {
  return {
    id,
    tag: "dependientes adicionales",
    status: "current",
    icon: <TbUsersGroup className="rounded-full shadow-inner size-12" />,
    title: "Dependientes Adicionales",
    description:
      "Recopilar la información de los dependientes adicionales del cliente principal.",
    data: {},
  };
};

const CreateNewUserPolicyContext = createContext<
  CreateNewUserPolicyContextType | undefined
>(undefined);

const CreateNewUserPolicyProvider = ({ children }: { children: ReactNode }) => {
  const [openMoreDependantsDialog, setOpenMoreDependantsDialog] =
    useState(false);

  const [steps, dispatchSteps] = useImmerReducer(reducer, stepsData);
  console.log(
    "steps: ",
    steps.map((step) => step.data)
  );

  const currStep: CreateNewUserPolicyMultiStepForm | undefined = steps.find(
    (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
  )!;
  const validationSchema =
    currStep?.id === 0 ? principalClientSchema : significantPartnerSchema;

  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
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
      routing_number: "",
      bank_account_number: "",
      bank_account_number_confirmation: "",
      payment_method: "",
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
  // const formValues = watch();
  // console.log(`Form values:`, formValues.policy_start_date);
  console.log(`errors in the form `, errors);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [reset, formState]);

  function reducer(
    draft: CreateNewUserPolicyMultiStepForm[],
    action: {
      type: string;
      data: UserPolicyInputs | object;
      stepNumber: number;
    }
  ) {
    switch (action.type) {
      case "previous":
        if (action.stepNumber === 0) return void draft;
        draft[action.stepNumber].status = "upcoming";
        draft[action.stepNumber - 1].status = "current";
        return void draft;
      case "next":
        if (action.stepNumber === draft.length - 1) {
          // console.log(`CASE WHEN action.stepNumber === draft.length - 1`);
          setOpenMoreDependantsDialog(true);
          draft[action.stepNumber].data = action.data;
          draft[action.stepNumber].status = "complete";
          return void draft;
        }
        draft[action.stepNumber].data = action.data;
        draft[action.stepNumber].status = "complete";
        draft[action.stepNumber + 1].status = "current";
        return void draft;

      case "additional_dependants":
        // console.log(`CASE WHEN action.type === additional_dependants`);
        draft.push(additionalDependants(draft.length));
        // draft[action.stepNumber].data = action.data;
        // draft[action.stepNumber].status = "complete";
        return void draft;
      default:
        return void draft;
    }
  }

  return (
    <CreateNewUserPolicyContext.Provider
      value={{
        steps,
        dispatchSteps,
        openMoreDependantsDialog,
        setOpenMoreDependantsDialog,
        handleSubmit,
        register,
        control,
        validationSchema,
        currStep,
      }}
    >
      {children}
    </CreateNewUserPolicyContext.Provider>
  );
};

const useCreateUserPolicy = () => {
  const context = useContext(CreateNewUserPolicyContext);
  if (!context) {
    throw new Error(
      "useCreateUserPolicy must be used within a CreateNewUserPolicyProvider"
    );
  }

  return context;
};

export { CreateNewUserPolicyProvider, useCreateUserPolicy };
