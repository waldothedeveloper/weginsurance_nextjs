import { ImagesArray } from "@/interfaces/index";

export const currentSelectedFile = (
  files: ImagesArray,
  selectedImgId: string
) => {
  const isSelected = files.find((file) => file.id === selectedImgId);

  if (files && files.length > 0) {
    if (isSelected === undefined) {
      return files[0];
    } else {
      return isSelected;
    }
  }
};
