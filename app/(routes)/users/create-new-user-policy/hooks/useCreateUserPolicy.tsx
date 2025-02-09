"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import {
  TbBabyCarriage,
  TbUserHeart,
  TbUserStar,
  TbUsersGroup,
} from "react-icons/tb";

import { useImmerReducer } from "use-immer";

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
  // console.log(
  //   "steps: ",
  //   JSON.stringify(
  //     steps.map((step) => step.data),
  //     null,
  //     2
  //   )
  // );

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
        draft.push(additionalDependants(draft.length));
        // draft[action.stepNumber].data = action.data;
        // draft[action.stepNumber].status = "complete";
        return void draft;
      case "finish":
        // this should just save the data in the database and redirect somewhere else like a successfully saved or error saving page
        return void draft;
      default:
        return void draft;
    }
  }

  const currStep: CreateNewUserPolicyMultiStepForm | undefined = steps.find(
    (step: CreateNewUserPolicyMultiStepForm) => step.status === "current"
  )!;

  return (
    <CreateNewUserPolicyContext.Provider
      value={{
        steps,
        dispatchSteps,
        openMoreDependantsDialog,
        setOpenMoreDependantsDialog,
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
