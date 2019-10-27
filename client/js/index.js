import '../css/style.scss';
import Calendar from './Calendar';

const calendarContainer_section = document.body.querySelector('.calendar');
const calederOptions = {
  container: calendarContainer_section,
  width: '60rem',
  height: '40rem'
}

new Calendar({...calederOptions});