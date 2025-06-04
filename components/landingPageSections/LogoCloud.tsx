import Image from "next/image";

export const LogoCloud = () => {
  return (
    <div className="relative isolate -z-10 mt-32 sm:mt-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-slate-900">
          Trabajamos con todas las aseguradoras del mercado que te ofrecen los mejores precios.
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/aetna_logo.png"
            alt="Aetna"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/ambetter_health_logo.png"
            alt="Ambetter Health"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/amerihealth_logo.png"
            alt="Amerihealth"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/avmed_logo.png"
            alt="Avmed"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/bluecross_and_blueshield_logo.png"
            alt="Bluecross and Blueshield"
            width={158}
            height={48}
          />
          {/* group 2 */}
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/cigna_logo.png"
            alt="Cigna"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-cover mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/florida-blue-logo_2.jpg"
            alt="Florida Blue"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/humana_logo.png"
            alt="Humana"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/molina_logo.png"
            alt="Molina"
            width={158}
            height={48}
          />
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/oscar_logo.png"
            alt="Oscar"
            width={158}
            height={48}
          />
          {/* group 3 */}
          <Image
            className="max-h-12 object-contain mix-blend-color-burn w-full lg:w-[60%] aspect-3/2"
            src="/united_healthcare_logo.png"
            alt="United Healthcare"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  )
}