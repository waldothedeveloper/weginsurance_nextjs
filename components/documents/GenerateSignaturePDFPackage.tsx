import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

import { CompanyHelpInformationModal } from "@/components/CompanyHelpInformationModal";
import { useGenerateSignatureURL } from "@/components/documents/hooks/useGenerateSignatureURL";
import { Header } from "@/components/Header";
import { useCompanyHelpInformation } from "@/hooks/useCompanyHelpInformation";
import Image from "next/image";

//
export const GenerateSignaturePDFPackage = () => {
  const { setShouldFetch, error, isLoading, isValidating, urlParamsErrors } =
    useGenerateSignatureURL();

  const { openCompanyHelpModal, setOpenCompanyHelpModal } =
    useCompanyHelpInformation();

  return (
    <>
      <div className="bg-white overflow-hidden">
        <Header />
        <div className="relative isolate overflow-hidden bg-linear-to-b from-blue-100/20">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent sm:text-6xl lg:col-span-2 xl:col-auto">
                Firma tus documentos de seguro con Weg Insurance
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-slate-600">
                  Hemos recibido la información necesaria a través del enlace
                  que usted recibió. Por favor, haga clic en el botón de abajo
                  para firmar su documento de seguro con Weg Insurance.
                  <br />
                </p>
                <div className="mt-10 flex items-center justify-start gap-x-6">
                  <button
                    disabled={
                      Boolean(urlParamsErrors) || isLoading || isValidating
                    }
                    onClick={() => setShouldFetch(true)}
                    className={
                      isLoading || urlParamsErrors || isValidating
                        ? "opacity-50 inline-flex items-center justify-center rounded-md  bg-linear-to-r from-blue-600 to-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        : "inline-flex rounded-md  bg-linear-to-r from-blue-600 to-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    }
                  >
                    {isLoading || isValidating
                      ? "Procesando"
                      : "Generar Documento"}
                    {isLoading || isValidating ? (
                      <div
                        className="ml-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-slate-50 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      />
                    ) : (
                      <ChevronRightIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <button
                    className="text-sm font-semibold leading-6 text-slate-900 inline-flex gap-x-1.5 items-center"
                    type="button"
                    onClick={() => setOpenCompanyHelpModal(true)}
                  >
                    Necesito ayuda{" "}
                    <span aria-hidden="true">
                      {" "}
                      <QuestionMarkCircleIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
                <p className="mt-2 text-sm text-red-600">
                  {urlParamsErrors || JSON.stringify(error)}
                </p>
              </div>

              <div className="aspect-6/5 relative max-w-lg lg:max-w-none xl:row-span-2 xl:row-end-2">
                <Image
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  src="https://images.unsplash.com/photo-1564846824194-346b7871b855?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                  alt=""
                  className="sm:mt-16 lg:mt-0 mt-10 w-full h-full object-cover rounded-2xl xl:mt-36"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
        </div>
      </div>
      <CompanyHelpInformationModal
        open={openCompanyHelpModal}
        setOpen={setOpenCompanyHelpModal}
      />
    </>
  );
};
