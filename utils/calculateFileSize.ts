import { UploadedFile } from "@/interfaces/index";

export const calculateFileSize = (
  files: UploadedFile[],
  selectedImgId: string | null
) => {
  if (files && files.length > 0) {
    const currentSelectedFile = files.find((file) => file.id === selectedImgId);

    if (currentSelectedFile?.size) {
      return getFileSizeString(currentSelectedFile.size);
    } else if (files[0]?.size) {
      return getFileSizeString(files[0].size);
    }
  }
  return "0 Bytes"; // default value when no file size can be calculated
};

const getFileSizeString = (fileSizeInBytes: number) => {
  const byteUnits = ["Bytes", "KB", "MB", "GB", "TB"];
  if (fileSizeInBytes === 0) {
    return "0 Bytes";
  }
  const i: number = parseInt(
    Math.floor(Math.log(fileSizeInBytes) / Math.log(1024)).toString(),
    10
  );
  return `${Math.round(fileSizeInBytes / Math.pow(1024, i))} ${byteUnits[i]}`;
};
