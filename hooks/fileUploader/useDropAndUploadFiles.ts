import { UploadedFile } from "@/interfaces/index";
import { addUniqueId } from "@/utils/addUniqueID";
import { uploadedFilesAtom } from "@/lib/state/atoms";
import { useDropzone } from "react-dropzone";
import { useSetAtom } from "jotai";
import { useUploadFilesWithProgressFeedback } from "@/hooks/fileUploader/useUploadFilesWithProgressFeedback";

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
  const files = addUniqueId(localFiles);
  const uploadedFiles = await uploaderFn(files, bucket);
  setterFn((prevFiles: UploadedFile[]) => [...prevFiles, ...uploadedFiles]);
};

export const useDropAndUploadFiles = () => {
  const { uploadFilesToCloud } = useUploadFilesWithProgressFeedback();
  const setUploadedFile = useSetAtom(uploadedFilesAtom);
  const imageDropZone = useDropzone({
    maxFiles: 10,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "images",
        uploadFilesToCloud
      );
    },
  });

  const documentDropZone = useDropzone({
    maxFiles: 10,
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
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "documents",
        uploadFilesToCloud
      );
    },
  });

  const insuranceLogoDropZone = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "insurance_company_logos",
        uploadFilesToCloud
      );
    },
  });

  return { imageDropZone, documentDropZone, insuranceLogoDropZone };
};
