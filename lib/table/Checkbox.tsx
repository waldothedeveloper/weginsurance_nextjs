import React, { HTMLProps, useEffect, useRef } from 'react'

export const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest])

  return (
    <input
      type="checkbox"
      ref={ref}
      className='rounded border-gray-200 text-blue-600 focus:ring-blue-600 cursor-pointer'
      {...rest}
    />
  )
}