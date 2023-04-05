import Link from "next/link";
import { NavigationLinks } from "@/components/navigation/links";
import { UserButton } from "@clerk/nextjs";

export const DesktopSideBar = () => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-100 bg-slate-100">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center justify-start px-4">
              <Link href="/admin/dashboard">
                <span className="text-xl font-bold uppercase tracking-tight text-blue-600">
                  weg <br /> insurance
                </span>
                <span className="ml-2 self-end text-base font-extralight lowercase text-slate-500">
                  sms
                </span>
              </Link>
            </div>
            <NavigationLinks />
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
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
                          "text-sm font-medium text-slate-900",
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
  );
};
