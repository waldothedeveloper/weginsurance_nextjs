"use client";

import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useContext, useState } from "react";

import Image from "next/image";
import NoUserSelected from "./no-user-selected";
import { UserContext } from "../../../../../global-hooks/useUser";
import { classNames } from "@/utils/classNames";
import { createAvatarImage } from "@/appUtils/create-avatar";
import dynamic from "next/dynamic";

// TODO: Implement React.lazy with Suspense instead of dynamic imports because it will give a nice loading state instead of just a blank page for these components
const UserInfo = dynamic(() => import("./info"), { ssr: false });
const InsurancePolicy = dynamic(() => import("./insurance-policy"), {
  ssr: false,
});

const LegalStatus = dynamic(() => import("./legal-status"), { ssr: false });
const WorkInfo = dynamic(() => import("./work-info"), { ssr: false });

export const UserProfile = () => {
  const { selectedUser } = useContext(UserContext);

  const [tabs, setTabs] = useState([
    { name: "Personal", current: true },
    { name: "Seguros", current: false },
    { name: "Estatus Legal", current: false },
    { name: "Laboral", current: false },
  ]);
  return selectedUser ? (
    <article>
      <div className="h-32 w-full lg:h-48 bg-linear-to-r from-blue-50 to-cyan-100"></div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="rounded-full ring-4 ring-gray-100 sm:size-32 size-24 relative bg-gray-50">
            <div className="rounded-full ring-4 ring-gray-100 sm:size-32 size-24 relative bg-gray-50">
              {selectedUser && (
                <Image
                  fill
                  src={
                    selectedUser.user.personal_info.avatar ||
                    createAvatarImage(selectedUser.user.personal_info)
                  }
                  className="rounded-full shadow-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="User Avatar"
                />
              )}
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {selectedUser.user.personal_info.firstname}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <DocumentTextIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  PDF
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilSquareIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  Editar
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <TrashIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {selectedUser.user.personal_info.firstname}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.name}
                  onClick={() => {
                    const currTab = tab;
                    currTab.current = true;
                    setTabs(
                      tabs.map((t) =>
                        t.name === currTab.name
                          ? currTab
                          : { ...t, current: false }
                      )
                    );
                  }}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Description list */}
      {selectedUser && (
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          {tabs[0].current && <UserInfo />}
          {tabs[1].current && <InsurancePolicy />}
          {tabs[2].current && <LegalStatus />}
          {tabs[3].current && <WorkInfo />}
        </div>
      )}
    </article>
  ) : (
    <NoUserSelected />
  );
};
