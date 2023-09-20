import { SignaturePayload, languageDependentPayload } from "@/interfaces/index";

export const englishPayload = (
  payload: SignaturePayload
): languageDependentPayload => {
  return {
    pdf_expiration_date: payload.expirationDate,
    signer_fullname: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    agent_fullname: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    pdf_consent_method: "Written",
    agent_producer_number: payload.agentInsuranceNumber,
    agent_phone_number: {
      num: payload.agentPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    agent_email: payload.agentEmail,
    signer_birthdate: payload.signerBirthdate,
    signer_phone: {
      num: payload.signerPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    signer_email: payload.signerEmail,
    pdf_signature_date: payload.signatureDate,
  };
};
