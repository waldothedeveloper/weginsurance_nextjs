import { UploadTaskSnapshot } from "firebase/storage";
import { progressPercentageAtom } from "@/lib/state/atoms";
import { useSetAtom } from "jotai";

//
export const useProgressFeedback = () => {
  const setProgressPercentage = useSetAtom(progressPercentageAtom);

  const handleProgressUpload = (snapshot: UploadTaskSnapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgressPercentage(progress);
  };

  return { handleProgressUpload };
};
