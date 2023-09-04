import { pdfDataAtom, selectedUserAtom } from "@/lib/state/atoms";

import { saveDocumentPDFInfo } from "@/components/documents/utils/saveDocumentPDFInfo";
import { useAtomValue } from "jotai";
import { useState } from "react";

export const useOpenModal = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const selectedUser = useAtomValue(selectedUserAtom);
  const pdfData = useAtomValue(pdfDataAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetStep = () => {
    setIsOpen(false);
    setStep(1);
    setUrl("");
    setIsLoading(false);
    setUrlCopied(false);
    setError(null);
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
    if (step === 3) {
      setIsLoading(true);
      try {
        await saveDocumentPDFInfo(selectedUser?.id, pdfData);
        setUrl(
          `https://weginsurancesms.org/sign-pdf?userId=${selectedUser?.id}`
        );
        setStep((step) => step + 1);
      } catch (error) {
        setError(
          `Ha occurido un error inesperado, por favor intentelo nuevamente. ${error}`
        );
        return error;
      } finally {
        setIsLoading(false);
      }
    } else if (step === 4) {
      setIsOpen(false);
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
