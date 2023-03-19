import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { createInsuranceCompany } from "@/lib/createInsuranceCompany";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { storage } from "@/lib/firebaseConfig";
import { successNotification } from "@/components/notifications/successNotification";
import { useForm } from "react-hook-form";
import { useState } from "react";

//
export const useCreateNewCompany = (files, handleCloseModal) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const name = files[0].name;
    handleUpload(new File(files, name), values);
  };

  const handleUpload = (file, values) => {
    setIsSubmitting(true);
    const { name, notes } = values;
    const normalizedCompanyName = normalizeString(name);
    const metadata = {
      contentType: file[0]?.type,
    };

    if (!file || !values) return null;

    const storageRef = ref(storage, `insurance_company_logos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgresspercent(progress);
      },
      (error) => {
        setIsSubmitting(false);
        failureNotification(name);
        handleCloseModal();
        throw new Error(`Error trying to upload the logo file`, error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createCompany(downloadURL, normalizedCompanyName, notes, file.name);
        });
      }
    );
  };

  const createCompany = (url, name, notes, file_name) => {
    const newCompany = {
      name: name,
      notes,
      logo_url: url,
      // this is important to have because when we delete a company we need to have the filename of the actual logo to have it as a reference of the bucket
      fileName: file_name,
    };

    //
    createInsuranceCompany(newCompany)
      .then(() => {
        reset();
        setIsSubmitting(false);
        successNotification(name);
        handleCloseModal();
      })
      .catch((err) => {
        setIsSubmitting(false);
        failureNotification(name);
        handleCloseModal();

        return err;
      });
  };

  return {
    isSubmittingCreateNewCompany: isSubmitting,
    registerNewCompany: register,
    handleSubmitNewCompany: handleSubmit,
    errorsNewCompany: errors,
    onSubmitCreateNewCompany: onSubmit,
    uploadProgress: progresspercent,
  };
};
