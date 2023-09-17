// import Anvil from "@anvilco/anvil";
import type { NextApiResponse } from "next";
import { generateSignURL } from "@/components/documents/utils/generateSignURL";

export const handleResponse = async (
  response: any,
  id: string,
  res: NextApiResponse
) => {
  if (response.errors)
    return res
      .status(response.statusCode || 500)
      .json({ data: JSON.stringify(response.errors) });
  const signerEid =
    response?.data?.data?.createEtchPacket?.documentGroup?.signers[0]?.eid;

  if (signerEid && typeof signerEid === "string") {
    const { url, statusCode, errors } = await generateSignURL(signerEid, id);

    if (errors) {
      return res
        .status(statusCode || 500)
        .json({ data: JSON.stringify(errors) });
    }
    return res.status(statusCode || 200).json({ data: url as string });
  } else {
    return res.status(500).json({
      data: `There was an error trying to create the PDF package. SignerEid might be undefined: SignerEid is ${signerEid}`,
    });
  }
};
