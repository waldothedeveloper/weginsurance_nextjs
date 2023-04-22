import { ImagesArray } from "@/interfaces/index";
import { splitFileName } from "@/utils/splitFileName";

//
export const getFileExtensionFromName = (
  files: ImagesArray,
  selectedImgId: string
) => {
  const currentSelectedFile = files.find((file) => file.id === selectedImgId);

  if (files && files.length > 0) {
    if (currentSelectedFile) {
      return splitFileName(currentSelectedFile.name)?.toLocaleLowerCase();
    } else {
      return splitFileName(files[0].name)?.toLocaleLowerCase();
    }
  }
};
