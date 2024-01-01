
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stateInput = form.querySelector('input[name="state"]:checked');

    const delay = parseInt(delayInput.value, 10);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stateInput.value === 'fulfilled') {
          iziToast.success({
            title: '✅',
            message: ` Fulfilled promise in ${delay}ms`,
          });
          resolve();
        } else {
          iziToast.error({
            title: '❌',
            message: ` Rejected promise in ${delay}ms`,
          });
          reject();
        }
      }, delay);
    })
      .then(() => {
      })
      .catch(() => {
      });
  });
});