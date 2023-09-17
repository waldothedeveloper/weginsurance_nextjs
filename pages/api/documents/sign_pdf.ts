import type { NextApiRequest, NextApiResponse } from "next";

import { RealUser } from "@/interfaces/index";
import { englishPayload } from "@/components/documents/utils/englishPayload";
import { generatePDFPackage } from "@/components/documents/utils/generatePDFPackage";
import { generatePayload } from "@/components/documents/utils/generatePayload";
import { handleResponse } from "@/components/documents/utils/handleResponse";
import { provideLanguagePayload } from "@/components/documents/utils/provideLanguagePayload";
import { provideSignaturePageOptions } from "@/components/documents/utils/provideSignaturePageOptions";
import { signerSignatureDate } from "@/components/documents/utils/signerSignatureDate";
import { spanishPayload } from "@/components/documents/utils/spanishPayload";

const spanishPDFTemplateEid = "WdtAnWi5zn4kvrasJfh6";
const englishPDFTemplateEid = "FpD3DJTgR9X2fkJ3hCXE";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ data: "This endpoint requires a POST request!" });
  }

  const { firstname, lastname, fullname, email, pdfData, phone, id }: RealUser =
    req.body;
  if (!pdfData || !firstname || !lastname || !fullname || !phone || !id) {
    return res.status(500).json({
      data: `Error from sign pdf API: pdfData is ${pdfData}`,
    });
  }

  const signatureDate = signerSignatureDate();
  const languagePayload = provideLanguagePayload(signatureDate, req.body);
  let etchPackagePayload;

  // spanish template version
  if (pdfData?.language === "es") {
    etchPackagePayload = generatePayload(
      "spanish_es",
      "Formulario De Consentimiento Para Agentes Y Corredores Del Mercado De Salud",
      spanishPDFTemplateEid,
      fullname,
      email,
      "cast122583e0228411ee9a08d17f33fdcf3c",
      provideSignaturePageOptions(),
      spanishPayload(languagePayload)
    );
  } else {
    // english template version
    etchPackagePayload = generatePayload(
      "english_en",
      "Consent Form For Market Place Agents And Brokers",
      englishPDFTemplateEid,
      fullname,
      email,
      "cast300bf580228c11ee9a08d17f33fdcf3c",
      null,
      englishPayload(languagePayload)
    );
  }

  const response = await generatePDFPackage(etchPackagePayload);
  return handleResponse(response, id, res);
}
