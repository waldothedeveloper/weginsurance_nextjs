export const Pagination = ({ table }) => {
  return (
    <nav
      className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Pagina{" "}
          <span className="font-medium">
            {" "}
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          de <span className="font-medium">{table.getPageCount()}</span> en
          total
        </p>
      </div>
      <div className="ml-6">
        <select
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-3">
        <span className="flex items-center gap-1 text-sm text-gray-700">
          | Ir a la pagina:
          <input
            className="block w-10 rounded-md border-0 p-1.5 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            type="text"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          type="button"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
          className={
            !table?.getCanPreviousPage()
              ? "relative ml-3 inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300"
              : "relative ml-3 inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-cyan-800 focus-visible:outline-offset-0"
          }
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
          className={
            !table?.getCanNextPage()
              ? "relative ml-3 inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300"
              : "relative ml-3 inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-cyan-800 focus-visible:outline-offset-0"
          }
        >
          Proximo
        </button>
      </div>
    </nav>
  );
};
