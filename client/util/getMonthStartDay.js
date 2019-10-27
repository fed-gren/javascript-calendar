export default ({
  todayDate,
  todayDayIdx
}) => {
  const gapFirstDate = todayDate - 1;
  const WEEK_DAY_COUNT = 7;
  const gapDayIndex = gapFirstDate % WEEK_DAY_COUNT;
  const firstDayDateIdx = gapDayIndex >= todayDayIdx
    ? todayDayIdx + WEEK_DAY_COUNT - gapDayIndex
    : todayDayIdx - gapDayIndex;

  return firstDayDateIdx;
};