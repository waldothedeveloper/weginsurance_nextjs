import { ImagesArray } from "@/interfaces/index";
import React from "react";
import { nanoid } from "nanoid";
// import { uploadFilesToCloud } from "@/utils/uploadFilesToCloud";
import { useCallback } from "react";

//! THIS HOOK IS NOT USED ANYMORE
export const useCreateOnDrop = (
  inputName: string,
  setFiles: React.Dispatch<React.SetStateAction<ImagesArray>>,
  setAdditionalFiles: React.Dispatch<React.SetStateAction<ImagesArray>>
) => {
  return useCallback(
    (acceptedFiles: ImagesArray) => {
      const imageFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: nanoid(),
        });
      });

      // async upload files to cloud
      if (inputName === "documents" || inputName === "additionalDocuments") {
        // uploadFilesToCloud(imageFiles, "documents");
      }
      // async upload files to cloud
      if (inputName === "images" || inputName === "additionalImages") {
        // uploadFilesToCloud(imageFiles, "images");
      }

      if (inputName === "images" || inputName === "documents") {
        setFiles([...imageFiles]);
      }

      if (
        inputName === "additionalImages" ||
        inputName === "additionalDocuments"
      ) {
        setAdditionalFiles((oldFiles) => [...oldFiles, ...imageFiles]);
      }
    },
    [inputName, setFiles, setAdditionalFiles]
  );
};
