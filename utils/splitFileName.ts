export const splitFileName = (fileName: string): string => {
  if (!fileName) return "";
  const fileNameSplitted = fileName.split(".");
  if (fileNameSplitted.length > 0) {
    return fileNameSplitted[fileNameSplitted.length - 1];
  }
  return fileName;
};
