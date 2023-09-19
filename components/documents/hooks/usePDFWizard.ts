import { pdfDataAtom, selectedUserAtom } from "@/lib/state/atoms";
import { useEffect, useState } from "react";

import { generatePDF } from "@/components/documents/utils/generatePDF";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";

export const usePDFWizard = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const [canDoNextStep, setCanDoNextStep] = useState(false);
  const selectedUser = useAtomValue(selectedUserAtom);
  const pdfData = useAtomValue(pdfDataAtom);
  const setPDFData = useResetAtom(pdfDataAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pdfData.language.length > 0 && step === 1) {
      setCanDoNextStep(true);
    } else if (pdfData.agent.length > 0 && step === 2) {
      setCanDoNextStep(true);
    } else if (pdfData.expirationDate && step === 3) {
      setCanDoNextStep(true);
    } else if (step === 4 && pdfData?.optionalAgentPhone) {
      setCanDoNextStep(true);
    } else if (step === 4 && urlCopied) {
      setCanDoNextStep(true);
    } else if (step === 5 && urlCopied) {
      setCanDoNextStep(true);
    } else {
      setCanDoNextStep(false);
    }
  }, [pdfData, step, urlCopied]);

  const handleResetStep = () => {
    setIsOpen(false);
    setStep(1);
    setUrl("");
    setIsLoading(false);
    setUrlCopied(false);
    setError(null);
    setPDFData();
  };

  const initPdfModal = () => {
    setIsOpen(true);
    setStep(1);
    setUrl("");
    setIsLoading(false);
    setUrlCopied(false);
    setError(null);
  };

  const handleNextStep = async () => {
    if (step === 3 && !pdfData?.optionalAgentPhone) {
      setIsLoading(true);
      setError(null);
      // generate the PDF
      await generatePDF(
        setIsLoading,
        setError,
        setUrl,
        setStep,
        selectedUser,
        pdfData
      );
    } else if (step === 4 && pdfData?.optionalAgentPhone) {
      setIsLoading(true);
      setError(null);
      // generate the PDF
      await generatePDF(
        setIsLoading,
        setError,
        setUrl,
        setStep,
        selectedUser,
        pdfData
      );
    } else if ((step === 4 && !pdfData?.optionalAgentPhone) || step === 5) {
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
      if (step !== 4 && step >= 2) {
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
    setIsOpen,
    step,
    handleNextStep,
    handlePrevStep,
    handleResetStep,
    isLoading,
    copyToClipboard,
  };
};
