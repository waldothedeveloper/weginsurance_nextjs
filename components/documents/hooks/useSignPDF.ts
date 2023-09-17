import { RealUser } from "interfaces/index";
import { signURL } from "@/lib/state/atoms";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { useState } from "react";
//
export const useSignPDF = (user: RealUser | null) => {
  const router = useRouter();
  const setsignURL = useSetAtom(signURL);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  //
  const createSignaturePDFPackage = async (pdfData: RealUser) => {
    setIsLoading(true);
    try {
      if (!pdfData)
        return new Error(
          "No se ha encontrado la informacion del PDF en el usuario seleccionado"
        );
      const response = await fetch("/api/documents/sign_pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pdfData),
      });
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error: unknown | any) {
      setError(error as Error);
      setIsLoading(false);
      throw new Error(error);
    }
  };

  //
  const generateSignURL = async () => {
    setIsLoading(true);
    try {
      if (user && user?.pdfData) {
        const pdfSignURL = await createSignaturePDFPackage(user);
        const data = pdfSignURL;
        console.log("data?: ", data);

        const { url, statusCode, errors } = data;

        if (errors || statusCode !== 200) {
          setIsLoading(false);
          throw new Error(errors);
        }

        if (url && url.includes("https://app.useanvil.com/api/etch/verify")) {
          setsignURL(url);
          setIsLoading(false);
          router.push("/sign_pdf/embed_signature");
        }
      } else {
        throw new Error("No user or pdfData");
      }
    } catch (error) {
      console.error(error as Error);
      setIsLoading(false);
      return error;
    }
  };

  return { generateSignURL, isLoading, error };
};