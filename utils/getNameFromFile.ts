import { UploadedFile } from "@/interfaces/index";

export const getNameFromFile = (
  files: UploadedFile[],
  selectedImgId: string | null
) => {
  if (!files) return;
  const currentSelectedFile = files?.find((file) => file?.id === selectedImgId);
  const splitFileName = (fileName: string) =>
    fileName?.split(".")?.slice(0, -1)?.join(".");

  if (currentSelectedFile) {
    return splitFileName(currentSelectedFile?.name);
  } else {
    return splitFileName(files[0]?.name);
  }
};
