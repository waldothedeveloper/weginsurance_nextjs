import { ReactNode, useEffect, useState } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { DesktopSideBar } from "@/components/DesktopSideBar";
import Image from "next/image";
import { MobileSideBar } from "@/components/MobileSideBar";
import { NavBar } from "@/components/notifications/NavBar";
import { Wrapper } from "@/components/Wrapper";
import { firebaseApp } from "@/lib/firebaseConfig";
import logo from "@/public/weg_logo.jpg";
import { useAuth } from "@clerk/nextjs";

type Props = {
  children?: ReactNode;
};

//
export const Layout = ({ children }: Props) => {
  const { getToken } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleCloseSideBar = () => setSidebarOpen(false);
  const handleOpenSideBar = () => setSidebarOpen(true);

  useEffect(() => {
    const signInWithClerk = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const token = await getToken({
          template: "integration_firebase",
        });

        if (token) {
          const userCredentials = await signInWithCustomToken(auth, token);
          return userCredentials.user;
        }
        return null;
      } catch (error) {
        return error;
      }
    };

    signInWithClerk();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <MobileSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleCloseSideBar={handleCloseSideBar}
        />
        <DesktopSideBar />
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
                  onClick={handleOpenSideBar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <NavBar />
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <Wrapper />
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};
