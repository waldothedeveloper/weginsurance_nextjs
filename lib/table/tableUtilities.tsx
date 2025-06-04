import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  FilterFn,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { useFakeUserList } from "@/hooks/test/useFakeUserList";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";
import { RealUser } from "@/interfaces/index";
import { IndeterminateCheckbox } from "@/lib/table/Checkbox";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useMemo } from "react";

type UserTableUtilitiesProps = {
  // eslint-disable-next-line no-unused-vars
  handleUpdateModal: (arg: RealUser) => void;
  // eslint-disable-next-line no-unused-vars
  handleDeleteModal: (arg: RealUser) => void;
};
//
export const UserTableUtilities = ({
  handleUpdateModal,
  handleDeleteModal,
}: UserTableUtilitiesProps) => {
  //! make sure to change this test = false when you're done testing
  const test = false;
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = useState({});
  const { firebaseUsers, firebaseError, isLoadingFirebaseUsers } =
    useFirebaseUsers();
  const fakeUserList = useFakeUserList();
  const totalUserCount = test ? fakeUserList.length : firebaseUsers?.length;
  const columnHelper = createColumnHelper<RealUser>();

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: any) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: any) => (
          <div className="py-3.5">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      columnHelper.accessor((row) => row.fullname, {
        id: "fullname",
        header: () => <span>Nombre y Apellidos</span>,
        cell: (props) => (
          <div>
            <div className="text-base font-medium text-slate-700">
              {props.getValue()}
            </div>

            <div className="whitespace-nowrap font-normal text-slate-500">
              {formatPhoneNumberToNationalUSAformat(
                props?.row?.original.phone as string
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        cell: (props) => (
          <div className="font-normal text-slate-700">{props.getValue()}</div>
        ),
        header: () => <span>Correo electronico</span>,
      }),
      columnHelper.accessor((row) => row.insuranceCompany, {
        id: "insuranceCompany",
        cell: (props) => (
          <div className="relative ml-2 inline-flex items-center justify-center rounded-full border border-slate-300 py-0.5 px-2">
            <span className="absolute flex shrink-0 items-center justify-center">
              <span className="h-1 w-1 rounded-full" aria-hidden="true" />
            </span>
            <span className="truncate text-xs text-slate-800">
              {props.getValue()}
            </span>
          </div>
        ),
        header: () => <span>Compañia de Seguros</span>,
      }),
      columnHelper.accessor((row) => row.activeUser, {
        id: "status",
        header: () => "Estado",
        cell: (props) => (
          <div className="flex items-center">
            <span
              className={
                props.getValue()
                  ? "mr-2 mt-0.5 h-3 w-3 rounded-full bg-green-500"
                  : "mr-2 mt-0.5 h-3 w-3 rounded-full bg-red-500"
              }
            />
            {props.getValue() ? "Activo" : "Inactivo"}
          </div>
        ),
      }),
      columnHelper.display({
        id: "update_or_delete",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <button
              onClick={() => handleUpdateModal(row.original)}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <PencilSquareIcon
                className="-ml-0.5 h-5 w-5"
                aria-hidden="true"
              />
              Editar
            </button>
            <button
              onClick={() => handleDeleteModal(row.original)}
              type="button"
              className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Eliminar
            </button>
          </div>
        ),
      }),
    ],
    [columnHelper, handleUpdateModal, handleDeleteModal]
  );

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data: firebaseUsers || [],
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return {
    totalUserCount,
    table,
    firebaseError,
    fakeUserList,
    firebaseUsers,
    rowSelection,
    globalFilter,
    setGlobalFilter,
    isLoadingFirebaseUsers,
  };
};
