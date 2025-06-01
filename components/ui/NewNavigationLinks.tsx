"use client";

import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  Square3Stack3DIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { classNames } from "@/utils/classNames";
import { usePathname } from "next/navigation";

const env = process.env.NODE_ENV;
const navigation = [
  {
    name: "Panel",
    href: "dashboard",
    link: "/admin/dashboard",
    devLink: "/dashboard",
    icon: Square3Stack3DIcon,
    current: true,
  },
  {
    name: "Mensajes",
    href: "messages",
    link: "/admin/messages",
    devLink: "/messages",
    icon: ChatBubbleBottomCenterTextIcon,
    current: false,
  },
  {
    name: "Directorio",
    href: "directory",
    link: "/admin/directory",
    devLink: "/directory",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Compañias",
    href: "insurance_company",
    link: "/admin/insurance_company",
    devLink: "/companies",
    icon: BuildingOfficeIcon,
    current: false,
  },
  {
    name: "Documentos",
    href: "documents",
    link: "/documents?page=1",
    devLink: "/documents?page=1",
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: "Usuarios",
    href: "users",
    link: "/users",
    devLink: "/users",
    icon: UserPlusIcon,
    current: false,
    hidden: env === "production" ? true : false,
  },
];

export const NewNavigationLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="mt-16 flex-1" aria-label="Sidebar">
      <div className="space-y-3 pl-5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={env === "production" ? item?.link : item?.devLink}
            className={classNames(
              item?.hidden
                ? "hidden"
                : pathname?.includes(item?.href)
                  ? "border-r-[5px] border-orange-600 bg-white py-4 text-blue-600"
                  : " text-slate-900 hover:bg-blue-50",
              "group flex w-full items-center rounded-tl-md rounded-bl-md py-4 pl-3 text-sm font-medium"
            )}
          >
            <item.icon
              className={classNames(
                pathname?.includes(item?.href)
                  ? "text-blue-600"
                  : "text-slate-400",
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
