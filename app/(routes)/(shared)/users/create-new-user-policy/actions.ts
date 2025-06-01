"use server";

import { createFirebaseUser } from "@/_lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/_lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import { normalizeRecord } from "@/appUtils/normalizeRecord";
import { stepsDataSchema } from "./schemas/stepsDataSchema";

//
export async function createUserRecord(data: string) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  try {
    const parsedData: CreateNewUserPolicyMultiStepForm[] = JSON.parse(data);
    // Validate the parsed data against the schema
    const result = stepsDataSchema.safeParse(parsedData);

    if (!result.success) {
      console.error("Validation failed:", result.error);
      throw new Error("Validation failed");
    }

    const normalizedRecord = await normalizeRecord(result);
    const dbResult = await createFirebaseUser(normalizedRecord, db);

    if (!dbResult) {
      throw new Error("Failed to create or update user account in Firestore.");
    }
    return dbResult;
  } catch (error) {
    console.error("Error creating/updating user account:", error);
    throw error;
  }
}
