import { useCallback, useState } from "react";

import { deleteInsuranceCompany } from "@/lib/insurance_company/deleteInsuranceCompany";
import { deleteStorageFile } from "@/lib/insurance_company/deleteStorageFile";
import { failureNotification } from "@/components/notifications/failureNotification";
import { successNotification } from "@/components/notifications/successNotification";

//
export const useDeleteCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = useCallback((company) => {
    setOpenModal(true);
    setCompanyToDelete(company);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleDeleteCompany = () => {
    if (!companyToDelete)
      throw new Error(
        `Please provide a company object to delete!. The companyToDelete is: ${companyToDelete}`
      );
    const { id, logo_url, name } = companyToDelete;

    if (
      logo_url?.length > 0 &&
      companyToDelete?.fileName &&
      companyToDelete?.fileName.length > 0
    ) {
      const { fileName } = companyToDelete;
      const deleteOps = [
        deleteInsuranceCompany(id),
        deleteStorageFile(fileName),
      ];

      Promise.all(deleteOps)
        .then(() => {
          handleCloseModal();
          setIsSubmitting(false);
          successNotification(
            `La compañia ${name} ha sido eliminada exitosamente.`
          );
          setCompanyToDelete(null);
        })
        .catch((err) => {
          setIsSubmitting(false);
          handleCloseModal();
          failureNotification(
            `Ha ocurrido un error al intentar borrar la compañia ${name}. Intentelo nuevamente o contacte el soporte tecnico con este error: ${err}`
          );
          setCompanyToDelete(null);
        });
    } else {
      setIsSubmitting(true);
      // just delete the company document
      deleteInsuranceCompany(id)
        .then(() => {
          handleCloseModal();
          setIsSubmitting(false);
          successNotification(
            `La compañia ${name} ha sido eliminada exitosamente.`
          );
          setCompanyToDelete(null);
        })
        .catch((err) => {
          setIsSubmitting(false);
          handleCloseModal();
          failureNotification(
            `Ha ocurrido un error al intentar borrar la compañia ${name}. Intentelo nuevamente o contacte el soporte tecnico con este error: ${err}`
          );
          setCompanyToDelete(null);
          return err;
        });
    }
  };

  return {
    openDeleteModal: openModal,
    handleCloseDeleteModal: handleCloseModal,
    handleOpenDeleteModal: handleOpenModal,
    handleDeleteCompany,
    isSubmittingDeleteCompany: isSubmitting,
    companyToDelete,
  };
};
