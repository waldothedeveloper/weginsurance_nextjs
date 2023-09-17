import {
  InternationalizationPDFTemplate,
  languageDependentPayload,
} from "@/interfaces/index";

import { pdfTemplate } from "@/components/documents/utils/pdfTemplate";

export const generatePayload = (
  language: string,
  title: string,
  templateEid: string,
  fullname: string,
  email: string,
  cast: string,
  options: InternationalizationPDFTemplate | null,
  payload: languageDependentPayload
) => {
  return pdfTemplate(
    language,
    title,
    templateEid,
    fullname,
    email,
    cast,
    options,
    payload
  );
};
