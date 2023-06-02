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
  const setUploadedResources = useSetAtom(uploadedFilesAtom);
  const setProgressAtom = useSetAtom(progressPercentageAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);

  //
  const handleDeleteAllFiles = useAtomCallback(
    useCallback(
      async (get) => {
        const filePromises: any = [];
        const files = get(uploadedFilesAtom);

        const resetProgressAndNumberOfUploadedFiles = () => {
          setUploadedResources([]);
          setProgressAtom(0);
          setNumberOfFilesUploaded(0);
        };

        if (!files) return;
        if (files.length === 0) return;

        files.forEach((file) => {
          if (
            file.type.startsWith("image/") &&
            file?.url?.includes("insurance_company_logos")
          ) {
            filePromises.push(
              deleteStorageFile(file?.name, "insurance_company_logos")
            );
          } else {
            !file.type.startsWith("image/")
              ? filePromises.push(deleteStorageFile(file?.name, "documents"))
              : filePromises.push(deleteStorageFile(file?.name, "images"));
          }
        });
        await Promise.all(filePromises);
        resetProgressAndNumberOfUploadedFiles();
      },
      [setUploadedResources, setProgressAtom, setNumberOfFilesUploaded]
    )
  );

  return handleDeleteAllFiles;
};
//
