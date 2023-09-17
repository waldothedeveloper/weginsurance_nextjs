import { CompanyHelpInformationModal } from '@/components/CompanyHelpInformationModal'
import { Header } from "@/components/Header"
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import dynamic from "next/dynamic";
import { signURL } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { useCompanyHelpInformation } from '@/hooks/useCompanyHelpInformation'

// @ts-ignore 
const AnvilEmbedFrame = dynamic(() => import("@anvilco/anvil-embed-frame"), {
  ssr: false,
});

export const EmbedPDFSignature = () => {
  const url = useAtomValue(signURL);
  const { openCompanyHelpModal, setOpenCompanyHelpModal } = useCompanyHelpInformation()

  return (
    <>
      <Header />
      {typeof url === "string" ? (
        <AnvilEmbedFrame
          enableDefaultStyles={false}
          // @ts-ignore 
          iframeURL={url}
          scroll="smooth"
          // @ts-ignore 
          className="block w-screen h-screen"
        />
      ) : (
        <>
          <div className="bg-white">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl">
                  Documento PDF no encontrado.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-400">
                  Lo sentimos, esta pagina ha presentado un error. Por favor, vuelva a intentarlo, o contactenos si el problema persiste.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button onClick={() => setOpenCompanyHelpModal(true)} className="inline-flex gap-x-1.5 items-center text-sm font-semibold leading-6 text-red-500">
                    Necesito Ayuda <span aria-hidden="true"><QuestionMarkCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CompanyHelpInformationModal open={openCompanyHelpModal} setOpen={setOpenCompanyHelpModal} />
        </>
      )}
    </>
  );
};