export const UserNotes = ({ register }) => {
  return (
    <div className="mt-12">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-slate-800">
              Notas
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              Aqui puede llenar cualquier nota importante sobre el cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="rounded-md px-4 py-5 sm:p-6">
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
    </div>
  );
};
