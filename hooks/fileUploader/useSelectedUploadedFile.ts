import { atom, useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";

import { UploadedFile } from "@/interfaces/index";
import { uploadedFilesAtom } from "@/lib/state/atoms";
import { useAtomCallback } from "jotai/utils";

export const useSelectedUploadedFile = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const initialImageAtom = useMemo(
    () =>
      atom((get) => {
        const uploadedFilesUrls = get(uploadedFilesAtom);
        if (uploadedFilesUrls.length > 0)
          setSelectedFile(uploadedFilesUrls[0]?.id ?? null);
        return uploadedFilesUrls[0]?.id;
      }),
    []
  );
  const [firstUploadedImage] = useAtom(initialImageAtom);

  const handleSelectedFile = useAtomCallback(
    useCallback((get, set, arg: UploadedFile) => {
      const index = get(uploadedFilesAtom).findIndex(
        (file: UploadedFile) => file.id === arg.id
      );
      if (index > -1) {
        setSelectedFile(arg.id);
      }
    }, [])
  );

  return { handleSelectedFile, selectedFile, firstUploadedImage };
};
