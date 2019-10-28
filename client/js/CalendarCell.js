export default class CalendarCell {
  constructor({
    date,
    eventList,
    isCurMonth,
    curYear,
    curMonth
  }) {
    this.date = date;
    this.eventList = eventList;
    this.isCurMonth = isCurMonth;
    this.curYear = curYear;
    this.curMonth = curMonth;

    const today = new Date(Date.now());
    this.todayYear = today.getFullYear();
    this.todayMonth = today.getMonth() + 1;
    this.todayDate = today.getDate();

    this.init();
  }

  isTodayCell() {
    if (!this.isCurMonth) return false;

    return (this.todayYear === this.curYear) && (this.todayMonth === this.curMonth) && (this.todayDate === this.date);
  }

  init() {
    this.cellHtml = `
    <div class='calendar-cell
      ${this.isCurMonth ? 'current-month' : ''}
      ${this.isTodayCell() ? 'today' : ''}'
    >
      <section class='calendar-cell-header'>${this.date}</section>
      <section class='calendar-cell-contents'></section>
    </div>
    `;
  }

  getCellHtml() {
    return this.cellHtml;
  }
}