import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { UserProfile } from "./user-profile/profile";

export default function UserWrapper() {
  return (
    <div className="relative z-0 flex flex-1 overflow-hidden">
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon
              aria-hidden="true"
              className="-ml-2 h-5 w-5 text-gray-400"
            />
            <span>Regresar al directorio</span>
          </a>
        </nav>
        <UserProfile />
      </main>
    </div>
  );
}
