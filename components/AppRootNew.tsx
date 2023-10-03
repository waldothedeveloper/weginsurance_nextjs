import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// import { Blog } from "@/components/landingPageSections/Blog"
import { Dialog } from '@headlessui/react'
import { Footer } from "@/components/landingPageSections/Footer"
import { Hero } from "@/components/landingPageSections/Hero"
import Image from "next/image";
import { ImageBanner } from "@/components/landingPageSections/ImageBanner"
import Link from "next/link";
import { LogoCloud } from '@/components/landingPageSections/LogoCloud'
import { Mission } from '@/components/landingPageSections/Mission';
import React from 'react'
import { Team } from '@/components/landingPageSections/Team';
import { Values } from '@/components/landingPageSections/Values';
import { useState } from 'react'

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Resources', href: '#' },
//   { name: 'Company', href: '#' },
// ]


export const AppRoot = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">WEG Insurance</span>
              <Image
                className="rounded-full"
                height={52}
                width={52}
                src="/weg_logo.jpg"
                alt="weg insurance logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-slate-900">
                {item.name}
              </a>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/admin/dashboard" className="text-sm font-semibold leading-6 text-slate-900">
              Entrar <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">WEG Insurance company logo</span>
                <Image
                  className="rounded-full"
                  height={52}
                  width={52}
                  src="/weg_logo.jpg"
                  alt="weg insurance logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-6">
                  <Link
                    href="/admin/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                  >
                    Entrar <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="isolate">
        <Hero />
        <Mission />
        {/* Image section */}
        <ImageBanner />
        <Values />
        <LogoCloud />
        <Team />
        {/* Future Blog section */}
        {/* <Blog /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
