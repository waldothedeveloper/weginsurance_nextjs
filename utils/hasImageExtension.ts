export const hasImageExtension = (str: string) => {
  const imageExtensions = ["jpeg", "png", "jpg", "gif", "svg"];

  return imageExtensions.some((ext) => str.toLowerCase().includes(ext));
};
