import type { NextApiRequest, NextApiResponse } from "next";

import { RealUser } from "@/interfaces/index";

type ResponseData = {
  //! the response type of data is NOT a string, this will change soon
  data: RealUser | string;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ data: {} as RealUser, status: 404 });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(500).json({
      data: `Error from verifyUser API: userId is: ${userId}`,
      status: 500,
    });
  }

  try {
    const response = await fetch(
      process.env.NODE_ENV === "development"
        ? "https://us-central1-weginsuranceinternal-90864.cloudfunctions.net/verifyUser"
        : "https://us-central1-weginsurance-production.cloudfunctions.net/verifyUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();

    if (data?.response === "User not found" && data?.status !== 200) {
      return res.status(404).json({ data, status: 404 });
    } else {
      return res.status(200).json({ data: data?.user, status: 200 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: `Error from verifyUser API: ${error}`,
      status: 500,
    });
  }
}
