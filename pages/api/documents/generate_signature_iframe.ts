import type { NextApiRequest, NextApiResponse } from "next";

import { generateSignURL } from "@/components/documents/utils/generateSignURL";

//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ signerEid: null, errors: "Method not allowed", statusCode: 404 });
  }

  const { signerEid, id } = req.body;

  if (!signerEid || !id) {
    return res.status(500).json({
      errors: `We could not retreive the signerEid or id from the request body. signerEid is ${signerEid} and id is ${id}`,
      statusCode: 500,
      signerEid: null,
    });
  }

  const { url, statusCode, errors } = await generateSignURL(signerEid, id);

  if (errors) {
    return res.status(statusCode || 500).json({ url, errors, statusCode });
  }

  return res.status(statusCode || 200).json({ url, errors, statusCode });
}
