import { CreateUserForm } from "@/components/directory/CreateUserForm";
import { DeleteUserActions } from "@/components/directory/DeleteUserActions";
import { Error } from "@/components/Error";
import { Modal } from "@/components/directory/Modal";
import { Pagination } from "@/components/directory/user_pagination/pagination";
import { PlusIcon } from "@heroicons/react/20/solid";
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
  const comp = insuranceCompanies?.map((company) => {
    return { value: company.name, id: company.id };
  });

  // new user
  const {
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
    registerUpdateUserForm,
    handleUpdateUserForm,
    setOpenUpdateUserModal,
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
      <Error
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
      <div>
        <div className="flex flex-col justify-center px-4 sm:px-6">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Usuarios
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Directorio de busqueda de{` `}
              {totalUserCount} usuarios
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
                  className="block w-full rounded-md border-0 py-1.5 pr-32 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>
            {/* Create user button */}
            <div className="">
              <button
                onClick={handleCreateUserModal}
                type="button"
                className="inline-flex items-center gap-x-2 rounded-md bg-cyan-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 lg:ml-4"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Crear usuario
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mb-2 overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="max-h-[70vh] overflow-y-auto">
                <table className="w-full text-left text-sm text-gray-500">
                  <thead className="sticky top-0 bg-gray-100 text-xs  uppercase text-gray-700">
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
          handleCloseModal={setOpenUpdateUserModal}
          action="update"
        >
          <UpdateUserForm
            companiesError={insuranceCompanyError}
            companies={comp}
            register={registerUpdateUserForm}
            errors={errorsUpdateUserForm}
            handleSubmit={handleUpdateUserForm}
            submitUpdateUser={submitUpdateUser}
            handleCloseModal={setOpenUpdateUserModal}
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
            companiesError={insuranceCompanyError}
            companies={comp}
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
