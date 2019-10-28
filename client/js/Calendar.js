import { weekDay } from '../constant';
import { getMonthStartDay, getMonthEndDay, getMonthEndDate } from '../util';

import CalendarCell from './CalendarCell';

export default class Calendar {
  constructor({ container, width, height }) {
    this.container = container;
    this.container.style.width = width;
    this.container.style.height = height;
    this.today = new Date(Date.now());
    this.todayYear = this.today.getFullYear();
    this.todayMonth = this.today.getMonth() + 1;
    this.todayDate = this.today.getDate();
    this.todayDayIdx = this.today.getDay();

    this.setCurDateInfo({
      curYear: this.todayYear,
      curMonth: this.todayMonth,
      curDate: this.todayDate,
      curDayIdx: this.todayDayIdx
    });

    this.init();
    this.initWeekDayBar();
    this.initCellContainer();
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

  setCalendarEvent() {
    //달력을 그리기 전, api에서 데이터를 받아와 저장해둔다.
    //이 작업이 끝나야 초기 달력을 그릴 수 있도록 한다.
  }

  init() {
    this.header = document.createElement('header');
    this.header.style.height = '10%';
    this.header.className = 'calendar-header';
    this.container.appendChild(this.header);
    this.initHeader();

    this.weekDayBar = document.createElement('section');
    this.weekDayBar.style.height = '5%';
    this.weekDayBar.className = 'calendar-week-day-bar';
    this.container.appendChild(this.weekDayBar);

    this.cellContainer = document.createElement('section');
    this.cellContainer.className = 'cell-container';
    this.container.appendChild(this.cellContainer);

  }

  initHeader() {
    this.header.innerHTML = '';
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.yearMonthText = document.createElement('p');

    this.prevBtn.innerText = 'prev';
    this.yearMonthText.innerText = `${this.curYear}년 ${this.curMonth}월`;
    this.nextBtn.innerText = 'next';

    this.header.appendChild(this.prevBtn);
    this.header.appendChild(this.yearMonthText);
    this.header.appendChild(this.nextBtn);

    this.attachEvent();
  }

  initWeekDayBar() {
    weekDay
      .map((weekDay) => `<div class='week-day'>${weekDay}</div>`)
      .forEach((weekDayElement) => this.weekDayBar.insertAdjacentHTML('beforeend', weekDayElement));
  }

  getPrevMonthCellHtml() {
    this.prevMonthEndDate = getMonthEndDate({
      year: this.curYear,
      month: this.curMonth === 1
        ? 12
        : this.curMonth - 1
    });
    let prevMonthCellHtml = ``;
    if (this.firstDateDayIdx === 0) return prevMonthCellHtml;

    const prevMonthStartDate = this.prevMonthEndDate - (this.firstDateDayIdx - 1);
    let tempDate = prevMonthStartDate;

    while (tempDate <= this.prevMonthEndDate) {
      const calendarCell = new CalendarCell({ date: tempDate, eventList: [], isCurMonth: false });
      prevMonthCellHtml += calendarCell.getCellHtml();
      tempDate += 1;
    }
    return prevMonthCellHtml;
  }

  getCurMonthCellHtml() {
    const curMonthEndDate = getMonthEndDate({
      year: this.curYear,
      month: this.curMonth
    });
    let curMonthCellHtml = ``;
    let tempDate = 1;

    while (tempDate <= curMonthEndDate) {
      const calendarCell = new CalendarCell({
        date: tempDate,
        eventList: [],
        isCurMonth: true,
        curYear: this.curYear,
        curMonth: this.curMonth
      });
      curMonthCellHtml += calendarCell.getCellHtml();
      tempDate += 1;
    }
    return curMonthCellHtml;
  }

  getNextMonthCellHtml() {
    let nextMonthCellHtml = ``;
    let tempDate = 1;
    const WEEK_LAST_DAY_INDEX = 6;
    const nextMonthEndDate = WEEK_LAST_DAY_INDEX - this.endDateDayIdx;

    while (tempDate <= nextMonthEndDate) {
      const calendarCell = new CalendarCell({ date: tempDate, eventList: [], isCurMonth: false });
      nextMonthCellHtml += calendarCell.getCellHtml();
      tempDate += 1;
    }
    return nextMonthCellHtml;
  }

  initCellContainer() {
    this.setCalendarDate();
    this.cellContainer.innerHTML = '';
    const prevMonthCellHtml = this.getPrevMonthCellHtml();
    const curMonthCellHtml = this.getCurMonthCellHtml();
    const nextMonthCellHtml = this.getNextMonthCellHtml();

    this.cellContainer.insertAdjacentHTML('beforeend', prevMonthCellHtml);
    this.cellContainer.insertAdjacentHTML('beforeend', curMonthCellHtml);
    this.cellContainer.insertAdjacentHTML('beforeend', nextMonthCellHtml);
  }

  attachEvent() {
    this.prevBtn.addEventListener('click', () => this.goPrevMonth());
    this.nextBtn.addEventListener('click', () => this.goNextMonth());
  }

  goPrevMonth() {
    const isFirstMonth = this.curMonth === 1;
    const isFirstDay = this.firstDateDayIdx === 0;

    const prevMonthDateInfo = {
      curYear: isFirstMonth ? this.curYear - 1 : this.curYear,
      curMonth: isFirstMonth ? 12 : this.curMonth - 1,
      curDate: this.prevMonthEndDate,
      curDayIdx: isFirstDay ? 6 : this.firstDateDayIdx - 1,
    }
    console.log(prevMonthDateInfo);

    this.setCurDateInfo({...prevMonthDateInfo});
    this.initHeader();
    this.initCellContainer();
  }

  goNextMonth() {
    const isLastMonth = this.curMonth === 12;
    const isLastDay = this.endDateDayIdx === 6;

    const nextMonthDateInfo = {
      curYear: isLastMonth ? this.curYear + 1 : this.curYear,
      curMonth: isLastMonth ? 1 : this.curMonth + 1,
      curDate: 1,
      curDayIdx: isLastDay ? 0 : this.endDateDayIdx + 1,
    }
    console.log(nextMonthDateInfo);

    this.setCurDateInfo({ ...nextMonthDateInfo });
    this.initHeader();
    this.initCellContainer();
  }
}