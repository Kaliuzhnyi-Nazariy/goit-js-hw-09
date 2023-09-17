// Import library
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

selectors = {
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const inputDate = document.querySelector('#datetime-picker');

let betweenDates = 0;
let dateForm = null;
let timerID = null;

const btnStart = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    differenceDate(selectedDates[0]);
  },
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
btnStart.disabled = true;

flatpickr(inputDate, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function differenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStart.disabled = true;

    alert('Please choose a date in the future');
  }
  betweenDates = selectedDates.getTime() - currentDate;
  dateForm = convertMs(betweenDates);

  renderDate(dateForm);
  btnStart.disabled = false;
}

function startBtn() {
  timerID = setInterval(startTimer, 1000);
  btnStart.disabled = true;
  inputDate.disabled = true;
}

function startTimer() {
  betweenDates -= 1000;

  if (
    selectors.seconds.textContent <= 0 &&
    selectors.minutes.textContent <= 0 &&
    selectors.hours.textContent <= 0 &&
    selectors.day.textContent <= 0
  ) {
    alert('Time end!');
    clearInterval(timerID);



    btnStart.disabled = false;
    inputDate.disabled = false;
  }

  dateForm = convertMs(betweenDates);
  renderDate(dateForm);
}

function renderDate({ days, hours, minutes, seconds }) {
  selectors.day.textContent = addLeadingZero(days);
  selectors.hours.textContent = addLeadingZero(hours);
  selectors.minutes.textContent = addLeadingZero(minutes);
  selectors.seconds.textContent = addLeadingZero(seconds);


}

btnStart.addEventListener('click', startBtn);

// window.addEventListener('click', () => {
//     clearInterval(timerID);

//     btnStart.setAttribute('disabled', true);

//     selectors.seconds.textContent = '00';
//     selectors.minutes.textContent = '00';
//     selectors.hours.textContent = '00';
//     selectors.day.textContent = '00';
// });

// btnStart.addEventListener('click', () => {
//   const selectedDate = new Date(inputDate.value).getTime();
//   const currentDate = Date.now();
//   let betweenDates = selectedDate - currentDate;

//   setInterval(() => {
//     console.log(convertMs(betweenDates));
//     selectors.day.textContent = convertMs(betweenDates).getHours()
//   }, 1000);
// });

// console.log(selectedDate)
// console.log(currentDate)
// btnStart.disabled = true;

// if (selectedDate > currentDate) {
//   btnStart.disabled = false;
// }
