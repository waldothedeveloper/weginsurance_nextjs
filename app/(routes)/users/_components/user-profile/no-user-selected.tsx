import {
  CalendarIcon,
  PhotoIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

import Link from 'next/link'
import { classNames } from '@/utils/classNames'

const items = [
  {
    title: 'Create un usuario',
    description: 'Crear un nuevo usuario en la plataforma.',
    icon: UserPlusIcon,
    background: 'bg-pink-500',
  },
  {
    title: 'Create a Calendar',
    description: 'Stay on top of your deadlines, or don’t — it’s up to you.',
    icon: CalendarIcon,
    background: 'bg-yellow-500',
  },
  {
    title: 'Create a Gallery',
    description: 'Great for mood boards and inspiration.',
    icon: PhotoIcon,
    background: 'bg-green-500',
  },

]


export default function NoUserSelected() {
  return (
    <div className="flex flex-col justify-center items-start size-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-base font-semibold leading-6 text-gray-900">No hay usuario seleccionado</h2>
      <p className="mt-1 text-sm text-gray-500">
        Puede seleccionar un usuario de la lista o elegir una de las siguientes opciones para comenzar.
      </p>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <div
                className={classNames(
                  item.background,
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg',
                )}
              >
                <item.icon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href="/users/create-new-user-policy" className="focus:outline-none">
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Or start from an empty project
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}
