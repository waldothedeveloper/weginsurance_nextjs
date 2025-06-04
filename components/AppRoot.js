import Image from "next/image";
import Link from "next/link";

//
export const AppRoot = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Link href="/">
              <span className="text-xl font-bold uppercase tracking-tight text-blue-600">
                weg <br /> insurance
              </span>
              <span className="ml-2 self-end text-sm font-medium lowercase text-slate-500">
                sms
              </span>
            </Link>

            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-500 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                Notificaciones futuras.{" "}
                <Link
                  href="/"
                  className="whitespace-nowrap font-semibold text-blue-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Leer mas <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-slate-900 sm:mt-10 sm:text-6xl">
              Bienvenido a Weg Insurance SMS
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              El sistema ideal para comunicarse con todos sus clientes. <br />A
              toda hora. En cualquier circunstancia.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/admin/dashboard"
                className="rounded-md bg-blue-700 px-6 py-3 text-base font-semibold leading-7 text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Entrar al sistema
              </Link>
              <Link
                href="/"
                className="text-base font-semibold leading-7 text-slate-900"
              >
                Soporte <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="lg:aspect-auto aspect-3/2 w-full object-cover lg:absolute lg:inset-0 lg:h-full"
            src="https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="picture of a beautiful office"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            placeholder="blur"
            blurDataURL="data:..."
          />
        </div>
      </div>
    </div>
  );
};
