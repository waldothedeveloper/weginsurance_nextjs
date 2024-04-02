"use client";

import Link from "next/link";
import { LoggedInUserButton } from "@/components/auth/LoggedInUserButton";

export const DesktopSideBar = ({ children }) => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-100 bg-slate-100">
          <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
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
            {children}
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
            <button className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <LoggedInUserButton />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
