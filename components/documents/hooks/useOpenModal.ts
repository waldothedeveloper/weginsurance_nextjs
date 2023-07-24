import { useState } from "react";

export const useOpenModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((step) => {
      if (step === 3) {
        return 3;
      }
      return step + 1;
    });
  };

  const handlePrevStep = () => {
    setStep((step) => {
      if (step === 1) {
        return 1;
      }
      return step - 1;
    });
  };

  const handleResetStep = () => {
    setIsOpen(false);
    setStep(1);
  };

  return {
    isOpen,
    setIsOpen,
    step,
    handleNextStep,
    handlePrevStep,
    handleResetStep,
  };
};
