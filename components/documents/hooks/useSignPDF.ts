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
    try {
      setIsLoading(true);
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
    } catch (error) {
      setError(error as Error);
      return error;
    }
  };

  //
  const generateSignURL = async () => {
    try {
      setIsLoading(true);
      if (user && user?.pdfData) {
        const pdfSignURL = await createSignaturePDFPackage(user);
        const { data } = pdfSignURL;
        setsignURL(data);
        setIsLoading(false);
        return router.push(`/sign_pdf/embed_signature`);
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
