import Image from "next/image";
import { NavigationLinks } from "@/components/navigation/links";
import { UserButton } from "@clerk/nextjs";
import logo from "@/public/weg_logo.jpg";
//
export const DesktopSideBar = () => {
  {
    /* Static sidebar for desktop */
  }
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-blue-700">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Image
                className="h-14 w-auto rounded-full"
                src={logo}
                alt="Your Company"
              />
            </div>
            <NavigationLinks />
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
                          "text-sm font-medium text-gray-50",
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
