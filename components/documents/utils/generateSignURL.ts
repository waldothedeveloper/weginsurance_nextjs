import { anvilClient } from "@/components/documents/utils/anvilClient";

export const generateSignURL = async (signerEid: string, userId: string) => {
  //
  const { statusCode, url, errors } = await anvilClient.generateEtchSignUrl({
    variables: {
      signerEid,
      clientUserId: userId,
    },
  });

  if (errors) {
    // Note: because of the nature of GraphQL, statusCode may be a 200 even when
    // there are errors.
    return { errors, statusCode, url: null };
  } else {
    const finalURL = `${url}&withinIframe=true`;
    return { url: finalURL, statusCode, errors };
  }
};
