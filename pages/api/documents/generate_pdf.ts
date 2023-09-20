import type { NextApiRequest, NextApiResponse } from "next";
import { RealUser, pdfDataTypes } from "@/interfaces/index";

import { englishPayload } from "@/components/documents/utils/englishPayload";
import { generatePDFPackage } from "@/components/documents/utils/generatePDFPackage";
import { generatePayload } from "@/components/documents/utils/generatePayload";
// import { handleResponse } from "@/components/documents/utils/handleResponse";
import { provideLanguagePayload } from "@/components/documents/utils/provideLanguagePayload";
import { provideSignaturePageOptions } from "@/components/documents/utils/provideSignaturePageOptions";
import { signURLResponse } from "@/interfaces/index";
import { signerSignatureDate } from "@/components/documents/utils/signerSignatureDate";
import { spanishPayload } from "@/components/documents/utils/spanishPayload";

const spanishPDFTemplateEid = "J84wYQcf53GOhAtpqHPp";
const englishPDFTemplateEid = "vZKJ62lvfb7tKiGbwXE9";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<signURLResponse | void> {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ signerEid: null, errors: "Method not allowed", statusCode: 404 });
  }

  const { user, pdfData }: { user: RealUser; pdfData: pdfDataTypes } = req.body;
  if (!pdfData || !user) {
    return res.status(500).json({
      errors: `We could not retreive the user or pdfData from the request body. user is ${user} and pdfData is ${pdfData}`,
      statusCode: 500,
      signerEid: null,
    });
  }

  const signatureDate = signerSignatureDate();
  const languagePayload = provideLanguagePayload(signatureDate, user, pdfData);
  let etchPackagePayload;

  // spanish template version
  if (pdfData?.language === "es") {
    etchPackagePayload = generatePayload(
      "spanish_es",
      "Formulario De Consentimiento Para Agentes Y Corredores Del Mercado De Salud",
      spanishPDFTemplateEid,
      user.fullname,
      user.email,
      // this is the ID of the field that is connected to the user who will be signing the PDF
      "firma_del_cliente",
      provideSignaturePageOptions(),
      spanishPayload(languagePayload)
    );
  } else {
    // english template version
    etchPackagePayload = generatePayload(
      "english_en",
      "Consent Form For Market Place Agents And Brokers",
      englishPDFTemplateEid,
      user.fullname,
      user.email,
      // this is the ID of the field that is connected to the user who will be signing the PDF
      "signer_signature",
      null,
      englishPayload(languagePayload)
    );
  }

  const response = await generatePDFPackage(etchPackagePayload);

  const { errors, statusCode, data } = response;
  const signerEid =
    data?.data?.createEtchPacket?.documentGroup?.signers[0]?.eid;

  if (errors) {
    return res
      .status(statusCode || 500)
      .json({ signerEid, errors, statusCode });
  }

  return res.status(200).json({
    errors: errors,
    statusCode: statusCode,
    signerEid: signerEid,
  });
  // return handleResponse(response, id, res);
}
