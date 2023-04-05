import Link from "next/link";

export const BackToDashboard = () => {
  return (
    <div className="my-12 px-6 lg:px-8">
      <div className="flex items-center gap-x-6">
        <Link
          href="/user/account"
          className="rounded-md bg-sky-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Regresar al Dashboard
        </Link>
        <Link
          href="/"
          className="text-base font-semibold leading-7 text-slate-900"
        >
          Soporte <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};
