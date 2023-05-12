import {
  isSubmittingAtom,
  openModalAtom,
  selectedInsuranceCompanyAtom,
  uploadedFilesAtom,
} from "@/lib/state/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { InsuranceCompany } from "@/interfaces/index";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { successNotification } from "@/components/notifications/successNotification";
import { updateInsuranceCompany } from "@/lib/insurance_company/updateInsuranceCompany";
import { useForm } from "react-hook-form";

//
export const useUpdateCompany = () => {
  const uploadedImages = useAtomValue(uploadedFilesAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const setUploadedImages = useSetAtom(uploadedFilesAtom);
  const setSelectedInsuranceCompany = useSetAtom(selectedInsuranceCompanyAtom);
  const selectedInsuranceCompany = useAtomValue(selectedInsuranceCompanyAtom);

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

  const updateCompany = (updatedCompany: InsuranceCompany) => {
    const { notes, name, logo_url } = updatedCompany;
    const logoUrl = uploadedImages.find(
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
        setUploadedImages([]);
        handleCloseModal();
        setIsSubmitting(false);
        successNotification(
          `La compañia ${normalizeString(
            name
          )} ha sido actualizada exitosamente!`
        );
      })
      .catch((err) => {
        setUploadedImages([]);
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

  const onSubmit = (values: InsuranceCompany) => {
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
