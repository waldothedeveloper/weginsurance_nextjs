import Link from "next/link";
export default function SignUpNotAllowed() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-500">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-500 sm:text-5xl">
            Prohibido crear una cuenta
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-500">
            Lo sentimos. Para crear una cuenta contacte al administrador del
            sistema.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Regresar al incio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
