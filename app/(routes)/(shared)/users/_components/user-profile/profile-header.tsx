import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { UserContext } from "../../../../../global-hooks/useUser";
import { createAvatarImage } from "@/appUtils/create-avatar";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { useContext } from "react";

//
export const ProfileHeader = () => {
  const { selectedUser } = useContext(UserContext);
  return selectedUser ? (
    <div className="md:flex md:items-center md:justify-between md:space-x-5 px-6">
      <div className="flex items-start space-x-5">
        <div className="shrink-0">
          <div className="relative">
            <Image
              width={120}
              height={120}
              src={
                selectedUser?.user.personal_info.avatar ??
                createAvatarImage(selectedUser.user.personal_info) ??
                "/images/default-avatar.svg"
              }
              className="size-16 rounded-full"
              alt="User Avatar"
            />

            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full shadow-inner"
            />
          </div>
        </div>
        {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
        <div className="pt-1.5">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedUser?.user.personal_info.firstname}{" "}
            {selectedUser?.user.personal_info.lastname}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            {formatPhoneNumberToNationalUSAformat(
              selectedUser?.user.personal_info.phone
            )}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        <button
          type="button"
          className="inline-flex gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        >
          <DocumentTextIcon aria-hidden="true" className="-ml-0.5 size-5" />
          Crear PDF
        </button>
        <button
          type="button"
          className="inline-flex gap-x-2 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-red-300 ring-inset hover:bg-red-400"
        >
          <TrashIcon aria-hidden="true" className="-ml-0.5 size-5" />
          Eliminar
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PencilSquareIcon aria-hidden="true" className="-ml-0.5 size-5" />
          Editar
        </button>
      </div>
    </div>
  ) : null;
};
