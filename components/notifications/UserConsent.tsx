import Image from "next/image"
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber"
import { useUserConsent } from "@/components/notifications/hooks/useUserConsent"

// 
export const UserConsent = () => {
  const { register, handleSubmit, onSubmit, errors, setValue, campaignError,
    isLoading, } = useUserConsent()

  return (
    <div className="relative">
      <div className="relative h-56 w-full bg-slate-50 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2">
        <Image
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1622556498246-755f44ca76f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
          alt="happy weg insurance user receiving a notification on his phone"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          placeholder="blur"
          blurDataURL="data:..."
        />
      </div>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

        {/* THE REST OF THE FORM */}
        <div className="px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
            <div>
              {/* ERRORS */}
              {campaignError && <div className="p-10 bg-red-50 rounded-xl">
                <p className="text-base text-red-600">
                  {campaignError}
                </p>
              </div>}
              <h2 className="text-base font-semibold leading-8 text-blue-600">WEG Insurance</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Suscríbete para Actualizaciones y Notificaciones Importantes!
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                En nuestra compañia estamos comprometidos contigo. No te pierdas ningún detalle importante sobre tu póliza. Suscríbete para recibir notificaciones inmediatas y estar al día con todo lo que necesitas saber.
              </p>
            </div>
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                      Nombre y Apellido(s)
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register("fullname", { required: true })}
                        placeholder="Jose Marti"
                        autoComplete="name"
                        className={errors.fullname ? "block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-300 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"}
                      />
                      <p className="mt-2 text-sm text-red-600" id="phone-error">{errors.fullname && <span>El nombre completo es requerido</span>}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-slate-900">
                      Phone number
                    </label>
                    <div className="mt-2.5">
                      <input
                        {...register("phone", {
                          pattern: /^(\+?1-?)?(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/g,
                          required: true,
                          onChange: (event) => { return setValue && setValue("phone", formatPhoneNumberToNationalUSAformat(event.target.value), { shouldValidate: true }) },
                        })}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        autoComplete="tel"
                        className={errors.phone ? "block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-300 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"}
                      />
                      <p className="mt-2 text-sm text-red-600" id="phone-error">{errors.phone && <span>El telefono es requerido</span>}</p>
                    </div>
                  </div>

                </div>
                <div className="flex gap-x-3 items-center">
                  <div className="flex h-6 items-center">
                    <input
                      {...register("consent", { required: true })}
                      id="consent"
                      name="consent"
                      type="checkbox"
                      className={errors.consent ? "h-4 w-4 rounded text-red-500 focus:ring-red-500 focus:ring-offset-red-900 animate-pulse ring ring-red-500 border-red-500" : "h-4 w-4 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="consent" className="font-medium text-white">
                      user consent
                    </label>
                    <p className={errors.consent ? "text-red-500" : "text-slate-400"}>Al hacer clic en esta casilla, acepta nuestros <a className="font-semibold text-blue-500 underline" target="_blank" rel="noreferrer" href="https://www.termsfeed.com/live/60d23d18-b116-41d4-93bd-6e8440261b30">términos</a> de política de privacidad y términos de uso.</p>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    disabled={Object.keys(errors).length > 0 || isLoading || campaignError || false}
                    type="submit"
                    className={Object.keys(errors).length > 0 || isLoading ? "flex rounded-md bg-slate-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm" : "rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"}
                  >
                    Subscribirse
                    {isLoading && <svg className="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
