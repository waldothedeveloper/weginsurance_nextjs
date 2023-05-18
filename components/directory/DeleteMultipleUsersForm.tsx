import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { RealUser } from "@/interfaces/index";
import { Table } from "@tanstack/react-table";

type DeleteMultipleUsersFormProps = {
  isSubmitting: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDeleteMultipleUsers: (table: Table<RealUser>) => void;
  handleCloseModal: () => void;
  table: Table<RealUser>
}


export const DeleteMultipleUsersForm = ({
  isSubmitting,
  handleDeleteMultipleUsers,
  handleCloseModal,
  table
}: DeleteMultipleUsersFormProps) => {
  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-slate-900"
            >
              Eliminar Multiples Usuarios
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-slate-500">
                Usted esta a punto de eliminar multiples usuarios. Esta
                seguro que desea eliminarlos a todos? Esta accion es irreversible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-400 shadow-sm sm:ml-3 sm:w-auto"
              : "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          }
          onClick={() => handleDeleteMultipleUsers(table)}
        >
          Si, eliminar los usuarios seleccionados
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className={
            isSubmitting
              ? "mt-3 inline-flex w-full justify-center rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400 shadow-sm ring-1 ring-inset ring-slate-300 sm:mt-0 sm:w-auto"
              : "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
          }
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
      </div>
    </>
  )
}