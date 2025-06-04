import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { CreateCompany } from "@/components/companies/CreateCompany";
import { DeleteCompanyActions } from "@/components/companies/DeleteCompanyActions";
import { Modal } from "@/components/companies/Modal";
import { UpdateCompany } from "@/components/companies/UpdateCompany";
import { Spinning } from "@/components/Spinning";
import { useCreateNewCompany } from "@/hooks/insurance_company/useCreateNewCompany";
import { useDeleteCompany } from "@/hooks/insurance_company/useDeleteCompany";
import { useInsuranceCompany } from "@/hooks/insurance_company/useHandleInsuranceCompany";
import { useUpdateCompany } from "@/hooks/insurance_company/useUpdateCompany";
import Image from "next/image";

//
export const InsuranceCompanyTable = () => {
  const { insuranceCompanies, insuranceCompanyError } = useInsuranceCompany();

  const {
    isSubmittingCreateNewCompany,
    registerNewCompany,
    handleSubmitNewCompany,
    errorsNewCompany,
    onSubmitCreateNewCompany,
    handleOpenNewCompanyModal,
    handleCloseNewCompanyModal,
    openNewCompanyModal,
  } = useCreateNewCompany();

  const {
    openDeleteModal,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteCompany,
    isSubmittingDeleteCompany,
    companyToDelete,
  } = useDeleteCompany();

  const {
    isSubmittingUpdateCompany,
    registerUpdateCompany,
    errorsUpdateCompany,
    openUpdateCompanyModal,
    handleOpenUpdateCompanyModal,
    handleCloseUpdateCompanyModal,
    onSubmitUpdateCompany,
    handleSubmitUpdateCompany,
  } = useUpdateCompany();

  if (insuranceCompanyError) {
    return (
      <div>
        ERROR of the application{" "}
        {JSON.stringify(insuranceCompanyError, null, 2)}
      </div>
    );
  }
  if (!insuranceCompanies || insuranceCompanies?.length === 0) {
    return <Spinning message="Cargando Compañias de Seguros" />;
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-slate-900">
              Compañias de Seguros
            </h1>
            <p className="mt-2 text-sm text-slate-700">
              Edite, elimine o actualize informacion sobre las compañias de
              seguros aqui en esta tabla.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={handleOpenNewCompanyModal}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:ml-4"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Crear compañia
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 sm:px-6 lg:px-8">
              <div className="max-h-152 align-middle overflow-y-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-black/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-xs backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Logo
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-black/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-xs backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-black/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-xs backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Notas
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-black/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-xs backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="px-12">
                    {insuranceCompanies.map((company) => (
                      <tr className="border-b bg-white pl-3" key={company?.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="h-16 w-16 shrink-0">
                              {company?.logo_url &&
                              company?.logo_url?.length > 0 ? (
                                <Image
                                  className="h-16 w-16 object-contain"
                                  src={company.logo_url}
                                  alt="insurance company logo"
                                  width={64}
                                  height={64}
                                  priority
                                />
                              ) : (
                                <div className="h-full w-full bg-slate-100" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-slate-900">
                            <div className="font-medium text-slate-900">
                              {company?.name}
                            </div>
                          </div>
                        </td>

                        <td className="max-w-48 px-3 py-4 text-sm text-slate-500">
                          <div className="text-slate-900">
                            <div className="font-medium text-slate-900">
                              {company?.notes}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleOpenUpdateCompanyModal(company)
                              }
                              type="button"
                              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                              <PencilSquareIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              Editar
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(company)}
                              type="button"
                              className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              <TrashIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* create */}
      <Modal
        openModal={openNewCompanyModal}
        handleCloseModal={handleCloseNewCompanyModal}
        action="create"
      >
        <CreateCompany
          isSubmitting={isSubmittingCreateNewCompany}
          register={registerNewCompany}
          handleSubmit={handleSubmitNewCompany}
          errors={errorsNewCompany}
          onSubmit={onSubmitCreateNewCompany}
          closeModal={handleCloseNewCompanyModal}
        />
      </Modal>
      {/* update */}
      <Modal
        openModal={openUpdateCompanyModal}
        handleCloseModal={handleCloseUpdateCompanyModal}
        action="update"
      >
        <UpdateCompany
          isSubmitting={isSubmittingUpdateCompany}
          register={registerUpdateCompany}
          handleSubmit={handleSubmitUpdateCompany}
          errors={errorsUpdateCompany}
          onSubmit={onSubmitUpdateCompany}
          closeModal={handleCloseUpdateCompanyModal}
        />
      </Modal>
      {/* delete */}
      <Modal
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        action="delete"
      >
        <DeleteCompanyActions
          company={companyToDelete}
          isSubmitting={isSubmittingDeleteCompany}
          handleDeleteCompany={handleDeleteCompany}
          handleCloseModal={handleCloseDeleteModal}
        />
      </Modal>
    </>
  );
};
