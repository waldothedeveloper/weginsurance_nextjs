import Anvil from "@anvilco/anvil";
import { PDFTemplate } from "@/interfaces/index";
import { anvilClient } from "@/components/documents/utils/anvilClient";

//
export const generatePDFPackage = async (
  variables: PDFTemplate
): Promise<Anvil.GraphQLResponse> => {
  try {
    const { statusCode, data, errors } = await anvilClient.createEtchPacket({
      variables,
    });

    if (errors) {
      // Note: because of the nature of GraphQL, statusCode may be a 200 even when
      // there are errors.
      return { errors, statusCode, data };
    } else {
      return {
        statusCode,
        errors,
        data,
      };
    }
  } catch (error) {
    // @ts-ignore
    return { errors: error, statusCode: 500, data: null };
  }
};
