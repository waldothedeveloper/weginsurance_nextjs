import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

import { RealUser } from "@/interfaces/index";
import { useRouter } from "next/router";

type VerifiedUserInfoAndStatus = {
  response?: string;
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
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      return response.json();
    } catch (error: unknown) {
      // console.log(error);
      throw new Error(error as unknown as string);
    }
  };
  const { data, error, isLoading } = useSWR(
    shouldFetch ? "/api/documents/verify_user" : null,
    fetcher
  );

  useEffect(() => {
    if (data && data.status !== 200 && !isLoading) {
      setShouldFetch(false);
      setUrlParamsErrors(
        `Lo sentimos, ha ocurrido un error inesperado: ${JSON.stringify(data)}`
      );
    }

    if (error) {
      setShouldFetch(false);
      setUrlParamsErrors(
        `Lo sentimos, ha ocurrido un error inesperado: ${JSON.stringify(error)}`
      );
    }

    if (data && data.status === 200 && !isLoading) {
      sessionStorage.setItem("user", JSON.stringify(data));
      setShouldFetch(false);
      router.push(`/sign_pdf/ready_for_signature`);
    }
  }, [data, isLoading, error, router]);

  return {
    userId,
    error,
    isLoading,
    urlParamsErrors,
    setShouldFetch,
  };
};
