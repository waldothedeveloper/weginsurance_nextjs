import { ImagesArray, Test } from "@/interfaces/index";

import React from "react";
import { nanoid } from "nanoid";
import { useCallback } from "react";

//
export const useCreateOnDrop = (
  inputName: string,
  setFiles: React.Dispatch<React.SetStateAction<[Test]>>,
  setAdditionalFiles: React.Dispatch<React.SetStateAction<[Test]>>
) => {
  return useCallback(
    (acceptedFiles: [Test] | ImagesArray) => {
      const imageFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: nanoid(),
        });
      });

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
