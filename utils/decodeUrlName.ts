export const decodeUrlName = (url: string) => {
  const decodedUrl = decodeURIComponent(url);
  const name = decodedUrl?.split("documents/")?.pop()?.split("?")[0];
  return name && name?.length > 0 ? name : "Nombre del archivo no encontrado";
};
