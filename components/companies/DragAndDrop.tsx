import { progressPercentageAtom, selectedInsuranceCompanyAtom, uploadedFilesAtom } from "@/lib/state/atoms"
import { useEffect, useState } from "react"

import Image from "next/image";
import spin from "@/public/spin.svg";
import { useAtomValue } from "jotai"
import { useDeleteAllUploadedFiles } from "@/hooks/fileUploader/useDeleteAllUploadedFiles"
import { useDropAndUploadFiles } from "@/hooks/fileUploader/useDropAndUploadFiles"

// 
export const DragAndDrop = () => {
  const progress = useAtomValue(progressPercentageAtom);
  const selectedInsuranceCompany = useAtomValue(selectedInsuranceCompanyAtom);
  const { insuranceLogoDropZone } = useDropAndUploadFiles();
  const handleDeleteAllFiles = useDeleteAllUploadedFiles()
  const uploadedResources = useAtomValue(uploadedFilesAtom);
  const ifUserUploadsALogo =
    !insuranceLogoDropZone.isDragActive &&
    uploadedResources &&
    uploadedResources.length > 0 &&
    uploadedResources.map((file) => (
      <div className="relative h-auto w-full" key={file.name}>
        <Image
          className="h-full w-full object-contain"
          src={file?.url}
          alt="file preview"
          width={192}
          height={128}

        />
      </div>
    ));

  const ifCompanyHasLogo = !insuranceLogoDropZone.isDragActive &&
    selectedInsuranceCompany?.logo_url && (
      <div className="relative h-full w-full">
        <Image
          className="h-32 w-48 object-contain"
          src={selectedInsuranceCompany.logo_url}
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
        <input {...insuranceLogoDropZone.getInputProps()} />
      </label>
      <p className="text-xs text-slate-500">
        Arrastre y suelte el archivo aqui
      </p>
    </div>
  );

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
    }
  }, [progress]);

  //
  return (
    <>
      <div className="col-span-1 col-start-2">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Foto/Logo de la compañia
        </label>
        <div className="sm:col-span-2">
          <div
            {...insuranceLogoDropZone.getRootProps()}
            className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-slate-300 pt-5 pb-6"
          >
            <div className="space-y-1 text-center">


              {isUploading ? (<Image
                src={spin}
                alt="file preview"

              />) : ifUserUploadsALogo ||
              ifCompanyHasLogo ||
              ifNoLogoAndNoFileUpload}


              {insuranceLogoDropZone.isDragReject && (
                <p className="text-xs text-red-500">
                  Este archivo no esta permitido!
                </p>
              )}
              {insuranceLogoDropZone.isDragAccept && (
                <p className="text-xs text-green-600">
                  Este fichero es aceptado!
                </p>
              )}
            </div>
          </div>
          {!insuranceLogoDropZone.isDragActive && uploadedResources && uploadedResources.length > 0 && (
            <button
              onClick={handleDeleteAllFiles}
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