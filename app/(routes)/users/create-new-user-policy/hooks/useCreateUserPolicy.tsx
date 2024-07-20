"use client";

import { FaUserFriends, FaUserTie } from "react-icons/fa";
import { ReactNode, createContext, useContext, useState } from "react";

import { FaChildren } from "react-icons/fa6";

const stepsData = [
  {
    id: 1,
    tag: "cliente principal",
    status: "current",
    icon: <FaUserTie className="rounded-full shadow-inner size-14" />,
    title: "Cliente Principal",
    description:
      "Recopilar la información del cliente principal de la poliza de seguro.",
    data: {},
  },
  {
    id: 2,
    tag: "conyuge o pareja",
    status: "upcoming",
    icon: <FaUserFriends className="rounded-full shadow-inner size-14" />,
    title: "Conyuge o Pareja",
    description:
      "Recopilar la información del conyuge o pareja del cliente principal.",
    data: {},
  },
  {
    id: 3,
    tag: "dependientes",
    status: "upcoming",
    icon: <FaChildren className="rounded-full shadow-inner size-14" />,
    title: "Dependientes",
    description:
      "Recopilar la información de los dependientes del cliente principal.",
    data: {},
  },
];

const CreateNewUserPolicyContext = createContext<CreateNewUserPolicyContextType | undefined>(undefined);

const CreateNewUserPolicyProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [steps, setSteps] =
    useState<CreateNewUserPolicyMultiStepForm[]>(stepsData);

  const handleNextStep = () => {
    setSteps((prevState) => {
      let foundCurrent = false;
      return prevState.map((step) => {
        if (step.status === 'current' && !foundCurrent) {
          foundCurrent = true;
          return { ...step, status: 'complete' };
        }
        if (foundCurrent && step.status === 'upcoming') {
          foundCurrent = false;
          return { ...step, status: 'current' };
        }
        return step;
      });
    });
  };

  const handlePreviousStep = () => {
    setSteps((prevState) => {
      let currentIndex = prevState.findIndex(step => step.status === 'current');
      if (currentIndex > 0) {
        return prevState.map((step, index) => {
          if (index === currentIndex) {
            return { ...step, status: 'upcoming' };
          } else if (index === currentIndex - 1) {
            return { ...step, status: 'current' };
          }
          return step;
        });
      }
      return prevState;
    });
  };
  return (
    <CreateNewUserPolicyContext.Provider value={{ steps, handleNextStep, handlePreviousStep }}>
      {children}
    </CreateNewUserPolicyContext.Provider>
  );
};


const useCreateUserPolicy = () => {
  const context = useContext(CreateNewUserPolicyContext);
  if (!context) {
    throw new Error('useCreateUserPolicy must be used within a CreateNewUserPolicyProvider');
  }

  return context;
}

export { CreateNewUserPolicyProvider, useCreateUserPolicy };
