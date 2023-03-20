import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

export const deleteInsuranceCompany = async (documentId) => {
  if (!documentId)
    throw new Error(
      `An insurance company object must exist so that it can be saved in the database`
    );
  const company = await deleteDoc(doc(db, "Insurance_Company", documentId));

  return company;
};
