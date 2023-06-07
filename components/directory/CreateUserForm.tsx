import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Dialog } from "@headlessui/react";
import { ErrorComponent } from "@/components/Error";
import { Input } from "@/components/directory/Input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { RealUser } from "@/interfaces/index";
import { Select } from "@/components/directory/Select";
import { userFormLabels } from "@/utils/userFormLabels";

type CreateUserFormProps = {
  setValue: UseFormSetValue<FieldValues>,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  handleSubmit: any,
  // eslint-disable-next-line no-unused-vars
  submitCreateUser: (formInputs: RealUser) => Promise<void>,
  isSubmitting: boolean,
  handleCloseModal: () => void,
  companies: { value: string; id: string | undefined; }[] | undefined,
  companiesError: unknown,
}
//
export const CreateUserForm = ({
  setValue,
  register,
  errors,
  handleSubmit,
  submitCreateUser,
  isSubmitting,
  handleCloseModal,
  companies,
  companiesError,
}: CreateUserFormProps) => {
  if (companiesError) {
    return (
      <ErrorComponent
        error_message={
          companiesError ||
          "Ha ocurrido un error inesperado. Intentelo nuevamente."
        }
      />
    );
  }
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <PencilSquareIcon
              className="h-8 w-8 rounded-full text-blue-600"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-slate-900"
            >
              Crear Usuario
            </Dialog.Title>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitCreateUser)} className="mb-6 mt-2">
        <div className="m-6 grid grid-cols-2 gap-6">
          {userFormLabels.map((input) => (
            <div key={input.name} className="col-span-1">
              <Input
                setValue={setValue}
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
              {...register("insuranceCompany", { required: true })}
              errors={errors}
              htmlFor="insuranceCompany"
              errorMessage="Por favor elija una compañia"
              options={companies}
              name="insuranceCompany"
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
              {...register("activeUser")}
              errors={errors}
              htmlFor="activeUser"
              options={[
                { value: "Si", id: 0 },
                { value: "No", id: 1 },
              ]}
              name="activeUser"
              label="Usuario Activo"
            />
          </div>
          {/* notes about the user */}
          <div className="col-span-2">
            <div className="rounded-md">
              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-slate-700"
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
                    className="block w-full rounded-md border border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                ? "inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-400 shadow-sm sm:ml-3 sm:w-auto"
                : "inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            }
          >
            Crear usuario
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

