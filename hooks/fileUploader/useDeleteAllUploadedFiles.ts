import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
} from "@/lib/state/atoms";

import { deleteStorageFile } from "@/utils/deleteStorageFile";
import { uploadedFilesAtom } from "@/lib/state/atoms";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { useSetAtom } from "jotai";

//
export const useDeleteAllUploadedFiles = () => {
  const setUploadedImages = useSetAtom(uploadedFilesAtom);
  const setProgressAtom = useSetAtom(progressPercentageAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);

  //
  const handleDeleteAllFiles = useAtomCallback(
    useCallback(
      async (get) => {
        const filePromises: any = [];
        const files = get(uploadedFilesAtom);

        files.forEach((file) => {
          !file.type.startsWith("image/")
            ? filePromises.push(deleteStorageFile(file?.name, "documents"))
            : filePromises.push(deleteStorageFile(file?.name, "images"));
        });
        await Promise.all(filePromises);
        setUploadedImages([]);
        setProgressAtom(0);
        setNumberOfFilesUploaded(0);
      },
      [setUploadedImages, setProgressAtom, setNumberOfFilesUploaded]
    )
  );

  return handleDeleteAllFiles;
};
//