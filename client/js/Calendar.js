export default class Calendar {
  constructor({container, width, height}) {
    console.log(container);
    this.container = container;
    this.container.style.width = width;
    this.container.style.height = height;
    this.init();
  }

  init() {
    this.header = document.createElement('header');
    this.header.style.height = '10%';
    this.header.className = 'calendar-header';
    this.container.appendChild(this.header);

    this.weekDayBar = document.createElement('section');
    this.weekDayBar.style.height = '5%';
    this.weekDayBar.className = 'calendar-week-day-bar';
    this.container.appendChild(this.weekDayBar);

    this.cellContainer = document.createElement('section');
    this.cellContainer.className = 'cell-container';
    this.container.appendChild(this.cellContainer);
  }
}