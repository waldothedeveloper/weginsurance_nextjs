export const WorkInfo = () => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informacion Laboral
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion laborarl del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="work-type"
                  className="block text-sm font-medium text-gray-800"
                >
                  Tipo de Empleo
                </label>
                <select
                  id="work-type"
                  name="work-type"
                  autoComplete="work-type"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Seleccione una opcion</option>
                  <option>W2</option>
                  <option>1099</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Nombre de la compañia
                </label>
                <input
                  placeholder="Apple"
                  type="text"
                  name="company-name"
                  id="company-name"
                  autoComplete="company-name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* Ingresos anuales */}
              <div className="col-span-6 sm:col-span-3">
                <div>
                  <label
                    htmlFor="wages"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Ingresos Anuales <span className="text-gray-400">(aproximadamente)</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      {/* <span className=" text-gray-500 sm:text-sm">$</span> */}
                    </div>
                    <input
                      type="text"
                      name="wages"
                      id="wages"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full placeholder-gray-400 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="$110.000"
                      aria-describedby="wages"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
