import { SignaturePayload, languageDependentPayload } from "@/interfaces/index";

export const spanishPayload = (
  payload: SignaturePayload
): languageDependentPayload => {
  return {
    castc76a3a10228011ee9a08d17f33fdcf3c: payload.expirationDate,
    castde5429c0228011ee9a08d17f33fdcf3c: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    cast0c24adc0228111ee9a08d17f33fdcf3c: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    cast226a6e30228111ee9a08d17f33fdcf3c: "Escrito",
    cast97ea02e0228311ee9a08d17f33fdcf3c: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    casta7211f50228311ee9a08d17f33fdcf3c: payload.agentInsuranceNumber,
    castc93e5670228311ee9a08d17f33fdcf3c: {
      num: payload.agentPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    castd5563180228311ee9a08d17f33fdcf3c: payload.agentEmail,
    caste228aa00228311ee9a08d17f33fdcf3c: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    castf1d4f670228311ee9a08d17f33fdcf3c: {
      num: payload.signerPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    castfc715510228311ee9a08d17f33fdcf3c: payload.signerEmail,
    cast1dd77130228411ee9a08d17f33fdcf3c: payload.signatureDate,
  };
};
