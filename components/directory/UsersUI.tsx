import { PlusIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/20/solid";

import { CreateUserForm } from "@/components/directory/CreateUserForm";
import { DebouncedInput } from "@/lib/table/DebouncedInput";
import { DeleteMultipleUsersForm } from "@/components/directory/DeleteMultipleUsersForm";
import { DeleteUserActions } from "@/components/directory/DeleteUserActions";
import { EmptyUserState } from "@/components/directory/EmptyUserState";
import { ErrorComponent } from "@/components/Error";
import { Modal } from "@/components/directory/Modal";
import { Pagination } from "@/components/directory/user_pagination/pagination";
import { Spinning } from "@/components/Spinning";
import { UpdateUserForm } from "@/components/directory/UpdateUserForm";
import { UserTable } from "@/components/directory/UserTable";
import { UserTableUtilities } from "@/lib/table/tableUtilities";
import { useDeleteUserForm } from "@/hooks/user_directory/useDeleteUserForm";
import { useInsuranceCompany } from "@/hooks/insurance_company/useHandleInsuranceCompany";
import { useNewUserForm } from "@/hooks/user_directory/useNewUserForm";
import { useUpdateUserForm } from "@/hooks/user_directory/useUpdateUserForm";

//
export const UsersUI = () => {
  const { insuranceCompanies, insuranceCompanyError } = useInsuranceCompany();
  const filteredInsuranceCompanies = insuranceCompanies?.map((company) => {
    return { value: company.name, id: company.id };
  });


  // new user
  const {
    setValueNewUserForm,
    registerNewUserForm,
    handleSubmitNewUserForm,
    errorsNewUserForm,
    onSubmitNewUserForm,
    isSubmittingNewUserForm,
    openCreateUserModal,
    handleCreateUserModal,
    handleCloseCreateUserModal,
  } = useNewUserForm();
  // update user
  const {
    setValueUpdateUserForm,
    registerUpdateUserForm,
    handleUpdateUserForm,
    handleCloseUpdateModal,
    errorsUpdateUserForm,
    submitUpdateUser,
    handleUpdateModal,
    isSubmittingUpdateUserForm,
    openUpdateUserModal,
  } = useUpdateUserForm();
  // delete user
  const {
    openDeleteMultipleUsers,
    openDeleteUserModal,
    userToDelete,
    handleDeleteUser,
    handleDeleteModal,
    handleDeleteCloseModal,
    isSubmittingUserDelete,
    handleCloseDeleteMultipleUsers,
    handleOpenDeleteMultipleUsersModal,
    handleDeleteMultipleUsers,
  } = useDeleteUserForm();

  const { totalUserCount, table, firebaseError, firebaseUsers, rowSelection, globalFilter, setGlobalFilter, isLoadingFirebaseUsers } =
    UserTableUtilities({ handleDeleteModal, handleUpdateModal });

  if (firebaseError) {
    return (
      <ErrorComponent
        error_message={
          firebaseError ||
          "Hemos encontrado un error inesperado. Intentelo nuevamente o contacte al soporte tecnico si el error persiste."
        }
      />
    );
  }

  if (!firebaseUsers || isLoadingFirebaseUsers) {
    return <Spinning message="Cargando Usuarios" />;
  }


  if (firebaseUsers?.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
        <EmptyUserState>
          <div>
            {/* Create user button */}
            <button
              onClick={handleCreateUserModal}
              type="button"
              className="hidden items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:inline-flex lg:ml-4"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Crear usuario
            </button>
            <span className="inline-flex md:hidden">
              <button
                onClick={handleCreateUserModal}
                type="button"
                className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <UserPlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              </button>
            </span>
          </div>
        </EmptyUserState>
        {/* create action */}
        {openCreateUserModal && (
          <Modal
            openModal={openCreateUserModal}
            handleCloseModal={handleCloseCreateUserModal}
            action="create"
          >
            <CreateUserForm
              setValue={setValueNewUserForm}
              companiesError={insuranceCompanyError}
              companies={filteredInsuranceCompanies}
              register={registerNewUserForm}
              errors={errorsNewUserForm}
              handleSubmit={handleSubmitNewUserForm}
              submitCreateUser={onSubmitNewUserForm}
              isSubmitting={isSubmittingNewUserForm}
              handleCloseModal={handleCloseCreateUserModal}
            />
          </Modal>
        )}
      </div>
    )


  }


  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
        <div className="sm:flex-auto items-center">
          <h1 className="text-base font-semibold leading-6 text-slate-900">
            Usuarios
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            {Object.keys(rowSelection).length > 0
              ? `Ha seleccionado ${Object.keys(rowSelection).length
              } de un total de ${totalUserCount} usuarios`
              : `Directorio de busqueda de ${totalUserCount} usuarios`}
          </p>
        </div>
        {/* Search bar */}
        <div className="mt-6 flex items-end justify-between">
          <DebouncedInput
            type="text"
            name="search"
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            cssValues="block w-full rounded-md border-0 py-1.5 pr-32 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Buscar usuarios..."
          />

          <div>
            {/* Delete Multiple Users */}
            {Object.keys(rowSelection).length > 0 && (
              <button
                onClick={() => handleOpenDeleteMultipleUsersModal(rowSelection)}
                type="button"
                className="hidden items-center gap-x-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 md:inline-flex lg:ml-4"
              >
                <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Eliminar {Object.keys(rowSelection).length} usuarios
              </button>
            )}
            {/* Create user button */}
            <button
              onClick={handleCreateUserModal}
              type="button"
              className="hidden items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:inline-flex lg:ml-4"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Crear usuario
            </button>
            <span className="inline-flex md:hidden">
              <button
                onClick={handleCreateUserModal}
                type="button"
                className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <UserPlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
        <UserTable table={table} />
      </div>
      <Pagination table={table} />
      {/* delete action */}
      {openDeleteUserModal && (
        <Modal
          openModal={openDeleteUserModal}
          handleCloseModal={handleDeleteCloseModal}
          action="delete"
        >
          <DeleteUserActions
            user={userToDelete?.fullname}
            isSubmitting={isSubmittingUserDelete}
            handleDeleteUser={handleDeleteUser}
            handleCloseModal={handleDeleteCloseModal}
          />
        </Modal>
      )}
      {/* delete MULTIPLE Users  */}
      {openDeleteMultipleUsers && (
        <Modal
          action="delete"
          openModal={openDeleteMultipleUsers}
          handleCloseModal={handleCloseDeleteMultipleUsers}
        >
          <DeleteMultipleUsersForm
            isSubmitting={isSubmittingUserDelete}
            handleCloseModal={handleCloseDeleteMultipleUsers}
            handleDeleteMultipleUsers={handleDeleteMultipleUsers}
            table={table}
          />
        </Modal>
      )}
      {/* update action */}
      {openUpdateUserModal && (
        <Modal
          openModal={openUpdateUserModal}
          handleCloseModal={handleCloseUpdateModal}
          action="update"
        >
          <UpdateUserForm
            setValue={setValueUpdateUserForm}
            companiesError={insuranceCompanyError}
            companies={filteredInsuranceCompanies}
            register={registerUpdateUserForm}
            errors={errorsUpdateUserForm}
            handleSubmit={handleUpdateUserForm}
            submitUpdateUser={submitUpdateUser}
            handleCloseModal={handleCloseUpdateModal}
            isSubmitting={isSubmittingUpdateUserForm}
          />
        </Modal>
      )}

      {/* create action */}
      {openCreateUserModal && (
        <Modal
          openModal={openCreateUserModal}
          handleCloseModal={handleCloseCreateUserModal}
          action="create"
        >
          <CreateUserForm
            setValue={setValueNewUserForm}
            companiesError={insuranceCompanyError}
            companies={filteredInsuranceCompanies}
            register={registerNewUserForm}
            errors={errorsNewUserForm}
            handleSubmit={handleSubmitNewUserForm}
            submitCreateUser={onSubmitNewUserForm}
            isSubmitting={isSubmittingNewUserForm}
            handleCloseModal={handleCloseCreateUserModal}
          />
        </Modal>
      )}
    </>
  );
};
