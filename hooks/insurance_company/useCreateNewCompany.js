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
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    reset();
  }, [reset]);

  const createCompany = (...args) => {
    if (args.length === 1) {
      const { notes, name } = args[0];
      const normalizedCompanyName = normalizeString(name);
      //
      const newCompany = {
        notes,
        name: normalizedCompanyName,
      };

      createInsuranceCompany(newCompany)
        .then(() => {
          reset();
          handleCloseModal();
          setIsSubmitting(false);
          successNotification(
            `La compañia ${name} ha sido creada exitosamente!`
          );
        })
        .catch((err) => {
          handleCloseModal();
          setIsSubmitting(false);
          failureNotification(
            `Ha ocurrido un error al intentar crear la compañia ${name}. Si el error persiste contacte al soporte tecnico.`
          );
          return err;
        });
    } else {
      const { name, notes } = args[1];
      const normalizedCompanyName = normalizeString(name);
      const newCompany = {
        name: normalizedCompanyName,
        notes,
        logo_url: args[0],
        fileName: args[2],
      };

      createInsuranceCompany(newCompany)
        .then(() => {
          reset();
          handleCloseModal();
          setIsSubmitting(false);
          successNotification(
            `La compañia ${name} ha sido creada exitosamente!`
          );
        })
        .catch((err) => {
          handleCloseModal();
          setIsSubmitting(false);
          failureNotification(
            `Ha ocurrido un error al intentar crear la compañia ${name}. Si el error persiste contacte al soporte tecnico.`
          );
          throw err;
        });
    }
  };

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
        return error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createCompany(downloadURL, values, file?.name);
        });
      }
    );
  };

  const onSubmit = (values, files) => {
    const fileName = files[0]?.name;

    // if there is no logo to upload then just create the insurance company
    if (files?.length === 0) {
      createCompany(values);
    } else {
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
