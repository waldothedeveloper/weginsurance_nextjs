import { AsideComponent } from "@/components/dashboard/AsideComponent";
import { DeleteUserModal } from "@/components/directory/DeleteUserModal";
import { InsuranceCompanyTable } from "@/components/companies/InsuranceCompanyTable";
import { MainComponent } from "@/components/dashboard/MainComponent";
import { UserDetails } from "@/components/directory/UserDetails";
import { UserFormWrapper } from "@/components/directory/UserFormWrapper";
import { UsersList } from "@/components/directory/UsersList";
import { UsersTable } from "@/components/directory/UsersTable";
import { useFirebaseUserDetails } from "@/hooks/useFirebaseUserDetails";
import { useRouter } from "next/router";
//
export const Wrapper = () => {
  const router = useRouter();
  const {
    submitUpdateUser,
    register,
    errors,
    handleSubmit,
    updateUser,
    userDetails,
    handleUserDetails,
    handleUpdateUser,
    handleDeleteUser,
    openModal,
    handleOpenModal,
    handleCloseModal,
    isSubmitting,
  } = useFirebaseUserDetails();

  return (
    <>
      {/* right side */}

      {router?.query?.dashboard?.includes("directory") && (
        <MainComponent className="relative z-0 flex-1 overflow-y-hidden focus:outline-none xl:order-last">
          <div className="py-12">
            <UsersTable />
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
          <div className="mx-auto max-w-7xl py-12">
            <InsuranceCompanyTable />
          </div>
        </MainComponent>
      )}

      {userDetails && (
        <MainComponent className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
          <div className="grid justify-items-center text-4xl font-light text-black">
            <UserDetails
              submitUpdateUser={submitUpdateUser}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              updateUser={updateUser}
              handleUpdateUser={handleUpdateUser}
              selectedUser={userDetails}
              handleOpenModal={handleOpenModal}
              isSubmitting={isSubmitting}
            />
          </div>
        </MainComponent>
      )}
      {/* left side */}
      {router?.query?.dashboard?.includes("messages") && (
        <AsideComponent>
          <UsersList handleUserDetails={handleUserDetails} />
        </AsideComponent>
      )}
      <DeleteUserModal
        isSubmitting={isSubmitting}
        selectedUser={userDetails}
        handleDeleteUser={handleDeleteUser}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
