import { ImagesArray } from "@/interfaces/index";

export const getNameFromFile = (files: ImagesArray, selectedImgId: string) => {
  const currentSelectedFile = files.find((file) => file.id === selectedImgId);
  const splitFileName = (fileName: string) =>
    fileName.split(".").slice(0, -1).join(".");

  if (files && files.length > 0) {
    if (currentSelectedFile) {
      return splitFileName(currentSelectedFile.name);
    } else {
      return splitFileName(files[0].name);
    }
  }
};
