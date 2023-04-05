import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import Image from "next/image";
import PropTypes from "prop-types";
import { UpdateUserForm } from "@/components/directory/UpdateUserForm";
import female_icon from "@/public/female_icon.png";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import male_icon from "@/public/male_icon.png";
import { normalizeString } from "@/utils/normalizeString";

const SelectedUser = ({ selectedUser }) => {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      {/* First name */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Nombre</dt>
        <dd className="mt-1 text-sm text-slate-900">
          {normalizeString(selectedUser?.firstname)}
        </dd>
      </div>
      {/* Segundo nombre */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Segundo Nombre</dt>
        <dd className="mt-1 text-sm text-slate-900">
          {normalizeString(selectedUser?.second_name)}
        </dd>
      </div>
      {/* Last name */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Primer Apellido</dt>
        <dd className="mt-1 text-sm text-slate-900">
          {normalizeString(selectedUser?.lastname)}
        </dd>
      </div>
      {/* Segundo Apellido */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Segundo Apellido</dt>
        <dd className="mt-1 text-sm text-slate-900">
          {normalizeString(selectedUser?.second_lastname)}
        </dd>
      </div>
      {/* Correo electronico */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">
          Correo electronico
        </dt>
        <dd className="mt-1 text-sm text-slate-900">{selectedUser?.email}</dd>
      </div>
      {/* Compañia de seguros */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">
          Compañia de Seguros
        </dt>
        <dd className="mt-1 text-sm text-slate-900">
          {selectedUser?.insurance_company}
        </dd>
      </div>
      {/* Phone */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Telefono</dt>
        <dd className="mt-1 text-sm text-slate-900">
          {formatPhoneNumber(selectedUser?.phone)}
        </dd>
      </div>
      {/* Genero */}
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-slate-500">Genero</dt>
        <dd className="mt-1 text-sm text-slate-900">{selectedUser?.gender}</dd>
      </div>

      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-slate-500">Notas</dt>
        <dd className="mt-1 max-w-prose space-y-5 text-sm text-slate-900">
          {selectedUser?.notes}
        </dd>
      </div>
    </dl>
  );
};

export const UserDetails = ({
  submitUpdateUser,
  register,
  errors,
  handleSubmit,
  selectedUser,
  handleOpenModal,
  handleUpdateUser,
  updateUser,
  isSubmitting,
}) => {
  return (
    <article className="relative w-full">
      {/* Profile header */}
      <div>
        <div className="relative h-32 w-full lg:h-48">
          {/* background profile cover image */}
          <Image
            className="object-cover"
            src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="background profile image"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            fill
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="relative h-24 w-24 sm:h-32 sm:w-32">
              {selectedUser?.gender === "Masculino" ? (
                <Image
                  className="rounded-full ring-4 ring-white"
                  src={male_icon}
                  alt="male icon"
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Image
                  className="rounded-full ring-4 ring-white"
                  src={female_icon}
                  alt="female icon"
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  style={{ objectFit: "cover" }}
                />
              )}

              {selectedUser?.active_user ? (
                <CheckBadgeIcon className="absolute bottom-0 right-0 block h-8 w-8 rounded-full bg-green-400 text-white" />
              ) : (
                <XMarkIcon className="absolute bottom-0 right-0 block h-8 w-8 rounded-full bg-red-400 p-0.5 text-white" />
              )}
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-slate-900">
                  {normalizeString(selectedUser?.fullname)}
                </h1>
              </div>
              <form onSubmit={handleSubmit(submitUpdateUser)}>
                <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  {updateUser ? (
                    <button
                      disabled={isSubmitting || false}
                      onClick={handleUpdateUser}
                      type="button"
                      className={
                        isSubmitting
                          ? "inline-flex justify-center rounded-md border border-slate-300 bg-slate-300 px-4 py-2 text-sm text-slate-400"
                          : "inline-flex justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      }
                    >
                      <XMarkIcon
                        className="-ml-1 mr-2 h-5 w-5 text-slate-400"
                        aria-hidden="true"
                      />
                      <span>Cancelar</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdateUser}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <PencilSquareIcon
                        className="-ml-1 mr-2 h-5 w-5 text-slate-400"
                        aria-hidden="true"
                      />
                      <span>Editar</span>
                    </button>
                  )}
                  {updateUser ? (
                    <button
                      disabled={isSubmitting || false}
                      type="submit"
                      className={
                        isSubmitting
                          ? "inline-flex justify-center rounded-md border border-slate-300 bg-slate-300 px-4 py-2 text-sm text-slate-400"
                          : "inline-flex justify-center rounded-md border border-blue-600 bg-blue-500 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      }
                    >
                      <CheckIcon
                        className="-ml-1 mr-2 h-5 w-5 text-blue-50"
                        aria-hidden="true"
                      />
                      <span>Guardar</span>
                    </button>
                  ) : (
                    <button
                      disabled={isSubmitting || false}
                      onClick={handleOpenModal}
                      type="button"
                      className={
                        isSubmitting
                          ? "inline-flex justify-center rounded-md border border-slate-300 bg-slate-300 px-4 py-2 text-sm text-slate-400"
                          : "inline-flex justify-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium text-red-50 shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      }
                    >
                      <TrashIcon
                        className="-ml-1 mr-2 h-5 w-5 text-red-50"
                        aria-hidden="true"
                      />
                      <span>Eliminar</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-slate-900">
              {normalizeString(selectedUser?.fullname)}
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        {updateUser ? (
          <UpdateUserForm register={register} errors={errors} />
        ) : (
          <SelectedUser selectedUser={selectedUser} />
        )}
      </div>
    </article>
  );
};

UserDetails.propTypes = {
  selectedUser: PropTypes.shape({
    active_user: PropTypes.bool,
    id: PropTypes.string.isRequired,
    insurance_company: PropTypes.string.isRequired,
    email: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    gender: PropTypes.string,
    lastname: PropTypes.string.isRequired,
    notes: PropTypes.string,
    phone: PropTypes.string.isRequired,
    second_lastname: PropTypes.string,
    second_name: PropTypes.string,
  }),
  handleOpenModal: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  updateUser: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitUpdateUser: PropTypes.func.isRequired,
};
