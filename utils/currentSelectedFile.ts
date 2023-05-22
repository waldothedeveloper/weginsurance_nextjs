import { ImagesArray } from "@/interfaces/index";

export const currentSelectedFile = (
  files: ImagesArray,
  selectedImgId: string | null
): string => {
  const isSelected = files.find((file) => file.id === selectedImgId);

  if (isSelected === undefined) {
    return files[0].url;
  } else {
    return isSelected.url;
  }
};
