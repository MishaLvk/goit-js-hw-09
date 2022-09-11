const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerColor = null;
stop.setAttribute('disabled', true);

start.addEventListener('click', startClick);
stop.addEventListener('click', stopClick);

function startClick() {
  timerColor = setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = `${color}`;
  }, 1000);
  start.setAttribute('disabled', true);
  stop.removeAttribute('disabled');
}

function stopClick() {
  clearInterval(timerColor);
  start.removeAttribute('disabled');
  stop.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
