import { UploadedFile } from "@/interfaces/index";

export const areAllFilesTypeOfImage = (files: UploadedFile[]): boolean => {
  return files.every((file) => file.type.startsWith("image/"));
};
