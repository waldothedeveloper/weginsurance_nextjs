import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">WEG Insurance</span>
          <Image className="rounded-full" src="/weg_logo.jpg" alt="" width={50} height={50} priority />
        </Link>
        <div className="flex flex-1 justify-end">
          <Link href="/admin/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Entrar <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
