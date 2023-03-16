import { Dialog } from "@headlessui/react";
import { Input } from "@/components/directory/Input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Select } from "@/components/directory/Select";
import { userFormLabels } from "@/utils/userFormLabels";
//
export const CreateUserForm = ({
  register,
  errors,
  handleSubmit,
  submitCreateUser,
  isSubmitting,
  handleCloseModal,
}) => {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <PencilSquareIcon
              className="h-8 w-8 rounded-full text-cyan-600"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Crear Usuario
            </Dialog.Title>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitCreateUser)} className="mt-2 mb-6">
        <div className="m-6 grid grid-cols-2 gap-6">
          {userFormLabels.map((input) => (
            <div key={input.name} className="col-span-1">
              <Input
                errors={errors}
                errorMessage={input.errorMessage}
                htmlFor={input.htmlFor}
                register={register}
                name={input.name}
                isRequired={input.isRequired}
                label={input.label}
                autoComplete={input.autoComplete}
                type={input.type}
              />
            </div>
          ))}
          {/* TODO: Make these Select  a loop too */}
          <div className="col-span-1">
            <Select
              {...register("insurance_company", { required: true })}
              errors={errors}
              htmlFor="insurance_company"
              errorMessage="Por favor elija una compañia"
              options={[
                { value: "", id: 0 },
                { value: "Ambetter", id: 1 },
                { value: "Friday", id: 2 },
              ]}
              name="insurance_company"
              label="Compañia"
            />
          </div>
          <div className="col-span-1">
            <Select
              {...register("gender", { required: true })}
              errors={errors}
              htmlFor="gender"
              errorMessage="Es obligatorio el genero del nuevo usuario"
              options={[
                { value: "", id: 0 },
                { value: "Masculino", id: 1 },
                { value: "Femenino", id: 2 },
              ]}
              name="gender"
              label="Genero"
            />
          </div>
          <div className="col-span-1">
            <Select
              {...register("active_user")}
              errors={errors}
              htmlFor="active_user"
              options={[
                { value: "Si", id: 0 },
                { value: "No", id: 1 },
              ]}
              name="active_user"
              label="Usuario Activo"
            />
          </div>
          {/* notes about the user */}
          <div className="col-span-2">
            <div className="rounded-md">
              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    {...register("notes")}
                    placeholder="ejemplo: La poliza de Ambetter tiene que ser renovada en 6 meses."
                    id="notes"
                    name="notes"
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm sm:ml-3 sm:w-auto"
                : "inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
            }
          >
            Actualizar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

CreateUserForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitCreateUser: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
