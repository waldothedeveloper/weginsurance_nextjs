import { addDoc, collection } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { isValueAnObject } from "@/utils/isValueAnObject";

//
export const createInsuranceCompany = async (newCompany) => {
  if (!newCompany || !isValueAnObject(newCompany))
    throw new Error(
      `An insurance company object must exist so that it can be saved in the database`
    );
  const result = await addDoc(collection(db, "Insurance_Company"), newCompany);
  return result;
};
