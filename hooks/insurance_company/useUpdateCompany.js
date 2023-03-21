import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";

import { deleteStorageFile } from "@/lib/insurance_company/deleteStorageFile";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeString } from "@/utils/normalizeString";
import { storage } from "@/lib/firebaseConfig";
import { successNotification } from "@/components/notifications/successNotification";
import { updateInsuranceCompany } from "@/lib/insurance_company/updateInsuranceCompany";
import { useForm } from "react-hook-form";

//
export const useUpdateCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      name: selectedCompany?.name,
      notes: selectedCompany?.notes,
      logo_url: selectedCompany?.logo_url || "",
      fileName: selectedCompany?.fileName || "",
      id: selectedCompany?.id,
    });
  }, [selectedCompany, reset]);

  const handleOpenModal = useCallback((company) => {
    setOpenModal(true);
    setSelectedCompany(company);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedCompany(null);
  }, []);

  const handleUpload = async (file, values) => {
    const normalizedCompanyName = normalizeString(values?.name);
    const metadata = {
      contentType: file[0]?.type,
    };

    if (!values) return null;

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
        failureNotification(
          `La compañia ${normalizedCompanyName} no pudo ser actualizada. Por favor, intente de nuevo. ${error}`
        );
        handleCloseModal();
        throw new Error(`Error trying to upload the logo file`, error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const { id, fileName } = selectedCompany;
          const updatedCompany = {
            name: normalizedCompanyName,
            notes: values.notes,
            logo_url: downloadURL,
            fileName: file.name,
          };
          // 2- update the company
          await updateInsuranceCompany(updatedCompany, id);

          // 3 delete the old company logo
          if (fileName && fileName?.length > 0) {
            await deleteStorageFile(fileName);
          }

          setIsSubmitting(false);
          handleCloseModal();
          successNotification(
            `La compañia ${normalizedCompanyName} fue actualizada exitosamente.`
          );
          return downloadURL;
        } catch (err) {
          setIsSubmitting(false);
          handleCloseModal();
          throw new Error(`Error trying to upload the logo file`, err);
        }
      }
    );
  };

  const onSubmit = async (...args) => {
    const { id } = selectedCompany;
    setIsSubmitting(true);
    // means there's no logo to update
    if (args.length === 2 && args[1].length === 0) {
      const { name, notes } = args[0];
      const updatedCompany = {
        name,
        notes,
      };

      try {
        await updateInsuranceCompany(updatedCompany, id);
        setIsSubmitting(false);
        handleCloseModal();
        successNotification(`La compañia ${name} fue actualizada exitosamente`);
      } catch (err) {
        setIsSubmitting(false);
        handleCloseModal();
        failureNotification(
          `La compañia ${name} no pudo ser actualizada. Por favor, intente de nuevo.`
        );
        throw err;
      }
    } else {
      // we should have an updated logo
      const { name } = args[1][0];
      if (name) {
        try {
          const file = new File(args[1], name);
          await handleUpload(file, args[0]);
        } catch (err) {
          setIsSubmitting(false);
          handleCloseModal();
          throw err;
        }
      }
    }
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
    selectedCompanyToUpdate: selectedCompany,
    progressUpdateCompany: progresspercent,
  };
};
