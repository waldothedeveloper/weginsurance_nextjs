// import { InsuranceCompany } from "./insurance-company"

export const InsuranceInfo = () => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6 mt-10">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Poliza de Seguro
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar toda la informacion correspondiente a la poliza
              de seguro que ha sido elegida por el cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fecha-de-inscripcion"
                  className="block text-sm font-medium text-gray-800"
                >
                  Fecha de inscripcion
                </label>
                <input
                  // onChange={handleChange}
                  // value={values.fecha_de_inscripcion || ""}
                  type="date"
                  name="fecha_de_inscripcion"
                  id="fecha-de-inscripcion"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="numero-de-poliza"
                  className="block text-sm font-medium text-gray-800"
                >
                  Numero de poliza
                </label>
                <input
                  placeholder="55-55-555"
                  // onChange={handleChange}
                  // value={values.numero_de_poliza || ""}
                  type="number"
                  name="numero_de_poliza"
                  id="numero-de-poliza"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <div>
                  <label
                    htmlFor="prima"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Prima
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className=" text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      // onChange={handleChange}
                      // value={values.prima || ""}
                      type="number"
                      name="prima"
                      id="prima"
                      className="focus:ring-blue-500 focus:border-blue-500  block w-full placeholder-gray-400 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companias de Seguros */}
              <div className="col-span-6 sm:col-span-3">
                {/* <InsuranceCompany
                
                /> */}
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Tipo de Plan
                  </label>
                  <select
                    // onChange={handleChange}
                    // value={values.plan}
                    id="location"
                    name="plan"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500  sm:text-sm rounded-md"
                    defaultValue="Canada"
                  >
                    <option value="Basico">Basico</option>
                    <option value="Medio">Medio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


