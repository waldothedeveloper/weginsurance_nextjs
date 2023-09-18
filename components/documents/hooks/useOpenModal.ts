import { pdfDataAtom, selectedUserAtom } from "@/lib/state/atoms";

import { RealUser } from "@/interfaces/index";
import { createPDFEtchPackage } from "@/components/documents/utils/createPdfEtchPackage";
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
        // create the Etch package and save the signer eid and user id in your system to the pdfData in the db
        const { errors, signerEid, statusCode } = await createPDFEtchPackage(
          selectedUser as RealUser,
          pdfData
        );

        if (errors || statusCode !== 200) {
          setIsLoading(false);
          setError(
            `No se pudo crear el paquete de PDF. Ha occurrido el siguiente error: ${errors}`
          );
          throw new Error(
            `No se pudo crear el paquete de PDF. Ha occurrido el siguiente error: ${errors}`
          );
        } else {
          // save the signerEID and the pdfData in the db
          try {
            await saveDocumentPDFInfo(selectedUser?.id, pdfData, signerEid);
            setUrl(
              process.env.NODE_ENV == "development"
                ? `http://localhost:3000/sign_pdf/create_signature_package?userId=${selectedUser?.id}&signerEid=${signerEid}`
                : `https://weginsurancesms.org/sign_pdf/create_signature_package?userId=${selectedUser?.id}&signerEid=${signerEid}`
            );
            setIsLoading(false);
            setStep((step) => step + 1);
          } catch (error) {
            setError(JSON.stringify(error));
          }
        }
      } catch (error) {
        setIsLoading(false);
        setError(
          `Ha occurido un error inesperado, por favor intentelo nuevamente. Error: ${error}`
        );
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
