import { useAtomValue, useSetAtom } from 'jotai'

import { pdfDataAtom } from "@/lib/state/atoms"
import { pdfDataTypes } from "@/interfaces/index"
import { today } from "@/components/documents/helpers/date"

// 
export const DateSelect = ({ subtitle, name }: { subtitle: string, name: keyof pdfDataTypes }) => {
  const pdfData = useAtomValue(pdfDataAtom)
  const setPDFData = useSetAtom(pdfDataAtom)
  return (
    <div>
      <p className="text-sm text-slate-500">{subtitle}</p>
      <fieldset className="mt-4">
        <input className="block rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={pdfData[name]}
          checked={name === pdfData[name]}
          onChange={(e) => setPDFData({ ...pdfData, [name]: e.target.value })} type="date" id="start" name={name} min={today} />
      </fieldset>
    </div>
  )
}