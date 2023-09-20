import { PDFTemplate, languageDependentPayload } from "@/interfaces/index";

export const pdfTemplate = (
  key: string,
  title: string,
  templateId: string,
  signerFullname: string,
  signerEmail: string,
  userSignatureFieldId: string,
  signaturePageOptions: { [key: string]: any } | null,
  // this could be either spanishPayload or englishPayload helper functions
  templatePayload: languageDependentPayload
): PDFTemplate => {
  // this means this is the SPANISH version of the PDF template
  if (signaturePageOptions) {
    return {
      // Indicate the packet is all ready to send to the
      // signers. An email will be sent to the first signer.
      isDraft: false,

      // Test packets will use development signatures and
      // not count toward your billed packets
      isTest: process.env.NODE_ENV === "development" ? true : false,
      files: [
        {
          // Our ID we will use to reference and fill it with data.
          // It can be any string you want!
          id: key,

          // The id to the ready-made sample template. Fields and their ids are
          // specified when building out the template in the UI.
          // the PDF Template ID papo <- (cuban word), the one that says PDF Template ID / Cast EID, this one is different for each PDF.
          castEid: templateId,
        },
      ],

      data: {
        // This data will fill the PDF before it's sent to any signers.
        // IDs here were set up on each field while templatizing the PDF.
        payloads: {
          // 'key' is the sample template ID specified above
          [key]: {
            title,
            fontSize: 12,
            textColor: "#333333",
            data: templatePayload,
          },
        },
      },
      signaturePageOptions,
      signers: [
        // Signers will sign in the order they are specified in this array.
        {
          id: "signer1",
          name: signerFullname,
          email:
            process.env.NODE_ENV === "development"
              ? (process.env.WEG_INTERNAL_EMAIL as string)
              : (process.env.LORENA_EMAIL as string),
          signerType: "embedded",

          // These fields will be presented when this signer signs.
          // The signer will need to click through the signatures in
          // the order of this array.
          fields: [
            {
              // File IDs are specified in the `files` property above
              fileId: key,
              //! this last fieldID is the signature field, do NOT remove or change it
              fieldId: userSignatureFieldId,
            },
          ],
        },
      ],
    };
  } else {
    return {
      // Indicate the packet is all ready to send to the
      // signers. An email will be sent to the first signer.
      isDraft: false,

      // Test packets will use development signatures and
      // not count toward your billed packets
      isTest: process.env.NODE_ENV === "development" ? true : false,
      files: [
        {
          // Our ID we will use to reference and fill it with data.
          // It can be any string you want!
          id: key,

          // The id to the ready-made sample template. Fields and their ids are
          // specified when building out the template in the UI.
          // the PDF Template ID papo <- (cuban word), the one that says PDF Template ID / Cast EID, this one is different for each PDF.
          castEid: templateId,
        },
      ],
      data: {
        // This data will fill the PDF before it's sent to any signers.
        // IDs here were set up on each field while templatizing the PDF.
        payloads: {
          // 'key' is the sample template ID specified above
          [key]: {
            title,
            fontSize: 12,
            textColor: "#333333",
            data: templatePayload,
          },
        },
      },
      signers: [
        // Signers will sign in the order they are specified in this array.
        {
          id: "signer1",
          name: signerFullname,
          email:
            process.env.NODE_ENV === "development"
              ? (process.env.WEG_INTERNAL_EMAIL as string)
              : (process.env.LORENA_EMAIL as string),
          signerType: "embedded",

          // These fields will be presented when this signer signs.
          // The signer will need to click through the signatures in
          // the order of this array.
          fields: [
            {
              // File IDs are specified in the `files` property above
              fileId: key,
              //! this last fieldID is the signature field, do NOT remove or change it
              fieldId: userSignatureFieldId,
            },
          ],
        },
      ],
    };
  }
};
