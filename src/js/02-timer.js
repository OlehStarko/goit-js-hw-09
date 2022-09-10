import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const dateInput = document.querySelector('#datetime-picker');

let intervalId = null;
let isActive = false;

startButton.setAttribute('disabled', 'disabled');
Notiflix.Notify.info('Please, select the date you prefere to set the timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    startButtonKlick(selectedDate);
  },
};

flatpickr(dateInput, options);

function startButtonKlick(data) {
  const selectedDate = data.getTime();
  const currentTime = Date.now();
  if (selectedDate < currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  } else {
    startButton.removeAttribute('disabled');
  }
  startButton.addEventListener('click', () => {
    startCountdownTimer(selectedDate, currentTime);
  });
}

function startCountdownTimer(futureDatetime, currentTime) {
  if (isActive) {
    return;
  }
  isActive = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = futureDatetime - currentTime;
    const time = convertMs(deltaTime);
    updateHtmlValue(time);
  }, 1000);

  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    clearInterval(intervalId);
  }
}

function updateHtmlValue({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
