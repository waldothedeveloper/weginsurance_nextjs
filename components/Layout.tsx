import { deleteCookie, setCookie } from "cookies-next";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { DesktopSideBar } from "@/components/DesktopSideBar";
import Link from "next/link";
import { MobileSideBar } from "@/components/MobileSideBar";
import { NavigationLinks } from "@/components/navigation/links";
import { Wrapper } from "@/components/Wrapper";
import { auth } from "@/_lib/firebase/clientApp";
import { signInWithCustomToken } from "firebase/auth";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

// import { useHandleNotifications } from "@/hooks/notifications/useHandleNotifications";
// import { useIdentifyIncomingUserFromInboundSMS } from "@/hooks/messaging/useIdentifyIncomingUserFromInboundSMS";

// this is the old navigation links used for PAGES and not for the new UI
export const Layout = () => {
  const { getToken } = useAuth();

  // TODO: identify who is more likely to benefit from this hook, probably the Wrapper component
  // const { errorIdentifyingUser } =
  //   useIdentifyIncomingUserFromInboundSMS();
  // const { notiError } = useHandleNotifications(errorIdentifyingUser);

  //
  useEffect(() => {
    const signInWithClerk = async () => {
      try {
        const token = await getToken({
          template: "integration_firebase",
        });

        if (token) {
          const userCredentials = await signInWithCustomToken(
            auth,
            token || ""
          );

          if (userCredentials.user) {
            const gToken = await userCredentials.user.getIdToken();
            await setCookie("__firebase_session", gToken);
          } else {
            console.error("User credentials not found after sign-in");
            deleteCookie("__firebase_session");
          }
          return userCredentials.user;
        }
        return null;
      } catch (error) {
        return error;
      }
    };

    signInWithClerk();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <MobileSideBar />
        <DesktopSideBar>
          <NavigationLinks />
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
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900"
                  // TODO: see what you're doing here since you moved this state into the MobileSideBar component
                  // onClick={handleOpenSideBar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-0 mx-auto flex w-full overflow-hidden h-full">
            <Wrapper />
          </div>
        </div>
      </div>
    </>
  );
};
