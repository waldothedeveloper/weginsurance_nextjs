import { selectedImageIdAtom, uploadedFilesAtom } from "@/lib/state/atoms";

import { UploadedFile } from "@/interfaces/index";
import { useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";

export const useSelectedUploadedFile = () => {
  const [selectedImage, setSelectedImage] = useAtom(selectedImageIdAtom);

  const handleSelectedFile = useAtomCallback(
    useCallback(
      (get, set, arg: UploadedFile) => {
        const index = get(uploadedFilesAtom).findIndex(
          (file: UploadedFile) => file.id === arg.id
        );
        if (index > -1) {
          // eslint-disable-next-line no-unused-vars
          (setSelectedImage as (value: string | null) => void)(arg.id);
        }
      },
      [setSelectedImage]
    )
  );

  return { handleSelectedFile, selectedImage };
};
