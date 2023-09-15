import type { NextApiRequest, NextApiResponse } from "next";
import { PDFTemplate, RealUser } from "@/interfaces/index";

import Anvil from "@anvilco/anvil";
import { englishPayload } from "@/components/documents/utils/englishPayload";
import { pdfTemplate } from "@/components/documents/utils/pdfTemplate";
import { provideLanguagePayload } from "@/components/documents/utils/provideLanguagePayload";
import { provideSignaturePageOptions } from "@/components/documents/utils/provideSignaturePageOptions";
import { signerSignatureDate } from "@/components/documents/utils/signerSignatureDate";
import { spanishPayload } from "@/components/documents/utils/spanishPayload";

const spanishPDFTemplateEid = "WdtAnWi5zn4kvrasJfh6";
const englishPDFTemplateEid = "FpD3DJTgR9X2fkJ3hCXE";

type ResponseData = {
  //! the response type of data is NOT a string, this will change soon
  data: string;
};

const anvilClient = new Anvil({
  apiKey:
    process.env.NODE_ENV === "development"
      ? process.env.ANVIL_DEVELOPMENT
      : process.env.ANVIL_PRODUCTION,
});

const generatePDFPackage = async (
  variables: PDFTemplate
): Promise<Anvil.GraphQLResponse> => {
  try {
    const { statusCode, data, errors } = await anvilClient.createEtchPacket({
      variables,
    });
    if (errors) {
      // Note: because of the nature of GraphQL, statusCode may be a 200 even when
      // there are errors.
      return { errors, statusCode };
    } else {
      const packetDetails = data?.data?.createEtchPacket;
      // After creating the etch packet, we need the ID to create the sign URL that will have the token
      return {
        statusCode,
        errors,
        data: packetDetails?.documentGroup?.signers[0]?.eid,
      };
    }
  } catch (error: Anvil.GraphQLResponse | any) {
    return { errors: error, statusCode: 500 };
  }
};

const generateSignURL = async (signerEid: string, userId: string) => {
  const { statusCode, url, errors } = await anvilClient.generateEtchSignUrl({
    variables: {
      signerEid,
      clientUserId: userId,
    },
  });

  if (errors) {
    // Note: because of the nature of GraphQL, statusCode may be a 200 even when
    // there are errors.
    return { errors, statusCode, url };
  } else {
    return { url, statusCode, errors };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
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

  // pass the spanish template
  if (pdfData?.language === "es") {
    const etchPackagePayload = pdfTemplate(
      "spanish_es",
      "Formulario De Consentimiento Para Agentes Y Corredores Del Mercado De Salud",
      spanishPDFTemplateEid,
      fullname,
      email,
      "cast122583e0228411ee9a08d17f33fdcf3c",
      provideSignaturePageOptions(),
      spanishPayload(provideLanguagePayload(signerSignatureDate(), req.body))
    );

    const response = await generatePDFPackage(etchPackagePayload);

    if (response.errors)
      return res
        .status(response.statusCode || 500)
        .json({ data: JSON.stringify(response.errors) });

    if (typeof response?.data === "string") {
      // get the eid from the data prop and pass it to create the embedded sign url
      const { url, statusCode, errors } = await generateSignURL(
        response.data,
        id
      );

      if (errors) {
        return res
          .status(statusCode || 500)
          .json({ data: JSON.stringify(errors) });
      }
      return res.status(statusCode || 200).json({ data: url as string });
    }

    // need to think what to do here if the response.data is not a string
    return res
      .status(500)
      .json({ data: "Error from sign pdf API SPANISH VERSION" });
  } else {
    // pass the english template
    // getPacketVariables defines de how the pdf will be filled, who will be the signers, etc
    const etchPackagePayload = pdfTemplate(
      "english_en",
      "Consent Form For Market Place Agents And Brokers",
      englishPDFTemplateEid,
      fullname,
      email,
      "cast300bf580228c11ee9a08d17f33fdcf3c",
      null,
      englishPayload(provideLanguagePayload(signerSignatureDate(), req.body))
    );

    const response = await generatePDFPackage(etchPackagePayload);

    if (response.errors)
      return res
        .status(response.statusCode || 500)
        .json({ data: JSON.stringify(response.errors) });

    if (typeof response?.data === "string") {
      // get the eid from the data prop and pass it to create the embedded sign url
      const { url, statusCode, errors } = await generateSignURL(
        response.data,
        id
      );

      if (errors) {
        return res
          .status(statusCode || 500)
          .json({ data: JSON.stringify(errors) });
      }
      return res.status(statusCode || 200).json({ data: url as string });
    }

    // need to think what to do here if the response.data is not a string
    return res
      .status(500)
      .json({ data: "Error from sign pdf API English VERSION" });
  }
}
