import { BiCheck, BiCopy } from "react-icons/bi";

export const URLCopy = ({ url, copy, urlCopied }: { url: string, copy: () => void, urlCopied: boolean }) => {

  return (
    <div className="mt-6">
      <div className="relative mt-2 flex items-center w-full">
        <input
          readOnly
          value={url}
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-2.5 pr-14 text-slate-500 bg-slate-50 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
        <button onClick={copy} className={urlCopied ? "absolute inset-y-0 right-0 flex p-2 border-2 border-green-500 rounded-lg" : "absolute inset-y-0 right-0 flex p-2"}>
          {urlCopied ? (<BiCheck className="text-green-500 h-6 w-6 transition ease-in delay-1000 duration-1000" />) : (<BiCopy className="text-slate-400 h-6 w-6 transition ease-in delay-1000 duration-1000" />)}
        </button>
      </div>
    </div>

  )
}