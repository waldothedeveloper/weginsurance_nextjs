import {
  isSubmittingAtom,
  numberOfFilesUploadedAtom,
  openModalAtom,
  progressPercentageAtom,
  selectedInsuranceCompanyAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { FieldValues } from "react-hook-form";
import { InsuranceCompany } from "@/interfaces/index";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { successNotification } from "@/components/notifications/successNotification";
import { updateInsuranceCompany } from "@/lib/insurance_company/updateInsuranceCompany";
import { useForm } from "react-hook-form";

//
export const useUpdateCompany = () => {
  const uploadedResources = useAtomValue(uploadedFilesAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const setUploadedResources = useSetAtom(uploadedFilesAtom);
  const setSelectedInsuranceCompany = useSetAtom(selectedInsuranceCompanyAtom);
  const selectedInsuranceCompany = useAtomValue(selectedInsuranceCompanyAtom);
  const setNumberOfFilesUploaded = useSetAtom(numberOfFilesUploadedAtom);
  const setProgressPercentage = useSetAtom(progressPercentageAtom);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      name: selectedInsuranceCompany?.name,
      notes: selectedInsuranceCompany?.notes,
      logo_url: selectedInsuranceCompany?.logo_url || "",
      fileName: selectedInsuranceCompany?.fileName || "",
      id: selectedInsuranceCompany?.id,
    });
  }, [selectedInsuranceCompany, reset]);

  const handleOpenModal = useCallback(
    (company: InsuranceCompany) => {
      setOpenModal(true);
      setSelectedInsuranceCompany(company);
    },
    [setSelectedInsuranceCompany, setOpenModal]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedInsuranceCompany(null);
  }, [setSelectedInsuranceCompany, setOpenModal]);

  const updateCompany = (updatedCompany: FieldValues) => {
    const { notes, name, logo_url } = updatedCompany;
    const logoUrl = uploadedResources.find(
      (file) =>
        file.type.startsWith("image/") &&
        file?.url?.includes("insurance_company_logos")
    )?.url;

    if (!name) return;
    if (name.length < 2) return;

    const updatedCom = {
      name,
      notes,
      logo_url: logoUrl ?? logo_url,
    };

    updateInsuranceCompany(updatedCom, updatedCompany.id)
      .then(() => {
        reset();
        setNumberOfFilesUploaded(0);
        setProgressPercentage(0);
        setUploadedResources([]);
        handleCloseModal();
        setIsSubmitting(false);
        successNotification(
          `La compañia ${normalizeString(
            name
          )} ha sido actualizada exitosamente!`
        );
      })
      .catch((err) => {
        setNumberOfFilesUploaded(0);
        setProgressPercentage(0);
        setUploadedResources([]);
        handleCloseModal();
        setIsSubmitting(false);
        failureNotification(
          `Ha ocurrido un error al intentar actualizar la compañia ${normalizeString(
            name
          )}. Si el error persiste contacte al soporte tecnico.`
        );
        return err;
      });
  };

  const onSubmit = (values: FieldValues) => {
    updateCompany(values);
  };

  return {
    isSubmittingUpdateCompany: isSubmitting,
    registerUpdateCompany: register,
    errorsUpdateCompany: errors,
    openUpdateCompanyModal: openModal,
    handleOpenUpdateCompanyModal: handleOpenModal,
    handleCloseUpdateCompanyModal: handleCloseModal,
    onSubmitUpdateCompany: onSubmit,
    handleSubmitUpdateCompany: handleSubmit,
  };
};
