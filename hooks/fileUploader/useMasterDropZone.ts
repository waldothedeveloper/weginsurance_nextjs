import { DocumentType, ImageType } from "@/interfaces/index";

import { useDropzone } from "react-dropzone";

export const useMasterDropZone = (
  maxFiles: number,
  onDropFn: () => void,
  acceptObj: ImageType | DocumentType
) =>
  useDropzone({
    maxFiles,
    onDrop: onDropFn,
    multiple: true,
    accept: acceptObj,
  });
