// Import Day.js
const dayjs = require("dayjs");

// Calculate 10 years from today
const futureDate = dayjs().add(10, "year");
export const today = dayjs().format("YYYY-MM-DD");
// Format the futureDate if needed
export const tenYearsFromToday = futureDate.format("YYYY-MM-DD");
