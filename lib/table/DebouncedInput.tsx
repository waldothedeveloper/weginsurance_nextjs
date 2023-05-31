import React, { useEffect, useState } from 'react'

// A debounced input react component
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 100,
  cssValues,
  ...props
}: {
  value: string | number
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void
  debounce?: number,
  cssValues: string,
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div>
      <div className="relative mt-2 flex items-center">
        <input {...props} value={value} onChange={e => setValue(e.target.value)} className={cssValues} />

        <div className="absolute inset-y-0 right-0 flex py-1.5 px-2">
          <kbd className="inline-flex items-center rounded border border-slate-200 px-2 font-sans text-xs text-slate-400">
            Ctrl+K
          </kbd>
        </div>
      </div>
    </div>

  )
}

