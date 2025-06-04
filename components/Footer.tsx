import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export const Footer = () => {
  return (
    <footer className="flex flex-col w-full items-center justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex">
          <div className="shrink-0">
            <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>+1 (305)-320-4969</p>
            <p>+1 (305)-749-5529</p>
            <p>+1 (786)-471-8800</p>

          </div>
        </div>
        <div className="mt-6 flex">
          <div className="shrink-0">
            <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>healthinsuranceweg@gmail.com</p>
          </div>
        </div>
      </div>
      <p className="mt-16 text-center text-xs leading-5 text-slate-500">
        &copy; {new Date().getFullYear()} WEG Insurance, Corp.
      </p>
    </footer >
  )
}