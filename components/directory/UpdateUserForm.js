import { Input } from "@/components/directory/Input";
import { Select } from "@/components/directory/Select";
import { XMarkIcon } from "@heroicons/react/24/outline";
//
export const UpdateUserForm = ({
  register,
  errors,
  isSubmitting,
  handleSubmit,
  submitUpdateUser,
  handleCloseModal,
}) => {
  return (
    <>
      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
        <button
          type="button"
          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={handleCloseModal}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit(submitUpdateUser)} className="mb-6 mt-12">
        <div className="m-6 grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage="El nombre es obligatorio"
              htmlFor="firstname"
              register={register}
              name="firstname"
              isRequired
              label="Nombre"
              autoComplete="given-name"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage=""
              htmlFor="second_name"
              register={register}
              name="second_name"
              isRequired={false}
              label="Segundo Nombre"
              autoComplete="given-name"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage="El apellido es obligatorio"
              htmlFor="lastname"
              register={register}
              name="lastname"
              isRequired
              label="Primer Apellido"
              autoComplete="family-name"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage=""
              htmlFor="second_lastname"
              register={register}
              name="second_lastname"
              isRequired={false}
              label="Segundo Apellido"
              autoComplete="family-name"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage="El numero de telefono es obligatorio"
              htmlFor="phone"
              register={register}
              name="phone"
              isRequired
              label="Telefono"
              autoComplete="tel"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <Input
              errors={errors}
              errorMessage=""
              htmlFor="email"
              register={register}
              name="email"
              isRequired={false}
              label="Correo Electronico"
              autoComplete="email"
              type="email"
            />
          </div>
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
        </div>
      </form>
    </>
  );
};
