export const displayDateInBrowserTimeZone = (date: string) => {
  return new Date(date).toLocaleDateString("es", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};
