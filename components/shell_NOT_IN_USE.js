import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { AsideComponent } from "@/components/dashboard/AsideComponent";
import { ConditionalComponent } from "@/components/ConditionalComponent";
import Image from "next/image";
// import { InsuranceCompanyList } from "@/components/companies/InsuranceCompanyList";
import { InsuranceCompanyTable } from "@/components/companies/InsuranceCompanyTable";
import { MainComponent } from "@/components/dashboard/MainComponent";
import { NavBar } from "@/components/notifications/NavBar";
import { NavigationLinks } from "@/components/navigation/links";
import { UserButton } from "@clerk/nextjs";
import { UserDetails } from "@/components/directory/UserDetails";
import { UsersList } from "@/components/directory/UsersList";
import logo from "@/public/weg_logo.jpg";
import { useFirebaseUserDetails } from "@/hooks/useFirebaseUserDetails";
// import { useCreateNovuSubscriber } from "@/hooks/useNovuSubscriber";
import { useFirebaseUsers } from "@/hooks/useFirebaseUsers";
import { useInsuranceCompany } from "@/hooks/insurance_company/useHandleInsuranceCompany";

// import { useRenderComponent } from "@/hooks/useRenderComponent";

//
export const Shell = () => {
  const { firebaseUsers, firebaseError } = useFirebaseUsers();

  // const currentLink = navigation.filter((elem) => elem.current)[0]?.href;

  // const { novuSubscriber, novuSubscriberError } = useCreateNovuSubscriber();
  // console.log("novuSubscriber: ", novuSubscriber);
  // console.log("novuSubscriberError: ", novuSubscriberError);

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
  } = useFirebaseUserDetails(navigation);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSideBar = () => {
    setSidebarOpen(false);
  };

  const handleOpenSideBar = () => {
    setSidebarOpen(true);
  };

  const {
    insuranceCompanies,
    handleInsuranceCompanyDetails,
    selectedInsuranceCompany,
  } = useInsuranceCompany(currentLink);

  return (
    <>
      <div className="flex h-screen">
        <MobileSideBar />
        <DesktopSideBar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <Image
                  className="h-10 w-auto rounded-full"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={handleOpenSideBar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <NavBar />
          <div className="relative z-0 flex flex-1 overflow-hidden">
            {/* chat messages or user details */}
            <MainComponent>
              <div className="grid justify-items-center text-4xl font-light text-black">
                {userDetails ? (
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
                ) : (
                  <ConditionalComponent
                    currentLink={currentLink}
                    selectedInsuranceCompany={selectedInsuranceCompany}
                  />
                )}
              </div>
            </MainComponent>
            {/* users or insurance companies list */}
            {currentLink === "new_user" && null}
            {currentLink === "insurance_company" && (
              <AsideComponent>
                <InsuranceCompanyTable
                  insuranceCompanies={insuranceCompanies}
                />
                {/* <InsuranceCompanyList
                  currentLink={currentLink}
                  insuranceCompanies={insuranceCompanies}
                  handleInsuranceCompanyDetails={handleInsuranceCompanyDetails}
                /> */}
              </AsideComponent>
            )}
            {currentLink !== "new_user" ||
              (currentLink !== "insurance_company" && (
                <AsideComponent>
                  <UsersList
                    currentLink={currentLink}
                    handleUserDetails={handleUserDetails}
                    firebaseUsers={firebaseUsers}
                    firebaseError={firebaseError}
                  />
                </AsideComponent>
              ))}
          </div>
        </div>
      </div>
      {/* <DeleteUserModal
        isSubmitting={isSubmitting}
        selectedUser={userDetails}
        handleDeleteUser={handleDeleteUser}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      /> */}
    </>
  );
};
