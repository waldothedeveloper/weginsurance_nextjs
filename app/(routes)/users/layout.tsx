import { DesktopSideBar } from '@/components/DesktopSideBar'
import { MobileSideBar } from '@/components/MobileSideBar'
import { NewNavigationLinks } from '@/components/ui/NewNavigationLinks'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>

    <div className="flex h-screen">
      <MobileSideBar
      />
      <DesktopSideBar>
        {/* TODO: We have duplication now because or new pages using the new APP router, and the old app using the pages router. So we need to work on removing this Navigation duplication, I think ultimately we should keep the NewNavigationLinks and remove the old links page in folder -> navigation -> links.js */}
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
            <div>
              <button
                type="button"
                className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900"
              // onClick={handleOpenSideBar}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-0 flex w-full overflow-y-auto overflow-x-hidden h-full md:m-6">
          {children}
        </div>
      </div>
    </div>
  </>
}