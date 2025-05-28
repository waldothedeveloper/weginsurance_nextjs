import "server-only";

import { UserSchema } from "types/global";
import { currentUser } from "@clerk/nextjs/server";

// Typing this is driving me crazy, so I'm leaving it as any for now
export const normalizeRecord = async (submittedData: any) => {
  console.log("submittedData: ", submittedData);
  const clerkUser = await currentUser();
  const { data } = submittedData;
  let normalizedRecord: Partial<UserSchema> = {};

  if (!clerkUser) {
    throw new Error(
      "There must be a user logged in to create a new user record."
    );
  }

  // Pull out and default any nullable strings
  const {
    id: clerkID,
    firstName: clerkFirstName,
    lastName: clerkLastName,
  } = clerkUser;

  if (!data || data.length === 0) {
    throw new Error(
      "No data found in the submitted data record. Verify the information and try again."
    );
  }

  for (const record of data) {
    // the first data object of record.data can never be empty
    if (record.id === 0 && !record.data) {
      throw new Error(
        "The first data object of record.data is empty. Verify the information and try again."
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
            phone: `+1${record.data.phone}` || "",
            birthdate: record.data.birthdate || "",
            age: record.data.age || 0,
            notes: record.data.notes || "",
          },
          legal_info: {
            legalStatus: record.data.legal_status!,
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
          },
          employment_info: {
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
            phone: record.data.phone || "",
            birthdate: record.data.birthdate || "",
            age: record.data.age || 0,
            notes: record.data.notes || "",
          },
          legal_info: {
            legalStatus: record.data.legal_status!,
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
          },
          employment_info: {
            employerName: record.data.company_name || "",
            income: record.data.wages || "0",
          },
        },
      };
    }

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
              phone: record.data.phone || "",

              birthdate: record.data.birthdate || "",
              age: record.data.age || 0,
              notes: record.data.notes || "",
            },
            legal_info: {
              legalStatus: record.data.legal_status!,
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
            },
            employment_info: {
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
