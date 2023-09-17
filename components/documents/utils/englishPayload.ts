import { SignaturePayload, languageDependentPayload } from "@/interfaces/index";

export const englishPayload = (
  payload: SignaturePayload
): languageDependentPayload => {
  return {
    cast95f0d150228b11ee9a08d17f33fdcf3c: payload.signatureDate,
    cast9ff583d0228b11ee9a08d17f33fdcf3c: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    castbab2c2a0228b11ee9a08d17f33fdcf3c: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    castcd8cf670228b11ee9a08d17f33fdcf3c: "Written",
    castd69631f0228b11ee9a08d17f33fdcf3c: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    caste12968d0228b11ee9a08d17f33fdcf3c: payload.agentInsuranceNumber,
    casteded3b50228b11ee9a08d17f33fdcf3c: {
      num: payload.agentPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    cast015445d0228c11ee9a08d17f33fdcf3c: payload.agentEmail,
    cast10392390228c11ee9a08d17f33fdcf3c: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    cast1a6a6450228c11ee9a08d17f33fdcf3c: {
      num: payload.signerPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    cast245bb5e0228c11ee9a08d17f33fdcf3c: payload.signerEmail,
    cast38e59580228c11ee9a08d17f33fdcf3c: payload.expirationDate,
  };
};
