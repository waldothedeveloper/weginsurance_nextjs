export const dynamic = "force-dynamic"; // This layout is dynamic and should not be cached

import { DesktopSideBar } from "@/components/DesktopSideBar";
import Link from "next/link";
import { MobileSideBar } from "@/components/MobileSideBar";
import { NewNavigationLinks } from "@/components/ui/NewNavigationLinks";
import { SearchUsers } from "./users/_components/search-users";
import { UserProvider } from "../../global-hooks/useUser";
import UserSkeleton from "./users/_components/user-skeleton";
import { UsersList } from "./users/_components/users-list";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
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
          <UserProvider>
            <main className="lg:pl-72 flex-1 overflow-y-auto">
              <div className="xl:pl-8">
                <div className="px-4 pt-10 sm:px-6 lg:px-8 lg:pt-6">
                  {children}
                </div>
              </div>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            {/* The UserProvider is a client component passing the selected user information down  */}
            <aside className="fixed inset-y-0 left-64 hidden w-88 border-r border-gray-200 xl:block h-screen overflow-hidden">
              <SearchUsers />
              <UsersList>
                <UserSkeleton />
              </UsersList>
            </aside>
          </UserProvider>
        </div>
      </div>
    </>
  );
}
