import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let delayValue = null;
let stepValue = null;
let amountValue = null;

form.addEventListener('submit', onButtonClick);

function onButtonClick(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  delayValue = Number(delay.value);
  stepValue = Number(step.value);
  amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
