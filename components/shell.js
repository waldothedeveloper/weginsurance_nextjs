import {
  Bars3Icon,
  DevicePhoneMobileIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { AsideComponent } from "@/components/dashboard/AsideComponent";
import { DeleteUserModal } from "@/components/directory/DeleteUserModal";
import Image from "next/image";
import { MainComponent } from "@/components/dashboard/MainComponent";
import { NavigationLinks } from "@/components/navigation/links";
import { Placeholder } from "@/components/placeholder";
import { UserButton } from "@clerk/nextjs";
import { UserDetails } from "@/components/directory/UserDetails";
import { UsersList } from "@/components/directory/UsersList";
import logo from "@/public/weg_logo.jpg";
import { useFirebaseAuthAndGetUsers } from "@/hooks/useFirebaseAuthAndGetUsers";
import { useFirebaseUserDetails } from "@/hooks/useFirebaseUserDetails";
import { useRenderComponent } from "@/hooks/useRenderComponent";

export const Shell = () => {
  const {
    userDetails,
    handleUserDetails,
    handleDeleteUser,
    openModal,
    setOpenModal,
  } = useFirebaseUserDetails();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { firebaseUsers, firebaseError } = useFirebaseAuthAndGetUsers();
  const { navigation, handleChangeComponent } = useRenderComponent();

  return (
    <>
      <div className="flex h-screen text-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Image
                        className="h-14 w-auto rounded-full"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                    <NavigationLinks
                      handleChange={handleChangeComponent}
                      navigation={navigation}
                    />
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    {/* TODO: it would be nice if the whole button can show the user profile */}
                    <button className="group block w-full flex-shrink-0">
                      <div className="flex items-center">
                        <UserButton
                          showName={true}
                          appearance={{
                            elements: {
                              userButtonBox: "flex flex-row-reverse",
                              userButtonOuterIdentifier:
                                "text-sm font-medium text-gray-700 group-hover:text-gray-900",
                            },
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Image
                    className="h-14 w-auto rounded-full"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <NavigationLinks
                  handleChange={handleChangeComponent}
                  navigation={navigation}
                />
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                {/* TODO: it would be nice if the whole button can show the user profile */}
                <button className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <UserButton
                        showName
                        appearance={{
                          elements: {
                            userButtonBox: "flex flex-row-reverse",
                            userButtonOuterIdentifier:
                              "text-sm font-medium text-gray-700 group-hover:text-gray-900",
                          },
                        }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-0 flex flex-1 overflow-hidden">
            {/* chat messages or user details */}
            <MainComponent>
              <div className="text-black text-4xl font-light grid justify-items-center">
                {navigation.filter((elem) => elem.current)[0]?.href ===
                `messages` ? (
                  <Placeholder
                    icon={
                      <DevicePhoneMobileIcon className="h-24 w-24 mx-auto text-slate-400" />
                    }
                    title="Lista de Mensajes"
                    message=" Selecione un usuario de la lista para ver los mensajes enviados y
          recibidos."
                  />
                ) : userDetails ? (
                  <UserDetails
                    selectedUser={userDetails}
                    setOpenModal={setOpenModal}
                  />
                ) : (
                  <Placeholder
                    icon={
                      <UserIcon className="h-24 w-24 mx-auto text-slate-400" />
                    }
                    title="Perfil de Usuario"
                    message=" Selecione un usuario de la lista para editar, actualizar, o borrar un usuario."
                  />
                )}
              </div>
            </MainComponent>
            {/* users list */}
            <AsideComponent>
              <UsersList
                handleUserDetails={handleUserDetails}
                firebaseUsers={firebaseUsers}
                firebaseError={firebaseError}
              />
            </AsideComponent>
          </div>
        </div>
      </div>
      <DeleteUserModal
        selectedUser={userDetails}
        handleDeleteUser={handleDeleteUser}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
