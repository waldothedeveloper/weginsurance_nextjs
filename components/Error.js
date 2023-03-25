import Link from "next/link";
import PropTypes from "prop-types";

export const Error = ({ error_message }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex min-h-full flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
          <p className="text-base font-semibold leading-8 text-cyan-600">
            {error_message?.status || 500}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Error de la aplicacion
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {typeof error_message !== "string"
              ? JSON.stringify(error_message, null, 2)
              : error_message}
          </p>
          <div className="mt-10">
            <Link
              href="/admin/dashboard"
              className="text-sm font-semibold leading-7 text-cyan-600"
            >
              <span aria-hidden="true">&larr;</span> regresar a la pagina
              principal
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

Error.propTypes = {
  error_message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
