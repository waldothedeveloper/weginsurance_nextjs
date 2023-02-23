import Image from "next/image";
import Link from "next/link";
import logo from "@/public/weg_logo.jpg";
//
export const AppRoot = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-48 lg:pb-56 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Image
              className="h-18 w-auto rounded-full"
              src={logo}
              alt="weginsurance logo"
            />

            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Notificaciones futuras.{" "}
                <Link
                  href="/"
                  className="whitespace-nowrap font-semibold text-cyan-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Leer mas <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Bienvenido a Weg Insurance SMS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              El sistema ideal para comunicarse con todos sus clientes. <br />A
              toda hora. En cualquier circunstancia.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/user/account"
                className="rounded-md bg-cyan-700 px-6 py-3 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Entrar al sistema
              </Link>
              <Link
                href="/"
                className="text-base font-semibold leading-7 text-gray-900"
              >
                Soporte <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            fill
            placeholder="blur"
            blurDataURL="data:..."
          />
        </div>
      </div>
    </div>
  );
};
