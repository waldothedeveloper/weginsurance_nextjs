export const PersonalInfo = () => {
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
          <div className="px-4 py-5 bg-gray-100 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="nombres"
                  className="block text-sm font-medium text-gray-800"
                >
                  Nombres
                </label>
                <input
                  placeholder="Jose Julian"
                  type="text"
                  name="nombres"
                  id="nombres"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="apellidos"
                  className="block text-sm font-medium text-gray-800"
                >
                  Apellidos
                </label>
                <input
                  placeholder="Marti Perez"
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  autoComplete="family-name"
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
                  placeholder="111-11-1111"
                  type="number"
                  name="ssn"
                  id="ssn"
                  autoComplete="ssn"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fecha-de-nacimiento"
                  className="block text-sm font-medium text-gray-800"
                >
                  Fecha de nacimiento
                </label>
                <input

                  type="date"
                  name="fecha_de_inscripcion"
                  id="fecha-de-nacimiento"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* Age auto calc after birth date, READ-ONLY */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="edad"
                  className="block text-sm font-medium text-gray-800"
                >
                  Edad
                </label>
                <input
                  placeholder="35"
                  type="number"
                  name="edad"
                  id="edad"
                  autoComplete="age"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              {/* Contact info such as tel & email */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-800"
                >
                  Telefono
                </label>
                <input
                  placeholder="+1-786-521-3075"
                  type="number"
                  name="number"
                  id="number"
                  autoComplete="tel"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Estados Unidos</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-800"
                >
                  Direccion (calle, etc)
                </label>
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
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
                  type="text"
                  name="city"
                  id="city"
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
                  type="text"
                  name="state"
                  id="state"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-800"
                >
                  ZIP / Codigo Postal
                </label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}