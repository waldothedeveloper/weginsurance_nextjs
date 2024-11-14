import { Control, Controller, UseFormRegister } from "react-hook-form";

import { z } from "zod";
import { registrationSchema } from "../registrationSchema";

//
export default function PersonalInfo({
  register,
  control,
}: {
  register: UseFormRegister<z.infer<typeof registrationSchema>>;
  control: Control<z.infer<typeof registrationSchema>, any>;
}) {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informacion Personal
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion personal del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              {/* Acepta Cobertura Medica SI O NO */}
              <div className="col-span-6 sm:col-span-6">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="accepts_insurance"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <label
                        htmlFor="accepts_insurance"
                        className="block text-sm font-medium text-gray-800"
                      >
                        Acepta Cobertura Medica
                        <span className="text-red-500 ">{` *`}</span>
                      </label>
                      <select
                        id="accepts_insurance"
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value ?? "Seleccione una opcion"}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Seleccione una opcion</option>
                        <option>Si</option>
                        <option>No</option>
                      </select>
                    </>
                  )}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-800"
                >
                  Primer Nombre
                  <span className="text-red-500 ">{` *`}</span>
                </label>
                <input
                  id="firstname"
                  {...register("firstname", { required: true })}
                  type="text"
                  placeholder="Jose"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="second_name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Segundo Nombre
                </label>
                <input
                  id="second_name"
                  {...register("second_name")}
                  type="text"
                  placeholder="Julian"
                  autoComplete="additional-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-800"
                >
                  Primer Apellido
                  <span className="text-red-500 ">{` *`}</span>
                </label>
                <input
                  id="lastname"
                  {...register("lastname", { required: true })}
                  type="text"
                  placeholder="Marti"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="second_lastname"
                  className="block text-sm font-medium text-gray-800"
                >
                  Segundo Apellido
                </label>
                <input
                  {...register("second_lastname")}
                  type="text"
                  placeholder="Perez"
                  id="second_lastname"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="civil_status"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <label
                        htmlFor="civil_status"
                        className="block text-sm font-medium text-gray-800"
                      >
                        Estado Civil
                      </label>
                      <select
                        id="civil_status"
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value ?? "Seleccione una opcion"}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Selecione una opcion</option>
                        <option>Soltero</option>
                        <option>Casado</option>
                        <option>Divorciado</option>
                        <option>Viudo(a)</option>
                        <option>Separado(a)</option>
                      </select>
                    </>
                  )}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="genre"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <label
                        htmlFor="genre"
                        className="block text-sm font-medium text-gray-800"
                      >
                        Genero
                        <span className="text-red-500 ">{` *`}</span>
                      </label>
                      <select
                        id="genre"
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value ?? "Seleccione una opcion"}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Selecione una opcion</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                      </select>
                    </>
                  )}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Correo Electronico
                </label>
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="ejemplo@prueba.com"
                  autoComplete="email"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="ssn"
                  className="block text-sm font-medium text-gray-800"
                >
                  Numero de Seguro Social
                </label>
                <input
                  id="ssn"
                  {...register("ssn")}
                  type="string"
                  inputMode="numeric"
                  placeholder="111-11-1111"
                  autoComplete="ssn"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium text-gray-800"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="birthdate"
                  {...register("birthdate", {
                    valueAsDate: true,
                  })}
                  type="date"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* Contact info such as tel & email */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-800"
                >
                  Telefono
                  <span className="text-red-500 ">{` *`}</span>
                </label>
                <input
                  id="phone"
                  {...register("phone", { required: true })}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="+1-786-521-3075"
                  autoComplete="tel-national"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* Age auto calc after birth date, READ-ONLY */}
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-800"
                >
                  Edad
                </label>
                <input
                  id="age"
                  {...register("age")}
                  readOnly
                  placeholder="basado en la fecha de nacimiento..."
                  type="number"
                  autoComplete="age"
                  className="mt-1 focus:outline-none focus:border-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-400 bg-gray-100"
                />
              </div>

              {/* Address */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-800"
                >
                  Pais / Region
                </label>
                <input
                  id="country"
                  {...register("country")}
                  value="United States"
                  readOnly
                  type="text"
                  autoComplete="country"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-none text-gray-400"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street_address"
                  className="block text-sm font-medium text-gray-800"
                >
                  Direccion (calle, etc)
                </label>
                <input
                  id="street_address"
                  {...register("street_address")}
                  type="text"
                  autoComplete="street-address"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-800"
                >
                  Ciudad
                </label>
                <input
                  id="city"
                  {...register("city")}
                  type="text"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-800"
                >
                  Estado / Provincia
                </label>
                <input
                  id="state"
                  {...register("state")}
                  type="text"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-800"
                >
                  ZIP / Codigo Postal
                </label>
                <input
                  id="postal_code"
                  {...register("postal_code")}
                  type="text"
                  autoComplete="postal-code"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
