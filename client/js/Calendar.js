import { weekDay } from '../constant';
import { getMonthStartDay, getMonthEndDay } from '../util';
import { monthLastDate } from '../constant';

export default class Calendar {
  constructor({ container, width, height }) {
    this.container = container;
    this.container.style.width = width;
    this.container.style.height = height;
    this.setCalendarDate();
    this.init();
    this.initWeekDayBar();
    this.initCellContainer();
  }

  setCurDateInfo() {
    this.now = new Date(Date.now());
    this.curYear = this.now.getFullYear();
    this.curMonth = this.now.getMonth() + 1;
    this.curDate = this.now.getDate();
    this.curDayIdx = this.now.getDay();
  }

  setCalendarDate() {
    //오늘 날짜를 기반으로 현재 달력 데이터를 세팅한다.
    //year, month, start day, dayCount
    this.setCurDateInfo();
    this.firstDateDayIdx = getMonthStartDay({
      todayDate: this.curDate,
      todayDayIdx: this.curDayIdx
    });
    this.endDateDayIdx = getMonthEndDay({
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
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.yearMonthText = document.createElement('p');

    this.prevBtn.innerText = 'prev';
    this.yearMonthText.innerText = `${this.curYear}년 ${this.curMonth}월`;
    this.nextBtn.innerText = 'next';

    this.header.appendChild(this.prevBtn);
    this.header.appendChild(this.yearMonthText);
    this.header.appendChild(this.nextBtn);
  }

  initWeekDayBar() {
    weekDay.map((weekDay) => {
      return `<div class='week-day'>${weekDay}</div>`;
    }).forEach((weekDayElement) => {
      this.weekDayBar.insertAdjacentHTML('beforeend', weekDayElement);
    });
  }

  getPrevMonthCellHtml() {
    if (this.firstDateDayIdx === 0) return;

    const curMonthIdx = this.curMonth - 1;
    const prevMonthEndDate = monthLastDate[curMonthIdx - 1];
    const prevMonthStartDate = prevMonthEndDate - (this.firstDateDayIdx - 1);
    let prevMonthCellHtml = ``;
    let tempDate = prevMonthStartDate;

    while (tempDate <= prevMonthEndDate) {
      prevMonthCellHtml += `<div class='calendar-cell prev-month'><div class='calendar-cell header'>${tempDate}</div></div>`;
      tempDate += 1;
    }
    return prevMonthCellHtml;
  }

  getCurMonthCellHtml() {
    const curMonthIdx = this.curMonth - 1;
    const curMonthEndDate = monthLastDate[curMonthIdx];
    let curMonthCellHtml = ``;
    let tempDate = 1;

    while (tempDate <= curMonthEndDate) {
      curMonthCellHtml += `<div class='calendar-cell cur-month'><div class='calendar-cell header'>${tempDate}</div></div>`;
      tempDate += 1;
    }
    return curMonthCellHtml;
  }

  getNextMonthCellHtml() {

  }

  initCellContainer() {
    const prevMonthCellHtml = this.getPrevMonthCellHtml();
    const curMonthCellHtml = this.getCurMonthCellHtml();

    this.cellContainer.insertAdjacentHTML('beforeend', prevMonthCellHtml);
    this.cellContainer.insertAdjacentHTML('beforeend', curMonthCellHtml);
  }
}