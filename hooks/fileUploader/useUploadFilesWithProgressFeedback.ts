import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { UploadedFile } from "@/interfaces/index";
import { handleUploadErrors } from "@/utils/handleUploadErrors";
import { storage } from "@/lib/firebaseConfig";
import { useProgressFeedback } from "@/hooks/fileUploader/useProgressFeedback";

export const useUploadFilesWithProgressFeedback = () => {
  const { handleProgressUpload } = useProgressFeedback();

  const uploadFilesToCloudStorage = async (
    files: (File & { id: string })[],
    refPath: string
  ) => {
    const uploadedFiles: UploadedFile[] = [];

    for (const file of files) {
      console.log("file being uploaded: ", file);
      const metadata = {
        contentType: file.type,
      };
      const storageRef = ref(storage, `${refPath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on("state_changed", handleProgressUpload);

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        uploadedFiles.push(Object.assign(file, { url: downloadURL }));
      } catch (error) {
        handleUploadErrors(error);
      }
    }

    return uploadedFiles;
  };

  return { uploadFilesToCloudStorage };
};
