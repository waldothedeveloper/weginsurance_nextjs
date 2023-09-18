import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";
import { pdfDataTypes } from "@/interfaces/index";

export const saveDocumentPDFInfo = async (
  userId: string | undefined,
  data: pdfDataTypes,
  signerEid: string
) => {
  if (!userId || !signerEid) {
    throw new Error(
      ` userId and signerEid is required. UserId is: ${userId}. SignerEid is ${signerEid}`
    );
  }

  const docRef = doc(db, "Users", userId);

  try {
    const res = await updateDoc(docRef, {
      pdfData: {
        language: data.language === "Ingles" ? "en" : "es",
        agent: data.agent.includes("Lorena") ? "female" : "male",
        date: data.date,
        signerEid: signerEid,
      },
    });
    return res;
  } catch (error: any) {
    return error;
  }
};
