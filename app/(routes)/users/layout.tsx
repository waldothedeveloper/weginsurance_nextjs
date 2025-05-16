import { DesktopNavigation } from "@/components/ui/desktop-navigation";
import { MobileSidebarNavigation } from "@/components/ui/mobile-sidebar-navigation";
import { SearchUsers } from "./_components/search-users";
import { UserProvider } from "./_hooks/useUser";
import UserSkeleton from "../users/_components/user-skeleton";
import { UsersList } from "../users/_components/users-list";
export const dynamic = "force-dynamic";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* The UserProvider is a client component passing the selected user information down  */}
      <UserProvider>
        <MobileSidebarNavigation />
        <DesktopNavigation />
        {/* Main column which is used for main operations like chat, create new user, etc */}
        <main className="lg:pl-72">
          <div className="xl:pl-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{children}</div>
          </div>
        </main>

        {/* Secondary column (hidden on smaller screens) */}
        <aside className="fixed inset-y-0 left-72 hidden w-96 border-r border-gray-200 xl:block h-screen overflow-hidden">
          <SearchUsers />
          <UsersList>
            <UserSkeleton />
          </UsersList>
        </aside>
      </UserProvider>
    </>
  );
}
