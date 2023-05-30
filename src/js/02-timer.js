import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  const str = value.toString();
  return str.padStart(2, '0');
}

let chosenDate;

const btn = document.querySelector('[data-start]');

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = new Date(selectedDates[0]);

    if (!(chosenDate && chosenDate.getTime() - new Date().getTime() > 0)) {
      btn.disabled = true;

      window.alert('Please choose a date in the future');
    } else {
      btn.disabled = false;
    }
  },
};

const spanSeconds = document.querySelector('[data-seconds]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanHours = document.querySelector('[data-hours]');
const spanDays = document.querySelector('[data-days]');

const selector = document.getElementById('datetime-picker');
flatpickr(selector, options);

const handleStartButton = () => {
  const interval = setInterval(() => {
    const currentDate = new Date();

    const ms = chosenDate.getTime() - currentDate.getTime();

    if (ms < 1000) {
      clearInterval(interval);
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    const convertedDates = {
      days: addLeadingZero(days),
      hours: addLeadingZero(hours),
      minutes: addLeadingZero(minutes),
      seconds: addLeadingZero(seconds),
    };

    spanSeconds.textContent = convertedDates.seconds;
    spanMinutes.textContent = convertedDates.minutes;
    spanHours.textContent = convertedDates.hours;
    spanDays.textContent = convertedDates.days;
  }, 1000);
};

btn.addEventListener('click', function () {
  handleStartButton();
});
111
