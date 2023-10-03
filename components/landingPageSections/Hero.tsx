import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"

export const Hero = () => {
  return (
    <div className="relative isolate -z-10">
      <div
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-green-300 via-blue-500 to-sky-600 opacity-40"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <motion.h1 initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                Tu bienestar, nuestra misión. Descubre tu cobertura de seguro
                médico ideal con Weg Insurance.
              </motion.h1>
              <p className="relative mt-6 text-lg leading-8 text-slate-600 sm:max-w-md lg:max-w-none">
                Protejemos lo que mas valoras. Tu salud, tu vida, y tu familia.
                Tenemos la cobertura que necesitas para estar tranquilo. Cotiza
                ahora y construye un futuro seguro con nosotros. La tranquilidad
                esta a un click de distancia. Confia en nosotros para proteger
                lo que mas importa.
              </p>
            </div>

            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative aspect-[2/3] bg-slate-900/5 shadow-lg">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1592621385645-e41659e8aabe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2588&q=80"
                    alt=""
                    className="w-full object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" /> */}
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div
                  className="relative aspect-[2/3] bg-slate-900/5 shadow-lg">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1666214276372-24e331683e78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                    alt=""
                    className="w-full rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                </div>
                <div className="relative aspect-[2/3] bg-slate-900/5 shadow-lg">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                    alt=""
                    className="w-full rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative aspect-[2/3] bg-slate-900/5 shadow-lg">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1619450565660-2a93ba8603fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                    alt=""
                    className="w-full rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                </div>
                <div className="relative aspect-[2/3] bg-slate-900/5 shadow-lg">
                  <Image
                    fill
                    src="https://images.unsplash.com/photo-1643297653753-2d3f459edc6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                    alt=""
                    className="w-full rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
