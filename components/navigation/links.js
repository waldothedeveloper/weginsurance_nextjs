import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  ComputerDesktopIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { classNames } from "@/utils/classNames";
import { useRouter } from "next/router";

//

const navigation = [
  {
    name: "Dashboard",
    href: "dashboard",
    link: "/admin/dashboard",
    icon: ComputerDesktopIcon,
    current: true,
  },
  {
    name: "Mensajes SMS",
    href: "messages",
    link: "/admin/messages",
    icon: ChatBubbleBottomCenterTextIcon,
    current: false,
  },
  {
    name: "Directorio de Usuarios",
    href: "directory",
    link: "/admin/directory",
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
  {
    name: "Compañias de Seguros",
    href: "insurance_company",
    link: "/admin/insurance_company",
    icon: BuildingOfficeIcon,
    current: false,
  },
];

//
export const NavigationLinks = () => {
  const router = useRouter();

  return (
    <nav className="mt-5 flex-1" aria-label="Sidebar">
      <div className="space-y-1 px-2">
        {navigation.map((item) => (
          <Link
            href={item?.link}
            key={item.name}
            className={classNames(
              router?.query?.dashboard?.includes(item?.href)
                ? "bg-gray-50 text-gray-900"
                : "text-gray-50 hover:bg-blue-400 hover:text-gray-50",
              "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium"
            )}
          >
            <item.icon
              className={classNames(
                router?.query?.dashboard?.includes(item?.href)
                  ? "text-gray-900"
                  : "text-gray-50 group-hover:text-gray-50",
                "mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
//  "bg-blue-400 text-gray-50"
