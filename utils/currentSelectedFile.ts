import { UploadedFile } from "@/interfaces/index";

export const currentSelectedFile = (
  files: UploadedFile[],
  selectedImgId: string | null
) => {
  if (!selectedImgId || selectedImgId === null) {
    if (files.length > 0 && files[0]?.url) {
      return files[0].url;
    }
    return "https://via.placeholder.com/600/bfe0dc";
  } else {
    const isSelected = files.find((file) => file.id === selectedImgId);
    if (isSelected) {
      return isSelected.url;
    }
    return "https://via.placeholder.com/600/bfe0dc";
  }
};
