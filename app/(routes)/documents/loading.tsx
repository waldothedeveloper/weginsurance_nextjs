import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

/* eslint-disable no-unused-vars */
export default function Loading() {
  return (
    <div className="mx-auto w-full py-12 px-32 overflow-y-scroll">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 bg-gray-300 h-4 w-32 rounded-full" />
          <p className="mt-2 text-sm bg-gray-300 h-2 w-72 rounded-full" />
          <p className="mt-2 text-sm bg-gray-300 h-2 w-60 rounded-full" />
        </div>
        <div className="animate-pulse mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="flex w-full justify-end space-x-3 items-center pointer-events-none">
            <ArrowPathIcon className="mr-1 text-gray-300 h-6 w-6 shadow-xs" />
            <div className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs pointer-events-none">
              <ArrowLongLeftIcon
                className="-mr-0.5 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <div className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs pointer-events-none">
              <ArrowLongRightIcon
                className="-mr-0.5 h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="w-full overflow-scroll divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                  >
                    <div className="bg-gray-300 h-2 w-32 rounded-full" />
                  </th>

                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    <div className="bg-gray-300 h-2 w-32 rounded-full" />
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-3 py-3.5 text-sm font-semibold"
                  >
                    {/* <div className="bg-gray-300 h-2 w-32 rounded-full" /> */}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white animate-pulse">
                {Array(10)
                  .fill(null)
                  .map((_, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 shrink-0">
                            <UserIcon className="h-11 w-11 flex-none rounded-full text-gray-300 bg-gray-100 p-2" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium bg-gray-300 h-2 w-32 rounded-full shadow-xs" />
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        <div className=" bg-gray-300 h-1 w-24 rounded-full shadow-xs" />
                      </td>

                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm sm:pr-0">
                        <div className=" bg-gray-300 h-1 rounded-full shadow-xs" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
