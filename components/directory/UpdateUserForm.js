import { Input } from "@/components/directory/Input";
import { Select } from "@/components/directory/Select";

//
export const UpdateUserForm = ({ register, errors }) => {
  return (
    <>
      <div className="my-6 grid grid-cols-2 gap-6">
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
                  className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
