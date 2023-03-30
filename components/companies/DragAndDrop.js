import Image from "next/image";
import PropTypes from "prop-types";
//
export const DragAndDrop = ({
  handleSetFiles,
  files,
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  isDragAccept,
  logo_url,
}) => {
  const ifUserUploadsALogo =
    !isDragActive &&
    files &&
    files.length > 0 &&
    files.map((file) => (
      <div className="relative h-auto w-full" key={file.name}>
        <Image
          className="h-32 w-48 object-contain"
          src={file.preview}
          alt="file preview"
          width={192}
          height={128}
          onLoadingComplete={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    ));

  const ifCompanyHasLogo = !isDragActive &&
    logo_url &&
    logo_url?.length > 0 && (
      <div className="relative h-full w-full">
        <Image
          className="h-32 w-48 object-contain"
          src={logo_url}
          alt="file preview"
          width={192}
          height={128}
        />
      </div>
    );

  const ifNoLogoAndNoFileUpload = (
    <div className="flex flex-col">
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
      >
        <span>Logo de la compañia</span>
        <input {...getInputProps()} />
      </label>
      <p className="text-xs text-gray-500">Arrastre y suelte el archivo aqui</p>
    </div>
  );

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
            className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 pt-5 pb-6"
          >
            <div className="space-y-1 text-center">
              {ifUserUploadsALogo ||
                ifCompanyHasLogo ||
                ifNoLogoAndNoFileUpload}

              {isDragReject && (
                <p className="text-xs text-red-500">
                  Este archivo no esta permitido!
                </p>
              )}
              {isDragAccept && (
                <p className="text-xs text-green-600">
                  Este fichero es aceptado!
                </p>
              )}
            </div>
          </div>
          {!isDragActive && files && files.length > 0 && (
            <button
              onClick={handleSetFiles}
              type="button"
              className="py-px text-xs text-red-500"
            >
              Remover logo
            </button>
          )}
        </div>
      </div>
    </>
  );
};

DragAndDrop.propTypes = {
  handleSetFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  getRootProps: PropTypes.func.isRequired,
  isDragActive: PropTypes.bool.isRequired,
  isDragReject: PropTypes.bool.isRequired,
  isDragAccept: PropTypes.bool.isRequired,
  logo_url: PropTypes.string,
};
