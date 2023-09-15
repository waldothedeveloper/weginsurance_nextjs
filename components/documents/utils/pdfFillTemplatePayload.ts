import { RequestData } from "@/interfaces/index";
import dayjs from "dayjs";

export const pdfFillTemplatePayload = (
  //! this is the REQ.BODY coming from the sign_pdf API route, just to clarify
  requestPayload: RequestData
) => {
  const signatureDateOfThePDFSigner = dayjs().format("YYYY-MM-DD");
  const { phone, email, firstname, lastname, pdfData } = requestPayload;

  return {
    expirationDate: signatureDateOfThePDFSigner,
    signerFirstName: firstname,
    signerLastName: lastname,
    agentFirstName: pdfData.agent === "female" ? "Lorena" : "William",
    agentLastName: pdfData.agent === "female" ? "Zozaya" : "Gola",
    agentEmail:
      pdfData.agent === "female"
        ? (process.env.LORENA_EMAIL as string)
        : (process.env.WILLIAM_EMAIL as string),
    agentInsuranceNumber:
      pdfData.agent === "female"
        ? (process.env.LORENA_AGENT_NUMBER as string)
        : (process.env.WILLIAM_AGENT_NUMBER as string),
    agentPhoneNumber:
      pdfData.agent === "female"
        ? (process.env.LORENA_PHONE_NUMBER as string)
        : (process.env.WILLIAM_PHONE_NUMBER as string),
    signerPhoneNumber: phone,
    signerEmail: email || "",
    signatureDate: pdfData.date,
    documentId: "spanish_es",
    title:
      "Formulario De Consentimiento Para Agentes Y Corredores Del Mercado De Salud",
    eid: "cast122583e0228411ee9a08d17f33fdcf3c",
    fullname: `${firstname} ${lastname}`,
    email:
      email || process.env.NODE_ENV === "development"
        ? (process.env.WEG_INTERNAL_EMAIL as string)
        : (process.env.LORENA_EMAIL as string),
  };
};
