import { displayDateInBrowserTimeZone } from "@/utils/displayDateInBrowserTimeZone";

export const TimeDivider = ({ time }: { time: string }) => {
  return (
    <div className="my-6">
      <div className="flex justify-center">
        <span className="bg-white px-2 text-sm text-slate-400">
          {displayDateInBrowserTimeZone(time)[0].toLocaleUpperCase("es-ES") +
            displayDateInBrowserTimeZone(time).slice(1)}
        </span>
      </div>
    </div>
  );
};
