import { useEffect, useState } from "react";

import { getSignatureURL } from "@/components/documents/utils/getSignatureURL";
import { signURL } from "@/lib/state/atoms";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSetAtom } from "jotai";

export const useGenerateSignatureURL = () => {
  const setURLSignature = useSetAtom(signURL);
  const router = useRouter();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [signerEid, setSignerEid] = useState<string | null>(null);
  const [urlParamsErrors, setUrlParamsErrors] = useState<string | null>(null);

  useEffect(() => {
    const url = window?.location?.href;
    const params = new URLSearchParams(new URL(url).search);
    const userId = params.get("userId");
    const signerEid = params.get("signerEid");

    if (userId && userId.length > 0 && signerEid && signerEid.length > 0) {
      setUserId(userId);
      setSignerEid(signerEid);
    } else {
      setUrlParamsErrors(
        "Lo sentimos, ha ocurrido un error inesperado. Cierre esta ventana e intente abrir el enlace nuevamente desde el mensaje que recibió."
      );
    }

    return () => {
      setUserId(null);
      setSignerEid(null);
      setUrlParamsErrors(null);
      setShouldFetch(false);
    };
  }, []);
  const { error, isLoading, isValidating } = useSWR(
    shouldFetch
      ? ["/api/documents/generate_signature_iframe", userId, signerEid]
      : null,
    getSignatureURL,
    {
      onSuccess: (data) => {
        if (data?.url) {
          setShouldFetch(false);
          setURLSignature(data?.url);
          router.push(`/sign_pdf/embed_signature`);
        }

        if (data?.statusCode !== 200 || data?.errors) {
          console.log("errors data: ", data?.errors);
          setShouldFetch(false);
          // most likely Signer already signed the document
          if (Array.isArray(data?.errors) && data?.errors[0].message) {
            setUrlParamsErrors(
              `Lo sentimos, ha ocurrido un error inesperado. Error: ${data?.errors[0].message}`
            );
          } else {
            setUrlParamsErrors(
              `Lo sentimos, ha ocurrido un error inesperado. Error: ${JSON.stringify(
                data?.errors,
                null,
                2
              )}`
            );
          }
        }
      },
      onError: (err) => {
        setShouldFetch(false);
        setUrlParamsErrors(
          `Lo sentimos, ha ocurrido un error inesperado, Error: ${JSON.stringify(
            err,
            null,
            2
          )}`
        );
      },
      onLoadingSlow: () => {
        setUrlParamsErrors(
          "Vaya, esto esta demorando mas tiempo del esperado. Cierre esta ventana y vuelva a intentarlo mas tarde si no desea seguir esperando."
        );
      },
    }
  );

  return {
    userId,
    error,
    isLoading,
    isValidating,
    urlParamsErrors,
    setShouldFetch,
  };
};
