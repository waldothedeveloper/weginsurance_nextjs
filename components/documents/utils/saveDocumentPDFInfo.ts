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
    const res = await updateDoc(docRef, {
      pdfData: {
        language: data.language === "Ingles" ? "en" : "es",
        agent: data.agent.includes("Lorena") ? "female" : "male",
        date: data.date,
      },
    });
    return res;
  } catch (error: any) {
    return error;
  }
};
