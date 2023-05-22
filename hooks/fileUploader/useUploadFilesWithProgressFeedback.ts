import { FileLike, UploadedFile } from "@/interfaces/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
} from "@/lib/state/atoms";

import { failureNotification } from "@/components/notifications/failureNotification";
import { storage } from "@/lib/firebaseConfig";
import { useSetAtom } from "jotai";

export const useUploadFilesWithProgressFeedback = () => {
  const setProgressPercentage = useSetAtom(progressPercentageAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  // I'm not too sure about this, think about it
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
                setProgressPercentage(progress);
              },
              (error) => {
                switch (error.code) {
                  case "storage/unauthorized":
                    failureNotification(
                      `El usuario no esta autorizado a subir archivos`
                    );
                    reject(
                      `User doesn't have permission to access the object ${error}`
                    );
                    break;
                  case "storage/canceled":
                    failureNotification(
                      `Se ha cancelado la subida del archivo`
                    );
                    reject(`User canceled the upload ${error}`);
                    break;
                  case "storage/unknown":
                    failureNotification(`Ha ocurrido un error desconocido`);
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
