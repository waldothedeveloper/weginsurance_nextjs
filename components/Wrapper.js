import { AsideComponent } from "@/components/dashboard/AsideComponent";
import { InsuranceCompanyTable } from "@/components/companies/InsuranceCompanyTable";
import { MainComponent } from "@/components/dashboard/MainComponent";
import { UserFormWrapper } from "@/components/directory/UserFormWrapper";
// import { UsersList } from "@/components/directory/UsersList";
import { VirtualizedUserList } from "@/components/directory/VirtualizedUserList";
import { VirtualizedUserTable } from "@/components/directory/VirtualizedUserTable";
import { useRouter } from "next/router";
// import { UsersTable } from "@/components/directory/UsersTable";

//
export const Wrapper = () => {
  const router = useRouter();

  return (
    <>
      {/* right side */}
      {router?.query?.dashboard?.includes("directory") && (
        <MainComponent className="relative z-0 flex-1 overflow-y-hidden focus:outline-none xl:order-last">
          <div className="py-12">
            <VirtualizedUserTable />
            {/* <UsersTable /> */}
          </div>
        </MainComponent>
      )}

      {router?.query?.dashboard?.includes("new_user") && (
        <MainComponent className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
          <div className="mx-auto max-w-7xl py-12">
            <UserFormWrapper />
          </div>
        </MainComponent>
      )}

      {router?.query?.dashboard?.includes("insurance_company") && (
        <MainComponent className="relative z-0 flex-1 focus:outline-none xl:order-last">
          <div className="py-12">
            <InsuranceCompanyTable />
          </div>
        </MainComponent>
      )}

      {/* left side */}
      {router?.query?.dashboard?.includes("messages") && (
        <AsideComponent>
          <VirtualizedUserList />
          {/* <UsersList /> */}
        </AsideComponent>
      )}
    </>
  );
};
