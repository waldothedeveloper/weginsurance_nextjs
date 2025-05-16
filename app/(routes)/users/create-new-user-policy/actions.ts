"use server";

import { createFirebaseUser } from "@/_lib/firebase/firestore";
import { currentUser } from "@clerk/nextjs/server";
import { getAuthenticatedAppForUser } from "@/_lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import { stepsDataSchema } from "./schemas/stepsDataSchema";

//
export async function createOrUpdateUserAccount(data: string) {
  const clerkUser = await currentUser();
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  try {
    const parsedData = JSON.parse(data);
    // Validate the parsed data against the schema
    const result = stepsDataSchema.safeParse(parsedData);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      throw new Error("Validation failed");
    }

    const [principalUser, ...rest] = result.data;
    const userData = principalUser.data;
    userData.phone = `+1${userData.phone}`;
    // console.log("Creating new user account...");
    // Create a new user account
    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      createdBy: {
        id: clerkUser?.id,
        firstName: clerkUser?.firstName,
        lastName: clerkUser?.lastName,
      },
      updatedBy: null,
    };

    // console.log("New user data:", newUser);
    // Add the new user to the database
    const dbResult = await createFirebaseUser(newUser, db);
    // console.log("New user account created successfully.", dbResult);

    return result;
  } catch (error) {
    console.error("Error creating/updating user account:", error);
    throw error;
  }
}
