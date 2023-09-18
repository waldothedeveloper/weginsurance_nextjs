import { PdfData, RealUser } from "@/interfaces/index";

export const createPDFEtchPackage = async (
  user: RealUser,
  pdfData: PdfData
) => {
  const res = await fetch("/api/documents/generate_pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pdfData: {
        language: pdfData.language === "Ingles" ? "en" : "es",
        agent: pdfData.agent.includes("Lorena") ? "female" : "male",
        date: pdfData.date,
      },
      user,
    }),
  });

  const { errors, signerEid, statusCode } = await res.json();

  return { errors, signerEid, statusCode };
};
