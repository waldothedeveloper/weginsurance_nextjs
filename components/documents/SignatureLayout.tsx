import { PencilSquareIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

import { CompanyHelpInformationModal } from '@/components/CompanyHelpInformationModal'
import { Header } from "@/components/Header"
import Image from "next/image";
import { useCompanyHelpInformation } from '@/hooks/useCompanyHelpInformation'
import { useGetUserFromSessionStorage } from "@/components/documents/hooks/useGetUserFromSessionStorage"
import { useSignPDF } from '@/components/documents/hooks/useSignPDF'

export const SignatureLayout = () => {
  const { user, error: sessionStorageError } = useGetUserFromSessionStorage()
  const { generateSignURL, isLoading, error } = useSignPDF(user)
  const { openCompanyHelpModal, setOpenCompanyHelpModal } = useCompanyHelpInformation()

  return (
    <>
      <Header />
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">

              <h1 className="mt-24 text-4xl font-bold tracking-tight text-slate-900 sm:mt-10 sm:text-6xl">
                Hola <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">{user?.firstname}</span>, ya estamos listos!
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Hemos recibido la información necesaria a través del enlace que usted recibió. Por favor, haga clic en el botón de abajo para firmar su documento de seguro con Weg Insurance.
              </p>
              <div className="mt-10 flex items-center gap-x-6">

                <button
                  disabled={isLoading}
                  onClick={generateSignURL}
                  type="button"
                  className={isLoading ? "inline-flex gap-x-1.5 rounded-md items-center bg-gradient-to-r from-blue-500 to-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm opacity-50" : "inline-flex gap-x-1.5 rounded-md items-center bg-gradient-to-r from-blue-500 to-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"}
                >
                  Firmar documento
                  {isLoading ? (<div
                    className="ml-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-slate-50 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  />) : <PencilSquareIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />}

                </button>
                <button className="text-sm font-semibold leading-6 text-slate-900 inline-flex gap-x-1.5 items-center" type="button" onClick={() => setOpenCompanyHelpModal(true)} >
                  Necesito ayuda <span aria-hidden="true"> <QuestionMarkCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" /></span>
                </button>
              </div>
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {error && JSON.stringify(error) || sessionStorageError && JSON.stringify(sessionStorageError)}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <div className="relative aspect-[3/2] lg:aspect-auto w-full lg:h-full">
              <Image
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 800px"
                priority
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1564846824172-dee7b0a26785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt=""
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <CompanyHelpInformationModal open={openCompanyHelpModal} setOpen={setOpenCompanyHelpModal} />
    </>
  )
}