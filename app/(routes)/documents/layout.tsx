import { DesktopSideBar } from "@/components/DesktopSideBar";
import Link from "next/link";
import { MobileSideBar } from "@/components/MobileSideBar";
import { NewNavigationLinks } from "@/components/ui/NewNavigationLinks";
import React from "react";
export default function DashboardLayout({
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

          <div className="relative z-0 mx-auto flex w-full overflow-hidden h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
