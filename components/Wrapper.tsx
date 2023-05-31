import { NextRouter, useRouter } from "next/router";

import { AsideComponent } from "@/components/dashboard/AsideComponent";
import { Conversation } from "@/components/messaging/Conversation";
import { InsuranceCompanyTable } from "@/components/companies/InsuranceCompanyTable";
import { MainComponent } from "@/components/dashboard/MainComponent";
import { NovuNotificationsCenter } from "@/components/notifications/NovuConfig";
import { UserFormWrapper } from "@/components/directory/UserFormWrapper";
import { UsersUI } from "@/components/directory/UsersUI";
import { VirtualizedUserList } from "@/components/directory/VirtualizedUserList";
import { useGetUserConversations } from "@/hooks/messaging/useGetUserConversations";

export const Wrapper = () => {
  const router: NextRouter = useRouter();
  const { getMessages, isLoading, error } = useGetUserConversations()

  return (
    <>
      {/* right side components */}
      {router?.query?.dashboard?.includes("messages") && (
        <>
          <MainComponent className="relative z-0 flex-1 overflow-hidden focus:outline-none">
            <div className="mx-auto">
              <Conversation isLoading={isLoading} error={error} />
            </div>
          </MainComponent>
        </>
      )}

      {router?.query?.dashboard?.includes("directory") && (
        <MainComponent className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="pt-12">
            <UsersUI />
          </div>
        </MainComponent>
      )}

      {router?.query?.dashboard?.includes("new_user") && (
        <MainComponent className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="mx-auto max-w-7xl py-12">
            <UserFormWrapper />
          </div>
        </MainComponent>
      )}

      {router?.query?.dashboard?.includes("insurance_company") && (
        <MainComponent className="relative z-0 flex-1 focus:outline-none">
          <div className="pt-12">
            <InsuranceCompanyTable />
          </div>
        </MainComponent>
      )}

      {/* left side components*/}
      {router?.query?.dashboard?.includes("messages") && (
        <AsideComponent>
          <VirtualizedUserList getMessages={getMessages} />
        </AsideComponent>
      )}

      <aside className="sticky top-0 hidden w-20 shrink-0 border-l border-slate-200 pl-5 pr-3 lg:block xl:order-last">
        <div className="mt-4 flex w-full items-center justify-center">
          <div className="rounded-xl border-2 border-slate-200 p-1.5">
            <NovuNotificationsCenter />
          </div>
        </div>
      </aside>
    </>
  );
};
