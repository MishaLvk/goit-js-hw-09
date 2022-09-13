import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('input[type="text"]');
const start = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let selectDate = null;
start.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    if (selectDate > Date.now()) {
      start.removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
      return;
    }
  },
};

const fp = flatpickr(datetimePicker, options);

start.addEventListener('click', cons);

function cons() {
  start.setAttribute('disabled', true);
  const exercise = setInterval(() => {
    let timer = selectDate - Date.now();
    if (timer > 0) {
      const { days, hours, minutes, seconds } = convertMs(timer);
      day.textContent = `${addLeadingZero(days)}`;
      hour.textContent = `${addLeadingZero(hours)}`;
      minute.textContent = `${addLeadingZero(minutes)}`;
      second.textContent = `${addLeadingZero(seconds)}`;
    } else {
      console.log('stop');
      clearInterval(exercise);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
