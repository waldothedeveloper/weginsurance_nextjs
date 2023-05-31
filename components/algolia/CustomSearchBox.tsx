import { UseSearchBoxProps, useSearchBox } from 'react-instantsearch-hooks-web';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React from 'react'

// 
export const CustomSearchBox = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    refine(event.currentTarget.value);

  };

  return (
    <div className="mt-6 flex gap-x-4">
      <div className="min-w-0 flex-1">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            value={query} // Set the input value to the current search query
            onChange={handleInputChange} // Update the search query on input change
            type="search"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="Buscar usuarios"
          />
        </div>
      </div>

    </div>
  )
}