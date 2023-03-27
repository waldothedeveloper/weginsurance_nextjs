import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export const normalizeString = (string: string): string => {
  return string
    .trim()
    .split(" ")
    .map((char) => {
      const tempName = char.toLowerCase();
      return capitalizeFirstLetter(tempName);
    })
    .join(" ");
};
