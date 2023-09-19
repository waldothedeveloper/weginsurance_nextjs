import { useAtomValue, useSetAtom } from 'jotai'

import { pdfDataAtom } from "@/lib/state/atoms"

type QuestionsProps = { options: { id: string, item: string }[], subtitle: string, name: "language" | "agent" | "expirationDate" | "optionalAgentPhone", step: number }

export const Questions = ({ options, subtitle, name, step }: QuestionsProps) => {
  const pdfData = useAtomValue(pdfDataAtom)
  const setPDFData = useSetAtom(pdfDataAtom)
  return (
    <div>
      <p className="text-sm text-slate-500">{subtitle}</p>
      <fieldset className="mt-4">
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((option) => (
            <div key={option.id} className="flex flex-col items-center justify-start">
              {(pdfData.agent.includes("William") && step === 3) && <p className="text-slate-400 text-xs self-start ml-8 font-medium">{option.id}</p>}
              <div className="flex items-center">
                <input
                  value={option.item}
                  checked={option.item === pdfData[name as keyof typeof pdfData]}
                  onChange={() => setPDFData({ ...pdfData, [name]: option.item })}
                  id={option.id}
                  name={name}
                  type="radio"
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor={option.id} className="ml-3 block text-sm font-medium leading-6 text-slate-900">
                  {option.item}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
