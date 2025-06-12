import "server-only";

import { UserSchema } from "types/global";
import { createAvatarImage } from "./create-avatar";
import { currentUser } from "@clerk/nextjs/server";

// TODO: Make sure we're not adding the +1 on the phone numbers and we used a proper method from utils to format the phone numbers to the format Twilio expects

// Typing this is driving me crazy, so I'm leaving it as any for now
export const normalizeRecord = async (
  submittedData: CreateNewUserPolicyMultiStepForm[]
) => {
  console.log("submittedData: ", submittedData);
  const clerkUser = await currentUser();
  let normalizedRecord: Partial<UserSchema> = {};

  if (!clerkUser) {
    throw new Error(
      "Debe haber un usuario autenticado para normalizar el registro."
    );
  }

  // Pull out and default any nullable strings
  const {
    id: clerkID,
    firstName: clerkFirstName,
    lastName: clerkLastName,
  } = clerkUser;

  if (!submittedData || submittedData.length === 0) {
    throw new Error(
      "La información enviada sobre el usuario que trata de guardar está vacía."
    );
  }

  for (const record of submittedData) {
    // the first data object of record.data can never be empty
    if (record.id === 0 && !record.data) {
      throw new Error(
        "El primer objeto de datos del usuario principal está vacío. Verifique la información y vuelva a intentarlo."
      );
    }

    // the first data object record is the principal user
    if (record.id === 0 && Object.keys(record.data).length > 0) {
      normalizedRecord = {
        activeRecord: true,
        created: new Date(),
        updated: null,
        createdBy: {
          clerkID,
          firstName: clerkFirstName ?? "",
          lastName: clerkLastName ?? "",
        },
        updatedBy: null,
        updates: 1,
        user: {
          personal_info: {
            firstname: record.data.firstname || "",
            secondName: record.data.second_name || "",
            lastname: record.data.lastname || "",
            secondLastname: record.data.second_lastname || "",
            email: record.data.email || "",
            phone: record.data.phone ? `+1${record.data.phone}` : "",
            birthdate: record.data.birthdate || "",
            age: record.data.age || 0,
            notes: record.data.notes || "",
            gender: record.data.gender || "Masculino",
            avatar: createAvatarImage(record.data),
          },
          legal_info: {
            legalStatus: record.data.legal_status || "",
            legalStatusNotes: record.data.legal_status_notes || "",
          },
          address: {
            streetAddress: record.data.street_address || "",
            city: record.data.city || "",
            state: record.data.state || "",
            postalCode: record.data.postal_code || "",
          },

          insurance_info: {
            policyNumber: record.data.insurance_policy_number || "",
            policyStartDate: record.data.policy_start_date || "",
            insuranceCompany: record.data.insurance_company || "",
            planType: record.data.insurance_plan_type || "",
            policyAmount: record.data.prima || "0",
            accepts_insurance: record.data.accepts_insurance!,
          },
          employment_info: {
            employment_type: record.data.work_type || "",
            employerName: record.data.company_name || "",
            income: record.data.wages || "0",
          },
        },
      };
    }

    // the second data object record is the spouse
    if (record.id === 1 && Object.keys(record.data).length > 0) {
      normalizedRecord = {
        ...normalizedRecord,
        spouse: {
          personal_info: {
            firstname: record.data.firstname || "",
            secondName: record.data.second_name || "",
            lastname: record.data.lastname || "",
            secondLastname: record.data.second_lastname || "",
            email: record.data.email || "",
            phone: record.data.phone ? `+1${record.data.phone}` : "",
            birthdate: record.data.birthdate || "",
            age: record.data.age || 0,
            notes: record.data.notes || "",
            gender: record.data.gender || "Masculino",
            avatar: createAvatarImage(record.data),
          },
          legal_info: {
            legalStatus: record.data.legal_status || "",
            legalStatusNotes: record.data.legal_status_notes || "",
          },
          address: {
            streetAddress: record.data.street_address || "",
            city: record.data.city || "",
            state: record.data.state || "",
            postalCode: record.data.postal_code || "",
          },
          insurance_info: {
            policyNumber: record.data.insurance_policy_number || "",
            policyStartDate: record.data.policy_start_date || "",
            insuranceCompany: record.data.insurance_company || "",
            planType: record.data.insurance_plan_type || "",
            policyAmount: record.data.prima || "0",
            accepts_insurance: record.data.accepts_insurance!,
          },
          employment_info: {
            employment_type: record.data.work_type || "",
            employerName: record.data.company_name || "",
            income: record.data.wages || "0",
          },
        },
      };
    }

    // rest of the data objects are dependants
    if (record.id >= 2 && Object.keys(record.data).length > 0) {
      normalizedRecord = {
        ...normalizedRecord,
        dependants: [
          ...(normalizedRecord.dependants ?? []),
          {
            personal_info: {
              firstname: record.data.firstname || "",
              secondName: record.data.second_name || "",
              lastname: record.data.lastname || "",
              secondLastname: record.data.second_lastname || "",
              email: record.data.email || "",
              phone: record.data.phone ? `+1${record.data.phone}` : "",
              gender: record.data.gender || "Masculino",
              birthdate: record.data.birthdate || "",
              age: record.data.age || 0,
              notes: record.data.notes || "",
              avatar: createAvatarImage(record.data),
            },
            legal_info: {
              legalStatus: record.data.legal_status || "",
              legalStatusNotes: record.data.legal_status_notes || "",
            },
            address: {
              streetAddress: record.data.street_address || "",
              city: record.data.city || "",
              state: record.data.state || "",
              postalCode: record.data.postal_code || "",
            },

            insurance_info: {
              policyNumber: record.data.insurance_policy_number || "",
              policyStartDate: record.data.policy_start_date || "",
              insuranceCompany: record.data.insurance_company || "",
              planType: record.data.insurance_plan_type || "",
              policyAmount: record.data.prima || "0",
              accepts_insurance: record.data.accepts_insurance!,
            },
            employment_info: {
              employment_type: record.data.work_type || "",
              employerName: record.data.company_name || "",
              income: record.data.wages || "0",
            },
          },
        ],
      };
    }
  }

  return normalizedRecord as UserSchema;
};
