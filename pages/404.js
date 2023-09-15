import Link from "next/link";

export default function NotFound404() {
  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-sky-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Pagina no encontrada 😔
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-600">
          Perdon, no pudimos encontrar la pagina que buscabas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Volver al inicio ☀️
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-900">
            Contactar Soporte <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
