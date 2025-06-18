"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="max-w-3xl text-center">
        <div>
          {error.digest && (
            <p className="text-gray-500 text-xs">Digest: {error.digest}</p>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-red-600 mt-2 mb-4">
          Algo salió mal tratando de cargar la conversación!
        </h2>

        <p className="text-gray-500 my-4">
          Por favor, intenta nuevamente o contacta al soporte si el problema
          persiste. <br /> Aquí hay algunos detalles del error:
        </p>
        <p className="text-gray-700 text-sm">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-12"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
