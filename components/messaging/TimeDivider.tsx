import dayjs from "dayjs";
import locale_es from "dayjs/locale/es";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.locale(locale_es);

export const TimeDivider = ({ time }: { time: string }) => {
  return (
    <div className="my-6">
      <div className="flex justify-center">
        <span className="bg-white px-2 text-sm text-slate-400">
          {dayjs
            .utc(time)
            .locale("es")
            .utc()
            .format("dddd, D [de] MMMM [de] YYYY")}
        </span>
      </div>
    </div>
  );
};
