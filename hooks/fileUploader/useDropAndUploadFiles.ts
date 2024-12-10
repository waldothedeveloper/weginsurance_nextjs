import {
  numberOfFilesUploadedAtom,
  openResourceUploadModalAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";

import { UploadedFile } from "@/interfaces/index";
import { addUniqueId } from "@/utils/addUniqueID";
import { failureNotification } from "@/components/notifications/failureNotification";
import { useDropzone } from "react-dropzone";
import { useSetAtom } from "jotai";
import { useUploadFilesWithProgressFeedback } from "@/hooks/fileUploader/useUploadFilesWithProgressFeedback";

/*
The onDrop function will take the selected files (images or documents) and do the following things:
1. Add a unique ID to each file in the array of files
2. Upload files to cloud storage
3. Set uploaded files to state

*/
const onDrop = async (
  localFiles: File[],
  setterFn: (fn: (prevFiles: UploadedFile[]) => UploadedFile[]) => void, // eslint-disable-line
  bucket: string,
  uploaderFn: (
    // eslint-disable-next-line no-unused-vars
    files: (File & { id: string })[],
    // eslint-disable-next-line no-unused-vars
    bucket: string
  ) => Promise<UploadedFile[]> // eslint-disable-line
) => {
  // add unique ID to each file in the array of files
  const files = addUniqueId(localFiles);
  // upload files to cloud storage
  const uploadedFiles = await uploaderFn(files, bucket);
  // set uploaded files to state
  setterFn((prevFiles) => [...prevFiles, ...uploadedFiles]);
};

export const useDropAndUploadFiles = () => {
  const setOpenResourceUploadModal = useSetAtom(openResourceUploadModalAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const { uploadFilesToCloudStorage } = useUploadFilesWithProgressFeedback();
  const setUploadedFile = useSetAtom(uploadedFilesAtom);
  const imageDropZone = useDropzone({
    maxFiles: 10,
    maxSize: 5242880, // 5MB in bytes
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      setOpenResourceUploadModal(true);
      // this will help with the loading carousel skeleton when uploading images, to show accurate accepted images
      setNumberOfFilesUploaded(acceptedFiles.length);
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "images",
        uploadFilesToCloudStorage
      );
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.length === 1) {
        failureNotification(
          `La imagen ${rejectedFiles[0]?.file?.name} es mayor de 5MB y ha sido rechazada. Por favor seleccione una imagen menor o igual a 5MB.`
        );
      }

      if (rejectedFiles.length > 1) {
        const rejectedImgs = rejectedFiles.map(
          (img, idx) => `${idx + 1}. ${img?.file?.name} `
        );
        failureNotification(
          `Estas imagenes son mayores de 5MB: ${rejectedImgs}. Por favor seleccione imagenes iguales o menores de 5MB.`
        );
      }
    },
  });

  const documentDropZone = useDropzone({
    maxFiles: 10,
    maxSize: 614400, // 600KB in bytes
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "application/rtf": [".rtf"],
      "text/csv": [".csv"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;
      setOpenResourceUploadModal(true);
      // this will help with the loading carousel skeleton when uploading documents
      setNumberOfFilesUploaded(acceptedFiles.length);
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "documents",
        uploadFilesToCloudStorage
      );
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.length === 1) {
        failureNotification(
          `El siguiente documento adjunto es mayor de 600KB: ${rejectedFiles[0]?.file?.name}. Por favor seleccione un adjunto igual o menor a 600KB.`
        );
      }

      if (rejectedFiles.length > 1) {
        const rejectedDocs = rejectedFiles.map(
          (img, idx) => `${idx + 1}. ${img?.file?.name} `
        );
        failureNotification(
          `Los siguientes documentos adjuntos son mayores de 600KB. ${rejectedDocs}. Por favor seleccione adjuntos iguales o menores a 600KB.`
        );
      }
    },
  });

  const insuranceLogoDropZone = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "insurance_company_logos",
        uploadFilesToCloudStorage
      );
    },
  });

  return { imageDropZone, documentDropZone, insuranceLogoDropZone };
};
