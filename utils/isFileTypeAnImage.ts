import { ImagesArray } from "@/interfaces/index";

export const isFileTypeAnImage = (
  files: ImagesArray,
  selectedImgId: string | null
) => {
  const isFileTypeAnImage = (str: string, type: string) => str.startsWith(type);
  const isSelectedImage = (arr: ImagesArray) =>
    arr.find((file) => file.id === selectedImgId);

  if (files && files.length > 0) {
    const isFilePresent = isSelectedImage(files);
    if (
      (isFilePresent && isFileTypeAnImage(isFilePresent.type, "image/")) ||
      isFileTypeAnImage(files[0].type, "image/")
    ) {
      return true;
    }

    return false;
  }
};
