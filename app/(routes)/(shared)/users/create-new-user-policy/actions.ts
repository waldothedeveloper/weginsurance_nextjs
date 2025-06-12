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
    const parsed = JSON.parse(data);
    const result = stepsDataSchema.safeParse(parsed);

    if (!result.success) {
      console.error(
        "Validation on createUserRecord action failed:",
        result.error
      );
      throw new Error("Validation failed");
    }

    const validSteps: CreateNewUserPolicyMultiStepForm[] = result.data;

    const normalizedRecord = await normalizeRecord(validSteps);
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
