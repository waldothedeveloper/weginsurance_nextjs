import { Dispatch, SetStateAction } from "react";
import { FakeUser, RealUser } from "@/interfaces/index";

import { createPDFEtchPackage } from "@/components/documents/utils/createPdfEtchPackage";
import { pdfDataTypes } from "@/interfaces/index";
import { saveDocumentPDFInfo } from "@/components/documents/utils/saveDocumentPDFInfo";

export const generatePDF = async (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setUrl: Dispatch<SetStateAction<string>>,
  setStep: Dispatch<SetStateAction<number>>,
  selectedUser: RealUser | FakeUser | null,
  pdfData: pdfDataTypes
) => {
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
      `Ha occurido un error inesperado, por favor intentelo nuevamente. Error: ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
  }
};
