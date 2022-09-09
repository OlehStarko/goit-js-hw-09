const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let changeColorId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  changeColorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  clearInterval(changeColorId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
