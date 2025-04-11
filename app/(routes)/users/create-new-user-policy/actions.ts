"use server";

import { stepsDataSchema } from "./schemas/stepsDataSchema";
export async function createOrUpdateUserAccount(data: string) {
  try {
    const parsedData = JSON.parse(data);
    // Validate the parsed data against the schema
    const result = stepsDataSchema.safeParse(parsedData);

    if (!result.success) {
      console.error("Validation failed:", result.error);
      throw new Error("Validation failed");
    }

    return result;
  } catch (error) {
    console.error("Error creating/updating user account:", error);
    throw error;
  }
}
