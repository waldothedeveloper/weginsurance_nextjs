import { SignaturePayload, languageDependentPayload } from "@/interfaces/index";

export const spanishPayload = (
  payload: SignaturePayload
): languageDependentPayload => {
  return {
    fecha_de_expiracion: payload.expirationDate,
    nombre_completo_cliente: {
      firstName: payload.signerFirstName,
      lastName: payload.signerLastName,
    },
    nombre_completo_agente: {
      firstName: payload.agentFirstName,
      lastName: payload.agentLastName,
    },
    metodo_de_revocacion: "Escrito",
    numero_de_agente: payload.agentInsuranceNumber,
    telefono_de_agente: {
      num: payload.agentPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    correo_electronico_agente: payload.agentEmail,
    fecha_de_nacimiento_cliente: payload.signerBirthdate,
    numero_telefonico_cliente: {
      num: payload.signerPhoneNumber,
      region: "US",
      baseRegion: "US",
    },
    correo_electronico_cliente: payload.signerEmail,
    fecha_de_firma_cliente: payload.signatureDate,
  };
};
