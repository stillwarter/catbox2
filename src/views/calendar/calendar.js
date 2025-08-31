import dayjs from "dayjs";

const yearlimit = 15;
const currentYear = dayjs().year();
const currentMonth = dayjs().month() + 1;
const genderYearRange = (num, limit) => {
  const start = num - limit;
  const end = num + limit;
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const yearsOpt = genderYearRange(currentYear, yearlimit).map((item) => ({
  value: item,
  label: item + "年",
}));
const monthsOpt = [...new Array(12)].map((item, index) => ({
  value: index + 1,
  label: index + 1 + "月",
}));
const getDays = (year = currentYear, month = currentMonth) => {
  return Number(dayjs(year + "-" + month).daysInMonth());
};
function isWeekend(date) {
  const targetDate = date ? dayjs(date) : dayjs();
  const day = targetDate.day();
  return day === 0 || day === 6;
}
export { yearsOpt, monthsOpt, currentYear, currentMonth, getDays, isWeekend };
