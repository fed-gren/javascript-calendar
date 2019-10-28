export default ({
  todayDate,
  todayDayIdx
}) => {
  const gapFirstDate = todayDate - 1;
  const NUM_WEEK_DAY = 7;
  const gapDayIndex = gapFirstDate % NUM_WEEK_DAY;
  const firstDayDateIdx = gapDayIndex >= todayDayIdx
    ? todayDayIdx + NUM_WEEK_DAY - gapDayIndex
    : todayDayIdx - gapDayIndex;

  return firstDayDateIdx % NUM_WEEK_DAY;
};