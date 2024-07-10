import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { MobileNavbar } from "./_components/mobile-navbar";
import dynamic from 'next/dynamic';

// we will not need this later
const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const UsersList = dynamic(() => import('./_components/users-list'), { ssr: false })


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


export const revalidate = 0;

export default function UsersListPage() {
  return (
    <>
      <div className="flex overflow-hidden">
        <div>
          <MobileNavbar />
          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
              <div className="flex h-16 shrink-0 items-center">
                <div className="h-8 w-auto relative">
                  <Image
                    fill
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-blue-600"
                                  : "text-gray-400 group-hover:text-blue-600",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">
                      Your teams
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <a
                            href={team.href}
                            className={classNames(
                              team.current
                                ? "bg-gray-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <span
                              className={classNames(
                                team.current
                                  ? "border-blue-600 text-blue-600"
                                  : "border-gray-200 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600",
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                              )}
                            >
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-auto">
                    <a
                      href="#"
                      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      <div className="relative h-8 w-8">
                        <Image
                          fill
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="size-full object-cover"
                        />
                      </div>
                      <span className="sr-only">Your profile</span>
                      <span aria-hidden="true">Tom Cook</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button
              type="button"
              // onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
              Dashboard
            </div>
            <a href="#">
              <span className="sr-only">Your profile</span>
              <div className="h-8 w-8 relative">
                <Image
                  fill
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-full object-cover"
                />
              </div>
            </a>
          </div>
          <main className="lg:pl-72">
            <div className="xl:pl-96">
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                this will be the details of users
              </div>
            </div>
          </main>
          <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 py-6 xl:block">
            <UsersList />
          </aside>
        </div>
      </div>
    </>
  );
}
