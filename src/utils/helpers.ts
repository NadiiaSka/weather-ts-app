export const roundUp = (num: number): number => Math.ceil(num);

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// create a list of week days starting from the current day
const dayInAWeek = new Date().getDay();
export const forecastWeekDays = WEEK_DAYS.slice(
  dayInAWeek,
  WEEK_DAYS.length
).concat(WEEK_DAYS.slice(0, dayInAWeek));
