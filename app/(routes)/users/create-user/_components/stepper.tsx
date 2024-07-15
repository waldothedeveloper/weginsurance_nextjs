const steps = [
  { name: 'Poliza Principal', href: '#', status: 'complete' },
  { name: 'Esposo o Esposa', href: '#', status: 'current' },
  { name: 'Dependientes', href: '#', status: 'upcoming' },
]

export const Stepper = () => {
  return (
    <nav aria-label="Progress" className="flex items-center justify-center py-6">
      <p className="text-sm font-medium">
        Paso {steps.findIndex((step) => step.status === 'current') + 1} de {steps.length}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === 'complete' ? (
              <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900">
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href} aria-current="step" className="relative flex items-center justify-center">
                <span aria-hidden="true" className="absolute flex h-5 w-5 p-px">
                  <span className="h-full w-full rounded-full bg-blue-200" />
                </span>
                <span aria-hidden="true" className="relative block h-2.5 w-2.5 rounded-full bg-blue-600" />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
