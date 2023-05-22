import { ImagesArray } from "@/interfaces/index";

export const calculateFileSize = (
  files: ImagesArray,
  selectedImgId: string | null
) => {
  if (files && files.length > 0) {
    const currentSelectedFile = files.find((file) => file.id === selectedImgId);

    if (currentSelectedFile) {
      return getFileSizeString(currentSelectedFile.size);
    } else {
      return getFileSizeString(files[0].size);
    }
  }
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
