import '../css/style.scss';
import Calendar from './Calendar';

const calendarContainer_section = document.body.querySelector('.calendar');
const calederOptions = {
  container: calendarContainer_section,
  width: '50rem'
}

new Calendar({...calederOptions});