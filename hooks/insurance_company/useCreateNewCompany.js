import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useState } from "react";

import { createInsuranceCompany } from "@/lib/insurance_company/createInsuranceCompany";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { storage } from "@/lib/firebaseConfig";
import { successNotification } from "@/components/notifications/successNotification";
import { useForm } from "react-hook-form";

//
export const useCreateNewCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // the file is optional
  const handleUpload = (file, values) => {
    const normalizedCompanyName = normalizeString(values?.name);
    const metadata = {
      contentType: file[0]?.type,
    };

    if (!file || !values) return null;

    const storageRef = ref(storage, `insurance_company_logos/${file?.name}`);
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
        failureNotification(normalizedCompanyName);
        handleCloseModal();
        throw new Error(`Error trying to upload the logo file`, error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createCompany(downloadURL, values, file?.name);
        });
      }
    );
  };

  const createCompany = (url, values, file_name) => {
    const { name, notes } = values;
    const normalizedCompanyName = normalizeString(name);
    const newCompany = {
      name: normalizedCompanyName,
      notes,
      logo_url: url ?? "",
      /*
      this is important to have because when we delete a company we need to have the filename of the actual logo to have it as a reference of the bucket
      if there's no logo of the insurance company there will be no filename to save
      */
      fileName: file_name ?? "",
    };

    createInsuranceCompany(newCompany)
      .then(() => {
        reset();
        handleCloseModal();
        setIsSubmitting(false);
        successNotification(`La compañia ${name} ha sido creada exitosamente!`);
      })
      .catch((err) => {
        handleCloseModal();
        setIsSubmitting(false);
        failureNotification(
          `Ha ocurrido un error al intentar crear la compañia ${name}. Si el error persiste contacte al soporte tecnico.`
        );

        return err;
      });
  };

  const onSubmit = (values, files) => {
    const fileName = files[0]?.name;

    // if there is no logo to upload then just create the insurance company
    if (!files) {
      setIsSubmitting(true);
      createCompany(null, values, fileName);
    } else {
      setIsSubmitting(true);
      handleUpload(new File(files, fileName), values);
    }
  };

  return {
    isSubmittingCreateNewCompany: isSubmitting,
    registerNewCompany: register,
    handleSubmitNewCompany: handleSubmit,
    errorsNewCompany: errors,
    onSubmitCreateNewCompany: onSubmit,
    uploadProgress: progresspercent,
    handleOpenNewCompanyModal: handleOpenModal,
    handleCloseNewCompanyModal: handleCloseModal,
    openNewCompanyModal: openModal,
  };
};
