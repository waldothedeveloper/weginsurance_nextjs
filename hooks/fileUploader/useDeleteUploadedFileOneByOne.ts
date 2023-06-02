import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";

import { deleteStorageFile } from "@/utils/deleteStorageFile";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { useSetAtom } from "jotai";

export const useDeleteUploadedFileOneByOne = () => {
  const setProgressAtom = useSetAtom(progressPercentageAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);

  const setUploadedResources = useSetAtom(uploadedFilesAtom);

  const handleRemoveFile = useAtomCallback(
    useCallback(
      (get, set, arg: { id: string; type: string; name: string }) => {
        const remainingResources = get(uploadedFilesAtom).filter(
          (file) => file.id !== arg.id
        );

        const resetProgressAndNumberOfUploadedFiles = () => {
          setProgressAtom(0);
          setNumberOfFilesUploaded(0);
        };

        if (remainingResources) {
          !arg.type.startsWith("image/")
            ? deleteStorageFile(arg?.name, "documents").then(() => {
                if (remainingResources.length === 0) {
                  resetProgressAndNumberOfUploadedFiles();
                }
              })
            : deleteStorageFile(arg?.name, "images").then(() => {
                if (remainingResources.length === 0) {
                  resetProgressAndNumberOfUploadedFiles();
                }
              });
          setUploadedResources(remainingResources);
        }
      },
      [setUploadedResources, setProgressAtom, setNumberOfFilesUploaded]
    )
  );

  return { handleRemoveFile };
};
