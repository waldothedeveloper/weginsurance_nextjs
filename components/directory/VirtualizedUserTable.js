import { PlusIcon, UserPlusIcon } from "@heroicons/react/20/solid";

import { CreateUserForm } from "@/components/directory/CreateUserForm";
import { DeleteUserActions } from "@/components/directory/DeleteUserActions";
import { ErrorComponent } from "@/components/Error";
import { Modal } from "@/components/directory/Modal";
import { Pagination } from "@/components/directory/user_pagination/pagination";
import { Spinning } from "@/components/Spinning";
import { UpdateUserForm } from "@/components/directory/UpdateUserForm";
import { UserTableUtilities } from "@/lib/table/user_table_utilities";
import { flexRender } from "@tanstack/react-table";
import { useDeleteUserForm } from "@/hooks/user_directory/useDeleteUserForm";
import { useInsuranceCompany } from "@/hooks/insurance_company/useHandleInsuranceCompany";
import { useNewUserForm } from "@/hooks/user_directory/useNewUserForm";
import { useUpdateUserForm } from "@/hooks/user_directory/useUpdateUserForm";

//
export const VirtualizedUserTable = () => {
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
    openDeleteUserModal,
    userToDelete,
    handleDeleteUser,
    handleDeleteModal,
    handleDeleteCloseModal,
    isSubmittingUserDelete,
  } = useDeleteUserForm();

  const { totalUserCount, table, firebaseError, firebaseUsers } =
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
  if (firebaseUsers?.length === 0) {
    return <Spinning message="Cargando Usuarios" />;
  }
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex flex-col justify-center px-4 sm:px-6">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-slate-900">
              Usuarios
            </h1>
            <p className="mt-2 text-sm text-slate-700">
              Directorio de busqueda de {totalUserCount} usuarios
            </p>
          </div>
          {/* Search bar */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="relative mt-2 flex items-center">
                <input
                  placeholder="Buscar usuario"
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-0 py-1.5 pr-32 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-slate-200 px-1 font-sans text-xs text-slate-400">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>
            {/* Create user button */}
            <div>
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
                  <UserPlusIcon
                    className="-ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mb-2 overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="max-h-[77vh] overflow-y-auto">
                <table className="w-full text-left text-sm text-slate-500">
                  <thead className="sticky top-0 z-20 bg-slate-100  text-xs uppercase text-slate-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th scope="col" className="px-6 py-3" key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr className="border-b bg-white" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td className="px-6 py-4" key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination table={table} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
