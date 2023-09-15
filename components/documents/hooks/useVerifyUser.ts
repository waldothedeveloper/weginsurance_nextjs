import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

import { RealUser } from "@/interfaces/index";
import { useRouter } from "next/router";

type VerifiedUserInfoAndStatus = {
  user: RealUser;
  status: number;
};

export const useVerifyUser = () => {
  const router = useRouter();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [urlParamsErrors, setUrlParamsErrors] = useState<string | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const userId = params.get("userId");

    if (userId && userId.length > 0) {
      setUserId(userId);
    } else {
      setUrlParamsErrors(
        "Lo sentimos, ha ocurrido un error inesperado. Cierre esta ventana e intente abrir el enlace nuevamente desde el mensaje que recibió."
      );
    }

    return () => {
      setUserId(null);
      setUrlParamsErrors(null);
      setShouldFetch(false);
    };
  }, []);

  const fetcher: Fetcher<VerifiedUserInfoAndStatus, string> = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  };

  // call the http callable Firebase cloud function to verify the user's phone number
  // respond with error if user phone doesn't match
  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? process.env.NODE_ENV === "development"
        ? "http://localhost:5001/weginsuranceinternal-90864/us-central1/verifyUser"
        : "https://us-central1-weginsurance-production.cloudfunctions.net/verifyUser"
      : null,
    fetcher
  );

  useEffect(() => {
    if (data && data.status !== 200 && !isLoading) {
      setShouldFetch(false);
      setUrlParamsErrors(
        "Lo sentimos, ha ocurrido un error inesperado. Por favor contactenos para ayudarle a resolver el problema."
      );
    }

    if (error) {
      setShouldFetch(false);
      setUrlParamsErrors(
        "Lo sentimos, ha ocurrido un error inesperado. Por favor contactenos para ayudarle a resolver el problema."
      );
    }

    if (data && data.status === 200 && !isLoading) {
      sessionStorage.setItem("user", JSON.stringify(data?.user));
      router.push(`/sign_pdf/ready_for_signature`);
    }
  }, [data, isLoading, error, router]);

  return {
    error,
    isLoading,
    urlParamsErrors,
    setShouldFetch,
  };
};
