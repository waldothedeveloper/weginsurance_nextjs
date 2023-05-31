import { RealUser } from "@/interfaces/index";
import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export const UserTable = ({ table }: { table: Table<RealUser> }) => {
  return (

    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 sm:px-6 lg:px-8 h-full w-full">
          <table className="min-w-full table-fixed divide-y divide-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <thead key={headerGroup.id}>
                <tr>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className={header.id === "0" ? "relative px-7 sm:w-12 sm:px-6" : "px-3 py-3.5 text-left text-sm font-semibold text-slate-900"}

                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              </thead>
            ))}

            <tbody className="divide-y divide-slate-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={cell.id === '0' ? "relative px-7 sm:w-12 sm:px-6" : "whitespace-nowrap px-3 py-4 text-sm text-slate-500"}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}