import { monthLastDate } from '../constant';

export default ({
  month,
  todayDate,
  todayDayIdx
}) => {
  const lastDate = monthLastDate[month - 1];
  const WEEK_DAY_COUNT = 7;
  const gapWithEndDate = (lastDate - todayDate);
  const endDayDateIdx = (todayDayIdx + gapWithEndDate) % WEEK_DAY_COUNT;
  return endDayDateIdx;
};