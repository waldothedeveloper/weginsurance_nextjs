import {
  numberOfFilesUploadedAtom,
  openResourceUploadModalAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";

import { UploadedFile } from "@/interfaces/index";
import { addUniqueId } from "@/utils/addUniqueID";
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
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setOpenResourceUploadModal(true);
      // this will help with the loading carousel skeleton when uploading images
      setNumberOfFilesUploaded(acceptedFiles.length);
      return onDrop(
        acceptedFiles,
        setUploadedFile,
        "images",
        uploadFilesToCloudStorage
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
        uploadFilesToCloudStorage
      );
    },
  });

  return { imageDropZone, documentDropZone, insuranceLogoDropZone };
};
