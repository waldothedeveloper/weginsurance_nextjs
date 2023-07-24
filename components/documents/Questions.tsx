export const Questions = ({ options }) => {

  return (
    <div>
      <label className="text-base font-semibold text-slate-900">{options[2]?.title}</label>
      <p className="text-sm text-slate-500">How do you prefer to receive notifications?</p>
      <fieldset className="mt-4">
        <legend className="sr-only">{options[2]?.title}</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name="notification-method"
                type="radio"
                defaultChecked={option.id === 'email'}
                className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <label htmlFor={option.id} className="ml-3 block text-sm font-medium leading-6 text-slate-900">
                {option.item}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
