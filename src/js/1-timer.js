import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.addEventListener('DOMContentLoaded', () => {
  let userSelectedDate;

  const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
    
      const now = new Date();
      const startButton = document.querySelector('[data-start]');

      if (userSelectedDate <= now) {
        iziToast.error({
          title: 'Invalid Date',
          message: 'Please choose a date in the future',
          position: 'topRight'
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

 document.querySelector('[data-start]').addEventListener('click', () => {
  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerUI(timeDifference);
    }
  }, 1000);
});

  function updateTimerUI(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
});