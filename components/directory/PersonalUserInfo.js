import { Input } from "@/components/directory/Input";
import { Select } from "@/components/directory/Select";

//
export const PersonalUserInfo = ({ register, errors }) => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-800">
              Informacion Personal
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              Aqui debe llenar la informacion personal del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5  sm:p-6 rounded-md">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage="El nombre es obligatorio"
                  htmlFor="firstname"
                  register={register}
                  name="firstname"
                  placeholder="Jose"
                  isRequired={true}
                  label="Nombre"
                  autoComplete="given-name"
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage=""
                  htmlFor="second_name"
                  register={register}
                  name="second_name"
                  placeholder="Julian"
                  isRequired={false}
                  label="Segundo Nombre"
                  autoComplete="given-name"
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage="El apellido es obligatorio"
                  htmlFor="lastname"
                  register={register}
                  name="lastname"
                  placeholder="Marti"
                  isRequired={true}
                  label="Primer Apellido"
                  autoComplete="family-name"
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage=""
                  htmlFor="second_lastname"
                  register={register}
                  name="second_lastname"
                  placeholder="Perez"
                  isRequired={false}
                  label="Segundo Apellido"
                  autoComplete="family-name"
                  type="text"
                />
              </div>

              {/* Contact info such as tel & email */}
              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage="El numero de telefono es obligatorio"
                  htmlFor="phone"
                  register={register}
                  name="phone"
                  placeholder="(305) 555-5555"
                  isRequired={true}
                  label="Telefono"
                  autoComplete="tel"
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  errors={errors}
                  errorMessage=""
                  htmlFor="email"
                  register={register}
                  name="email"
                  placeholder="correo@electronico.com"
                  isRequired={false}
                  label="Correo Electronico"
                  autoComplete="email"
                  type="email"
                />
              </div>
              {/* Insurance Company */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  {...register("insurance_company", { required: true })}
                  errors={errors}
                  htmlFor="insurance_company"
                  errorMessage="Por favor elija una compañia"
                  options={["", "Ambetter", "Friday"]}
                  name="insurance_company"
                  label="Compañia"
                />
              </div>
              {/* Genero */}
              <div className="col-span-6 sm:col-span-3">
                <Select
                  {...register("genre", { required: true })}
                  errors={errors}
                  htmlFor="genre"
                  errorMessage="Es obligatorio el genero del nuevo usuario"
                  options={["", "Masculino", "Femenino"]}
                  name="genre"
                  label="Genero"
                />
              </div>
              {/* Active */}
              <div className="col-span-6 sm:col-span-1">
                <Select
                  {...register("active_user")}
                  errors={errors}
                  htmlFor="active_user"
                  options={["Si", "No"]}
                  name="active_user"
                  label="Usuario Activo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
