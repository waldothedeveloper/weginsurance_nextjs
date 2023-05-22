import {
  numberOfFilesUploadedAtom,
  progressPercentageAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useState } from "react";

import { InsuranceCompany } from "@/interfaces/index";
import { createInsuranceCompany } from "@/lib/insurance_company/createInsuranceCompany";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { successNotification } from "@/components/notifications/successNotification";
import { useForm } from "react-hook-form";

//
export const useCreateNewCompany = () => {
  const uploadedImages = useAtomValue(uploadedFilesAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const setUploadedImages = useSetAtom(uploadedFilesAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setProgressPercentage = useSetAtom(progressPercentageAtom);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    reset();
  }, [reset]);

  const createCompany = (companyDetails: InsuranceCompany) => {
    const { notes, name } = companyDetails;
    const logoUrl = uploadedImages.find(
      (file) =>
        file.type.startsWith("image/") &&
        file?.url?.includes("insurance_company_logos")
    )?.url;

    createInsuranceCompany({
      notes,
      name: normalizeString(name),
      logo_url: logoUrl ?? null,
    })
      .then(() => {
        reset();
        setNumberOfFilesUploaded(0);
        setProgressPercentage(0);
        setUploadedImages([]);
        handleCloseModal();
        setIsSubmitting(false);
        successNotification(
          `La compañia ${normalizeString(name)} ha sido creada exitosamente!`
        );
      })
      .catch((err) => {
        setNumberOfFilesUploaded(0);
        setProgressPercentage(0);
        setUploadedImages([]);
        handleCloseModal();
        setIsSubmitting(false);
        failureNotification(
          `Ha ocurrido un error al intentar crear la compañia ${normalizeString(
            name
          )}. Si el error persiste contacte al soporte tecnico.`
        );
        return err;
      });
  };

  const onSubmit = (values: InsuranceCompany) => {
    const { notes, name } = values;
    if (name && name.length > 0) {
      setIsSubmitting(true);
      createCompany({ notes, name });
    } else {
      failureNotification(
        `El nombre de la compañia no puede estar vacio. Por favor ingrese un nombre.`
      );
    }
  };

  return {
    isSubmittingCreateNewCompany: isSubmitting,
    registerNewCompany: register,
    handleSubmitNewCompany: handleSubmit,
    errorsNewCompany: errors,
    onSubmitCreateNewCompany: onSubmit,
    handleOpenNewCompanyModal: handleOpenModal,
    handleCloseNewCompanyModal: handleCloseModal,
    openNewCompanyModal: openModal,
  };
};
