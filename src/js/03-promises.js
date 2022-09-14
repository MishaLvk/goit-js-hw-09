import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', subForm);

function subForm(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue);

    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `Fulfilled promise ${position}  in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
        );
      }
    }, delay);
  });
  promise.then(
    value => {
      value;
    },

    error => {
      error;
    }
  );
}
