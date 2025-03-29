"use server";

// import { stepsDataSchema } from "./schemas/stepsDataSchema";

export async function createOrUpdateUserAccount(
  data: CreateNewUserPolicyMultiStepForm[]
) {
  console.log("data on the server action: ", data);
  return data;
}
