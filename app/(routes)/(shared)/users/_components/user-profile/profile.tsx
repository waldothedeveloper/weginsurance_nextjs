"use client";

import { useContext, useState } from "react";

import NoUserSelected from "./no-user-selected";
import { ProfileHeader } from "./profile-header";
import { UserContext } from "../../../../../global-hooks/useUser";
import { classNames } from "@/utils/classNames";
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
      <ProfileHeader />

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
