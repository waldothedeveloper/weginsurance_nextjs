import { RealUser, SignaturePayload } from "@/interfaces/index";

export const provideLanguagePayload = (
  date: string,
  payload: RealUser
): SignaturePayload => {
  const { firstname, lastname, email, pdfData, phone } = payload;
  return {
    expirationDate: date,
    signerFirstName: firstname,
    signerLastName: lastname,
    agentFirstName: pdfData?.agent === "female" ? "Lorena" : "William",
    agentLastName: pdfData?.agent === "female" ? "Zozaya" : "Gola",
    agentEmail:
      pdfData?.agent === "female"
        ? (process.env.LORENA_EMAIL as string)
        : (process.env.WILLIAM_EMAIL as string),
    agentInsuranceNumber:
      pdfData?.agent === "female"
        ? (process.env.LORENA_AGENT_NUMBER as string)
        : (process.env.WILLIAM_AGENT_NUMBER as string),
    agentPhoneNumber:
      pdfData?.agent === "female"
        ? (process.env.LORENA_PHONE_NUMBER as string)
        : (process.env.WILLIAM_PHONE_NUMBER as string),
    signerPhoneNumber: phone,
    signerEmail: email || "",
    signatureDate: pdfData?.date as string,
  };
};
