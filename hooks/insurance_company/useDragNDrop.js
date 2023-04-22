import { useCallback, useEffect, useState } from "react";

import { useCreateOnDrop } from "@/hooks/fileUploader/useCreateOnDrop";
import { useMasterDropZone } from "@/hooks/fileUploader/useMasterDropZone";

export const useDragNDrop = () => {
  const [files, setFiles] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [selectedImgId, setSelectedImgId] = useState(null);

  useEffect(() => {
    setAllFiles([...files, ...additionalFiles]);
  }, [files, additionalFiles]);

  useEffect(() => {
    return () => {
      allFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      additionalFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles([]);
      setSelectedImgId(null);
    };
    //! DO NOT ATTEMPT TO PUT allFiles NOR additionalFiles as a dependency here. It will cause for all your files to be revoked and you will not be able to see them in the carousel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Make sure to keep track of the selected file index
  useEffect(() => {
    const currentIdx = allFiles.find((file) => file.id === selectedImgId);

    if (currentIdx === undefined) {
      setSelectedImgId(allFiles[0]?.id);
    }
  }, [allFiles, selectedImgId]);

  const handleSetFiles = useCallback(() => {
    allFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setAdditionalFiles([]);
    setSelectedImgId(null);
  }, [allFiles]);

  const handleSelectedFile = useCallback(
    (selectedFile) => {
      const index = allFiles.find((file) => file.id === selectedFile.id);
      if (index !== "undefined") setSelectedImgId(selectedFile.id);
    },
    [allFiles]
  );

  const onDropImages = useCreateOnDrop("images", setFiles, setAdditionalFiles);
  const onDropDocuments = useCreateOnDrop(
    "documents",
    setFiles,
    setAdditionalFiles
  );
  const onDropAdditionalImages = useCreateOnDrop(
    "additionalImages",
    setFiles,
    setAdditionalFiles
  );

  const onDropAdditionalDocuments = useCreateOnDrop(
    "additionalDocuments",
    setFiles,
    setAdditionalFiles
  );

  const handleRemoveFile = useCallback(
    (file) => {
      const revokeURLAndSliceFile = (index, fn, arr) => {
        URL.revokeObjectURL(arr[index].preview);
        const updatedFiles = [...arr];
        updatedFiles.splice(index, 1);
        fn(updatedFiles);
      };

      const filterRemainingFiles = (setStateFn) =>
        setStateFn((prevFiles) => prevFiles.filter((f) => f !== file));

      const removeFile = (file) => {
        const idxOfFileToBeRemoved = files.indexOf(file);

        if (idxOfFileToBeRemoved === -1) {
          const idxOfAdditionalImageToBeRemoved = additionalFiles.indexOf(file);
          if (idxOfAdditionalImageToBeRemoved !== -1) {
            // delete from the additionalFiles array
            revokeURLAndSliceFile(
              idxOfAdditionalImageToBeRemoved,
              setAdditionalFiles,
              additionalFiles
            );
            filterRemainingFiles(setAdditionalFiles);
          } else {
            return;
          }
        } else {
          // delete from the files array
          revokeURLAndSliceFile(idxOfFileToBeRemoved, setFiles, files);
          filterRemainingFiles(setFiles);
        }
      };

      removeFile(file);
    },
    [files, additionalFiles]
  );

  const imageDropZone = useMasterDropZone(10, onDropImages, {
    "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg", ".webp"],
  });

  const documentDropZone = useMasterDropZone(10, onDropDocuments, {
    "application/pdf": [".pdf"],
    "text/plain": [".txt"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
    "application/rtf": [".rtf"],
    "text/csv": [".csv"],
  });

  const additionalImageDropZone = useMasterDropZone(
    10,
    onDropAdditionalImages,
    { "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg", ".webp"] }
  );

  const additionalDocumentDropZone = useMasterDropZone(
    10,
    onDropAdditionalDocuments,
    {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "application/rtf": [".rtf"],
      "text/csv": [".csv"],
    }
  );

  return {
    allFiles,
    handleSetFiles,
    imageDropZone,
    documentDropZone,
    handleSelectedFile,
    handleRemoveFile,
    additionalImageDropZone,
    additionalDocumentDropZone,
    selectedImgId,
  };
};
