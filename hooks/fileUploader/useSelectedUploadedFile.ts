import { useCallback, useState } from "react";

import { UploadedFile } from "@/interfaces/index";
import { uploadedFilesAtom } from "@/lib/state/atoms";
import { useAtomCallback } from "jotai/utils";
import { useAtomValue } from "jotai";

//
export const useSelectedUploadedFile = () => {
  const uploadedImages = useAtomValue(uploadedFilesAtom);
  const [selectedImage, setSelectedImage] = useState(
    uploadedImages[0]?.id || null
  );

  const handleSelectedFile = useAtomCallback(
    useCallback((get, set, arg: UploadedFile) => {
      const index = get(uploadedFilesAtom).findIndex(
        (file: UploadedFile) => file.id === arg.id
      );
      if (index > -1) {
        setSelectedImage(arg.id);
      }
    }, [])
  );

  return { handleSelectedFile, selectedImage };
};
