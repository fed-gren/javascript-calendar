import { weekDay, styles, classNames } from '../constant';
import { getMonthStartDay, getMonthEndDay, getMonthEndDate, removeAllChildNode } from '../util';

import CalendarCell from './CalendarCell';

export default class Calendar {
  constructor({ container, width, eventApiUrl }) {
    this.container = container;
    this.container.style.width = width;
    this.today = new Date(Date.now());
    this.todayYear = this.today.getFullYear();
    this.todayMonth = this.today.getMonth() + 1;
    this.todayDate = this.today.getDate();
    this.todayDayIdx = this.today.getDay();
    this.eventApiUrl = eventApiUrl;

    this.setCurDateInfo({
      curYear: this.todayYear,
      curMonth: this.todayMonth,
      curDate: this.todayDate,
      curDayIdx: this.todayDayIdx
    });
    this.init();
    this.attachEvent();
  }

  setCurDateInfo({
    curYear,
    curMonth,
    curDate,
    curDayIdx
  }) {
    this.curYear = curYear;
    this.curMonth = curMonth;
    this.curDate = curDate;
    this.curDayIdx = curDayIdx;
  }

  setCalendarDate() {
    this.firstDateDayIdx = getMonthStartDay({
      todayDate: this.curDate,
      todayDayIdx: this.curDayIdx
    });
    this.endDateDayIdx = getMonthEndDay({
      year: this.curYear,
      month: this.curMonth,
      todayDate: this.curDate,
      todayDayIdx: this.curDayIdx
    });
  }

  convertEventListToObject(eventList) {
    const eventObject = {};
    eventList.forEach((eventData) => {
      if (!eventObject[eventData.date]) eventObject[eventData.date] = [];
      eventObject[eventData.date].push(eventData.event);
    });
    return eventObject;
  }

  async fetchEventList() {
    await fetch(this.eventApiUrl)
      .then((res) => res.json())
      .then((eventList) => {
        this.eventObject = this.convertEventListToObject(eventList);
      });
  }

  initHeader() {
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.yearMonthText = document.createElement('p');

    this.prevBtn.innerText = 'prev';
    this.updateHeader();
    this.nextBtn.innerText = 'next';

    this.header.appendChild(this.prevBtn);
    this.header.appendChild(this.yearMonthText);
    this.header.appendChild(this.nextBtn);
  }

  updateHeader() {
    this.yearMonthText.innerText = `${this.curYear}년 ${this.curMonth}월`;
  }

  initWeekDayBar() {
    weekDay
      .map((weekDay) => `<div class=${classNames.weekDay.day}>${weekDay}</div>`)
      .forEach((weekDayElement) => this.weekDayBar.insertAdjacentHTML('beforeend', weekDayElement));
  }

  updateCellContainer() {
    this.setCalendarDate();
    removeAllChildNode(this.cellContainer);
    this.currentCellObject = {};

    this.setPrevMonthCellHtml();
    this.setCurMonthCellHtml();
    this.setNextMonthCellHtml();
  }

  async init() {
    this.header = document.createElement('header');
    this.header.style.height = styles.header.height;
    this.header.className = classNames.header;
    this.container.appendChild(this.header);
    this.initHeader();

    this.weekDayBar = document.createElement('section');
    this.weekDayBar.style.height = styles.weekDayBar.height;
    this.weekDayBar.className = classNames.weekDay.bar;
    this.container.appendChild(this.weekDayBar);
    this.initWeekDayBar();

    this.cellContainer = document.createElement('section');
    this.cellContainer.className = classNames.cell.container;
    this.container.appendChild(this.cellContainer);

    try {
      await this.fetchEventList();
    } catch (error) {
      console.log(error);
    }

    this.updateCellContainer();
  }

  setPrevMonthCellHtml() {
    this.prevMonthEndDate = getMonthEndDate({
      year: this.curYear,
      month: this.curMonth === 1
        ? 12
        : this.curMonth - 1
    });
    if (this.firstDateDayIdx === 0) return;

    const prevMonthStartDate = this.prevMonthEndDate - (this.firstDateDayIdx - 1);
    let tempDate = prevMonthStartDate;
    const { curMonth: prevMonth, curYear: prevYear } = this.getPrevMonthDateObj();

    while (tempDate <= this.prevMonthEndDate) {
      const calendarCell = new CalendarCell({
        date: tempDate,
        eventList: [],
        isCurMonth: false,
        curYear: prevYear,
        curMonth: prevMonth
      });

      const cellDate = calendarCell.getDate();
      if (this.eventObject[cellDate]) {
        this.currentCellObject[cellDate] = [...this.eventObject[cellDate]];
        calendarCell.setEventList(this.eventObject[cellDate]);
      }

      this.cellContainer.appendChild(calendarCell.getCellElement());
      tempDate += 1;
    }
  }

  setCurMonthCellHtml() {
    const curMonthEndDate = getMonthEndDate({
      year: this.curYear,
      month: this.curMonth
    });
    let tempDate = 1;

    while (tempDate <= curMonthEndDate) {
      const calendarCell = new CalendarCell({
        date: tempDate,
        eventList: [],
        isCurMonth: true,
        curYear: this.curYear,
        curMonth: this.curMonth
      });

      const cellDate = calendarCell.getDate();
      if (this.eventObject[cellDate]) {
        this.currentCellObject[cellDate] = [...this.eventObject[cellDate]];
        calendarCell.setEventList(this.eventObject[cellDate]);
      }

      this.cellContainer.appendChild(calendarCell.getCellElement());
      tempDate += 1;
    }
  }

  setNextMonthCellHtml() {
    let tempDate = 1;
    const WEEK_LAST_DAY_INDEX = 6;
    const nextMonthEndDate = WEEK_LAST_DAY_INDEX - this.endDateDayIdx;
    const { curMonth, curYear } = this.getNextMonthDateObj();

    while (tempDate <= nextMonthEndDate) {
      const calendarCell = new CalendarCell({
        date: tempDate,
        eventList: [],
        isCurMonth: false,
        curMonth,
        curYear
      });

      const cellDate = calendarCell.getDate();
      if (this.eventObject[cellDate]) {
        this.currentCellObject[cellDate] = [...this.eventObject[cellDate]];
        calendarCell.setEventList(this.eventObject[cellDate]);
      }

      this.cellContainer.appendChild(calendarCell.getCellElement());
      tempDate += 1;
    }
  }

  getPrevMonthDateObj() {
    const isFirstMonth = this.curMonth === 1;
    const isFirstDay = this.firstDateDayIdx === 0;

    return {
      curYear: isFirstMonth ? this.curYear - 1 : this.curYear,
      curMonth: isFirstMonth ? 12 : this.curMonth - 1,
      curDate: this.prevMonthEndDate,
      curDayIdx: isFirstDay ? 6 : this.firstDateDayIdx - 1,
    }
  }

  goPrevMonth() {
    const prevMonthDateInfo = this.getPrevMonthDateObj();

    this.setCurDateInfo({ ...prevMonthDateInfo });
    this.updateHeader();
    this.updateCellContainer();
  }

  getNextMonthDateObj() {
    const isLastMonth = this.curMonth === 12;
    const isLastDay = this.endDateDayIdx === 6;

    return {
      curYear: isLastMonth ? this.curYear + 1 : this.curYear,
      curMonth: isLastMonth ? 1 : this.curMonth + 1,
      curDate: 1,
      curDayIdx: isLastDay ? 0 : this.endDateDayIdx + 1,
    }
  }

  goNextMonth() {
    const nextMonthDateInfo = this.getNextMonthDateObj();

    this.setCurDateInfo({ ...nextMonthDateInfo });
    this.updateHeader();
    this.updateCellContainer();
  }

  alertEventList({ target }) {
    const cellElement = target.closest('.calendar-cell');
    if (!cellElement) return;

    const eventList = [...cellElement.querySelectorAll('.cell-event')];
    if (eventList.length === 0) return;

    const eventListText = eventList.reduce((acc, cur) => acc + `${cur.innerText}\n`, ``);
    alert(eventListText);
  }

  attachEvent() {
    this.prevBtn.addEventListener('click', () => this.goPrevMonth());
    this.nextBtn.addEventListener('click', () => this.goNextMonth());
    this.cellContainer.addEventListener('click', (evt) => this.alertEventList(evt), true);
  }
}