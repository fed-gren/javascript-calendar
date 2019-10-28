import { getMonthEndDate } from './index';

export default ({
  year,
  month,
  todayDate,
  todayDayIdx
}) => {
  const lastDate = getMonthEndDate({ year, month });
  const WEEK_DAY_COUNT = 7;
  const gapWithEndDate = (lastDate - todayDate);
  const endDayDateIdx = (todayDayIdx + gapWithEndDate) % WEEK_DAY_COUNT;
  return endDayDateIdx;
};