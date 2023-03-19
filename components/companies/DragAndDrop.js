import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/20/solid";
//
export const DragAndDrop = ({
  files,
  getRootProps,
  getInputProps,
  handleSetFiles,
  isDragActive,
  isDragReject,
  isDragAccept,
}) => {
  const thumbs = files.map((file) => (
    <div
      className="relative h-auto w-full rounded-md bg-gray-100"
      key={file.name}
    >
      <Image
        className="h-auto w-full object-cover"
        src={file.preview}
        alt="file preview"
        width={192}
        height={128}
        onLoadingComplete={() => URL.revokeObjectURL(file.preview)}
      />
    </div>
  ));

  //
  return (
    <>
      <div className="col-span-1 col-start-2">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Foto/Logo de la compañia
        </label>
        <div className="sm:col-span-2">
          <div
            {...getRootProps()}
            className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
          >
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                {!isDragActive && (
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 hover:text-cyan-500"
                  >
                    <span>Subir logo de compañia</span>
                    <input {...getInputProps()} />
                  </label>
                )}
              </div>
              {!isDragActive && (
                <p className="text-xs text-gray-500">Suelte el archivo aqui!</p>
              )}
              {isDragReject && (
                <p className="text-xs text-red-500">
                  Este archivo no esta permitido
                </p>
              )}
              {isDragAccept && (
                <p className="text-xs text-green-600">
                  Este fichero es aceptado!
                </p>
              )}
            </div>
          </div>
        </div>
        {files && files.length > 0 && (
          <aside className="relative mt-3 flex flex-col items-center justify-end">
            {thumbs}

            <button
              type="button"
              onClick={handleSetFiles}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5"
            >
              <XMarkIcon className="h-4 w-4 text-red-50" aria-hidden="true" />
            </button>
            {/* <span className="text-xs text-gray-400">Imagen Previa</span> */}
          </aside>
        )}
      </div>
    </>
  );
};

DragAndDrop.propTypes = {
  files: PropTypes.array.isRequired,
  getRootProps: PropTypes.func.isRequired,
  handleSetFiles: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired,
  isDragReject: PropTypes.bool.isRequired,
  isDragAccept: PropTypes.bool.isRequired,
};
