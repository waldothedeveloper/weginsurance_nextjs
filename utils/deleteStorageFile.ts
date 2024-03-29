import { deleteObject, ref } from "firebase/storage";

import { storage } from "@/lib/firebaseConfig";

export const deleteStorageFile = async (filename: string, refPath: string) => {
  if (!filename || typeof filename !== "string")
    throw new Error(`A filename must exist so that it can be deleted!`);
  // Create a reference to the file to delete
  const fileRef = ref(storage, `${refPath}/${filename}`);

  // Delete the file
  await deleteObject(fileRef)
    .then(() => {
      // File deleted successfully
      return true;
    })
    .catch((error) => {
      return error;
    });
};
