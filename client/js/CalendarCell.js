export default class CalendarCell {
  constructor({ date, eventList, isCurMonth }) {
    this.date = date;
    this.eventList = eventList;
    this.isCurMonth = isCurMonth;
    this.init();
  }

  init() {
    this.cellHtml = `
    <div class='calendar-cell ${this.isCurMonth ? 'current-month' : ''}'>
      <section class='calendar-cell-header'>${this.date}</section>
      <section class='calendar-cell-contents'></section>
    </div>
    `;
  }

  getCellHtml() {
    return this.cellHtml;
  }
}