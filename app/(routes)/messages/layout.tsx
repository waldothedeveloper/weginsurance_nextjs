import { DesktopSideBar } from "@/components/DesktopSideBar";
import Link from "next/link";
import { MobileSideBar } from "@/components/MobileSideBar";
import { NewNavigationLinks } from "@/components/ui/NewNavigationLinks";
import React from "react";
// import { DesktopNavigation } from "@/components/ui/desktop-navigation";
// import { MobileSidebarNavigation } from "@/components/ui/mobile-sidebar-navigation";
import { SearchUsers } from "../users/_components/search-users";
import UserSkeleton from "../users/_components/user-skeleton";
import { UsersList } from "../users/_components/users-list";

export const dynamic = "force-dynamic";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        <MobileSideBar />
        <DesktopSideBar>
          <NewNavigationLinks />
        </DesktopSideBar>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-1.5">
              <div>
                <Link href="/admin/dashboard">
                  <span className="text-xl font-bold uppercase tracking-tight text-blue-600">
                    weg <br /> insurance
                  </span>
                  <span className="ml-2 self-end text-base font-extralight lowercase text-slate-500">
                    sms
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* Main column which is used for main operations like chat, create new user, etc */}
          <main className="lg:pl-72">
            <div className="xl:pl-8">
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                {children}
              </div>
            </div>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <aside className="fixed inset-y-0 left-64 hidden w-[22rem] border-r border-gray-200 xl:block h-screen overflow-hidden">
            <SearchUsers />
            <UsersList>
              <UserSkeleton />
            </UsersList>
          </aside>
        </div>
      </div>
    </>
  );
}
