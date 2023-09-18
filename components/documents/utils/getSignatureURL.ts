import { Fetcher } from "swr";

type VerifiedUserInfoAndStatus = {
  url?: string;
  errors: unknown;
  statusCode: number;
};

export const getSignatureURL: Fetcher<
  VerifiedUserInfoAndStatus,
  string[]
> = async (args) => {
  const [url, userId, signerEid] = args;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, signerEid }),
    });
    return response.json();
  } catch (error: unknown) {
    // console.log(error);
    throw new Error(error as unknown as string);
  }
};
