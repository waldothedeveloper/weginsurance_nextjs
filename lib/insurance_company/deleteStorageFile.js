import { deleteObject, ref } from "firebase/storage";

import { storage } from "@/lib/firebaseConfig";

export const deleteStorageFile = async (filename) => {
  if (!filename || typeof filename !== "string")
    throw new Error(`A filename must exist so that it can be deleted!`);
  // Create a reference to the file to delete
  const fileRef = ref(storage, `insurance_company_logos/${filename}`);

  // Delete the file
  await deleteObject(fileRef)
    .then(() => {
      // File deleted successfully
      return true;
    })
    .catch((error) => {
      // console.log("error trying to delete the file!: ", error);

      return error;
    });
};
