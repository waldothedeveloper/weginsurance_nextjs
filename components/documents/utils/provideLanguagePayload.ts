import { RealUser, SignaturePayload, pdfDataTypes } from "@/interfaces/index";

export const provideLanguagePayload = (
  userSignatureDate: string,
  payload: RealUser,
  pdfData: pdfDataTypes
): SignaturePayload => {
  const { firstname, lastname, email, phone } = payload;
  return {
    expirationDate: pdfData?.expirationDate as string,
    signerFirstName: firstname,
    signerLastName: lastname,
    agentFirstName: pdfData?.agent === "female" ? "Lorena" : "William",
    agentLastName: pdfData?.agent === "female" ? "Zozaya" : "Gola-Romero",
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
        : pdfData?.optionalAgentPhone
        ? pdfData.optionalAgentPhone
        : (process.env.WILLIAM_PHONE_NUMBER as string),
    signerPhoneNumber: phone,
    signerEmail: email || "",
    signatureDate: new Date(userSignatureDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    signerBirthdate: new Date(pdfData?.signerBirthdate).toLocaleDateString(
      "en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
    ),
  };
};
