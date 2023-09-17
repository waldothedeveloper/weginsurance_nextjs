import Anvil from "@anvilco/anvil";
import type { NextApiResponse } from "next";
import { generateSignURL } from "@/components/documents/utils/generateSignURL";
import { signURLResponse } from "@/interfaces/index";

export const handleResponse = async (
  response: Anvil.GraphQLResponse,
  id: string,
  res: NextApiResponse
): Promise<signURLResponse | void> => {
  if (response.errors)
    return res
      .status(response.statusCode || 500)
      .json({ data: JSON.stringify(response.errors) });

  //
  const signerEid =
    response?.data?.data?.createEtchPacket?.documentGroup?.signers[0]?.eid;

  if (signerEid && typeof signerEid === "string") {
    const { url, statusCode, errors } = await generateSignURL(signerEid, id);

    if (errors) {
      return res.status(statusCode || 500).json({ url, errors, statusCode });
    }

    return res.status(statusCode || 200).json({ url, errors, statusCode });
  } else {
    return res.status(500).json({
      errors: `There was an error trying to create the PDF package. SignerEid might be undefined: SignerEid is ${signerEid}`,
      statusCode: 500,
      url: null,
    });
  }
};
