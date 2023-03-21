import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { isValueAnObject } from "@/utils/isValueAnObject";

export const updateInsuranceCompany = async (company, docID) => {
  if (!company || !isValueAnObject(company))
    throw new Error(`A company must exist to be able to update it`);
  if (!docID) throw new Error(`A Firestore Document ID must exist!`);
  const companyRef = doc(db, "Insurance_Company", docID);
  const result = await updateDoc(companyRef, company);

  return result;
};
