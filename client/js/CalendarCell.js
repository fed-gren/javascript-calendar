import { classNames } from '../constant';

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
    this.cellElement = document.createElement('div');
    this.cellElement.classList.add(classNames.cell.element);
    this.cellElement.classList.add(
      `${this.isCurMonth
        ? classNames.cell.currentMonth
        : classNames.cell.notCurrentMonth}`
    );
    this.cellElement.classList.add(
      `${this.isTodayCell()
        ? classNames.cell.today
        : classNames.cell.notToday}`
    );

    this.cellHeaderElement = document.createElement('section');
    this.cellHeaderElement.classList.add(classNames.cell.header);
    this.cellHeaderElement.innerText = `${this.date}`;

    this.cellContentsElement = document.createElement('section');
    this.cellContentsElement.classList.add(classNames.cell.contents);

    this.cellElement.appendChild(this.cellHeaderElement);
    this.cellElement.appendChild(this.cellContentsElement);
  }

  getCellElement() {
    return this.cellElement;
  }

  getDate() {
    const curMonth = String(this.curMonth).length === 1
      ? `0${this.curMonth}`
      : this.curMonth;
    const curDate = String(this.date).length === 1
      ? `0${this.date}`
      : this.date;

    return `${this.curYear}-${curMonth}-${curDate}`;
  }

  setEventList(eventList) {
    const eventListHtml = eventList.reduce((acc, event) =>
      acc + `<p class=${classNames.cell.event}>${event}</p>`
      , ``);
    this.cellContentsElement.innerHTML = (eventListHtml);
  }
}