import { weekDay } from '../constant';

export default class Calendar {
  constructor({ container, width, height }) {
    this.container = container;
    this.container.style.width = width;
    this.container.style.height = height;
    this.setCalendarDate();
    this.init();
    this.initWeekDayBar();
  }

  setCalendarDate() {
    //오늘 날짜를 기반으로 현재 달력 데이터를 세팅한다.
    //year, month, start day, dayCount
    this.curYear = 2019;
    this.curMonth = 10;
    this.curDay = 28;
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
    this.yearText = document.createElement('p');

    this.prevBtn.innerText = 'prev';
    this.yearText.innerText = this.curYear;
    this.nextBtn.innerText = 'next';

    this.header.appendChild(this.prevBtn);
    this.header.appendChild(this.yearText);
    this.header.appendChild(this.nextBtn);
  }

  initWeekDayBar() {
    weekDay.map((weekDay) => {
      return `<div class='week-day'>${weekDay}</div>`;
    }).forEach((weekDayElement) => {
      this.weekDayBar.insertAdjacentHTML('beforeend', weekDayElement);
    });
  }
}