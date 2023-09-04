import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { pdfDataTypes } from "@/interfaces/index";

export const saveDocumentPDFInfo = async (
  userId: string | undefined,
  data: pdfDataTypes
) => {
  if (!userId) return;

  const docRef = doc(db, "Users", userId);

  try {
    const res = await updateDoc(docRef, { pdfData: data });
    return res;
  } catch (error: any) {
    // console.log(
    //   `Error adding the PDF information to a the user's document: ${error}`
    // );
    return error;
  }
};
