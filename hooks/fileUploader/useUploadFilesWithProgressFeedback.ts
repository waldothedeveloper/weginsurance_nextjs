import { FileLike, UploadedFile } from "@/interfaces/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
} from "@/lib/state/atoms";

import { storage } from "@/lib/firebaseConfig";
import { useSetAtom } from "jotai";

export const useUploadFilesWithProgressFeedback = () => {
  const setProgressPercentage = useSetAtom(progressPercentageAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const fileUploadOrder: number[] = [];
  //
  const uploadFilesToCloud = async (files: FileLike[], refPath: string) => {
    const filePromises: any = [];

    files &&
      files.length > 0 &&
      files.map((file, idx) => {
        filePromises.push(
          new Promise((resolve, reject) => {
            const metadata = {
              contentType: file.type,
            };

            const storageRef = ref(storage, `${refPath}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // console.log(`Upload is ${progress}% done`);
                setProgressPercentage(progress);
              },
              (error) => {
                switch (error.code) {
                  case "storage/unauthorized":
                    // console.log("storage/unauthorized", error);
                    reject(
                      `User doesn't have permission to access the object ${error}`
                    );
                    break;
                  case "storage/canceled":
                    // console.log("storage/canceled", error);
                    reject(`User canceled the upload ${error}`);
                    break;
                  case "storage/unknown":
                    // console.log("storage/unknown", error);
                    reject(
                      `Unknown error occurred, inspect error.serverResponse ${error}`
                    );
                    break;
                }
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  fileUploadOrder.push(idx);
                  const numUploaded = fileUploadOrder.length;
                  setNumberOfFilesUploaded(numUploaded);
                  resolve(
                    Object.assign(file, {
                      url: downloadURL,
                    })
                  );
                });
              }
            );
          })
        );
      });

    const fileLinks: UploadedFile[] = await Promise.all(filePromises);
    return fileLinks;
  };

  return { uploadFilesToCloud };
};
