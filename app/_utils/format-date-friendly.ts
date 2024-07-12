import dayjs from "dayjs";
import locale_es from "dayjs/locale/es";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.locale(locale_es);

export const friendlyDate = (time: string | undefined) => {
  if (!time) return "";
  return dayjs.utc(time).locale("es").utc().format("D [de] MMMM [de] YYYY");
};
