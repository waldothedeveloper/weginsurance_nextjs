import { pdfDataAtom, selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { generatePDF } from "@/components/documents/utils/generatePDF";
import { useResetAtom } from "jotai/utils";

export const usePDFWizard = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const [canDoNextStep, setCanDoNextStep] = useState(false);
  const selectedUser = useAtomValue(selectedUserAtom);
  const pdfData = useAtomValue(pdfDataAtom);
  const setPDFData = useSetAtom(pdfDataAtom);
  const setResetPDFData = useResetAtom(pdfDataAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isLanguageSelected = pdfData.language.length > 0;
    const isAgentSelected = pdfData.agent.length > 0;
    const isSignerBirthdateSelected = pdfData.signerBirthdate;
    const isExpirationDateSelected = pdfData.expirationDate;
    const isLorenaAgentSelected = pdfData.agent.includes("Lorena");
    const isWilliamAgentSelected = pdfData.optionalAgentPhone;

    const canNotContinue = () => setCanDoNextStep(false);
    switch (step) {
      case 1:
        if (isLanguageSelected) {
          setCanDoNextStep(true);
        } else {
          canNotContinue();
        }
        break;
      case 2:
        if (isAgentSelected) {
          setCanDoNextStep(true);
        } else {
          canNotContinue();
        }
        break;
      case 3:
        if (isSignerBirthdateSelected) {
          setCanDoNextStep(true);
        } else if (isWilliamAgentSelected) {
          setCanDoNextStep(true);
        } else {
          canNotContinue();
        }
        break;
      case 4:
        if (isExpirationDateSelected && isLorenaAgentSelected) {
          setCanDoNextStep(true);
        } else if (isSignerBirthdateSelected) {
          setCanDoNextStep(true);
        } else {
          canNotContinue();
        }
        break;
      case 5:
        if (isExpirationDateSelected && urlCopied) {
          setCanDoNextStep(true);
        } else if (!isLorenaAgentSelected && isExpirationDateSelected) {
          setCanDoNextStep(true);
        } else {
          canNotContinue();
        }
        break;
      case 6:
        if (urlCopied) {
          setCanDoNextStep(true);
        } else {
          setCanDoNextStep(false);
        }
        break;
      default:
        setCanDoNextStep(false);
        break;
    }
  }, [pdfData, step, urlCopied]);

  const handleResetStep = () => {
    setIsOpen(false);
    setStep(1);
    setUrl("");
    setIsLoading(false);
    setUrlCopied(false);
    setError(null);
    setResetPDFData();
  };

  const initPdfModal = () => {
    setIsOpen(true);
    setStep(1);
    setUrl("");
    setIsLoading(false);
    setUrlCopied(false);
    setError(null);
  };

  const handleProcessAndNullError = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleNextStep = async () => {
    if (pdfData.agent.includes("Lorena")) {
      setPDFData((prev) => {
        return { ...prev, optionalAgentPhone: undefined };
      });
    }
    if (step === 4 && pdfData?.agent.includes("Lorena")) {
      handleProcessAndNullError();
      // generate the PDF
      await generatePDF(
        setIsLoading,
        setError,
        setUrl,
        setStep,
        selectedUser,
        pdfData
      );
    } else if (step === 5 && !pdfData?.agent.includes("Lorena")) {
      handleProcessAndNullError();
      // generate the PDF
      await generatePDF(
        setIsLoading,
        setError,
        setUrl,
        setStep,
        selectedUser,
        pdfData
      );
    } else if (step === 5 || step === 6) {
      handleResetStep();
    } else {
      setStep((step) => {
        return step + 1;
      });
    }
  };

  const handlePrevStep = () => {
    setStep((step) => {
      if (step === 1) {
        return 1;
      }
      if (step < 6) {
        // only if you're going back this will execute, you will have to press the back button for this to run
        setUrl("");
        setUrlCopied(false);
        setError(null);
      }
      return step - 1;
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  };

  return {
    canDoNextStep,
    error,
    url,
    urlCopied,
    isOpen,
    initPdfModal,
    step,
    handleNextStep,
    handlePrevStep,
    handleResetStep,
    isLoading,
    copyToClipboard,
  };
};
