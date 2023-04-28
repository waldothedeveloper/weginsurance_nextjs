import { nanoid } from "nanoid";

//
export const addUniqueId = (array: File[]) => {
  return array.map((item) => {
    return Object.assign(item, {
      id: nanoid(),
    });
  });
};
