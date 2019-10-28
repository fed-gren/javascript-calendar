const isLeapYear = (year) => year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;

export default ({
  year,
  month
}) => {
  const monthIdx = month - 1;
  const monthLastDateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(month === 2) {
    return isLeapYear(year) ? monthLastDateList[monthIdx] + 1 : monthLastDateList[monthIdx];
  } else {
    return monthLastDateList[monthIdx];
  }
};