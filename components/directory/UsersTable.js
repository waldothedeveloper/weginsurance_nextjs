import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { CreateUserForm } from "@/components/directory/CreateUserForm";
import { DeleteUserActions } from "@/components/directory/DeleteUserActions";
import { Modal } from "@/components/directory/Modal";
import { Spinning } from "@/components/spinning";
import { UpdateUserForm } from "@/components/directory/UpdateUserForm";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useDeleteUserForm } from "@/hooks/useDeleteUserForm";
import { useFirebaseUsers } from "@/hooks/useFirebaseUsers";
import { useNewUserForm } from "@/hooks/useNewUserForm";
import { useUpdateUserForm } from "@/hooks/useUpdateUserForm";

//
export const UsersTable = () => {
  const { firebaseUsers, firebaseError } = useFirebaseUsers();
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

  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }
  if (firebaseUsers?.length === 0) {
    return <Spinning message="Cargando Usuarios" />;
  }
  return (
    <>
      <div className="px-4 sm:px-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Usuarios
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aqui puede crear, eliminar, o actualizar usuarios de la compañia.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
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
        <div className="mt-8 flow-root">
          <div className="-mb-2 overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="max-h-[70vh]">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="sticky top-0 z-50 bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Nombres
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Telefono
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Compañia
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="h-96 divide-y divide-gray-200 overflow-y-auto bg-white">
                    {firebaseUsers.map((person) => (
                      <tr key={person.id}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                          {person.fullname}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Nombres</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {formatPhoneNumber(person.phone)}
                            </dd>
                            <dt className="sr-only sm:hidden">
                              Insurance Company
                            </dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {person.insurance_company}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {formatPhoneNumber(person.phone)}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {person.insurance_company}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          <div className="flex items-center">
                            <span
                              className={
                                person.active_user
                                  ? "mr-2 mt-0.5 h-3 w-3 rounded-full bg-green-500"
                                  : "mr-2 mt-0.5 h-3 w-3 rounded-full bg-red-500"
                              }
                            />
                            {person.active_user ? "Activo" : "Inactivo"}
                          </div>
                        </td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleUpdateModal(person)}
                              type="button"
                              className="inline-flex items-center gap-x-2 rounded-md bg-cyan-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                            >
                              <PencilSquareIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              Editar usuario
                            </button>
                            <button
                              onClick={() => handleDeleteModal(person)}
                              type="button"
                              className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
