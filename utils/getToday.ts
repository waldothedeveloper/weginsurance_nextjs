import dayjs from "dayjs";
// Output something like: "2023-04-12"
export const getToday = () => {
  const today = dayjs().utc();
  const year = today.year();
  const month = today.month() + 1;
  const day = today.date();
  const todayUTC = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;

  return todayUTC;
};
