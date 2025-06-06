import Link from "next/link";

export default function ServerError500() {
  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Go back home
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
