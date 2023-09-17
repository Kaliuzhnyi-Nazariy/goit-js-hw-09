const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let changeTimeId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const onClick = () => {
    changeTimeId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
};

const offClick = () => {
  clearInterval(changeTimeId);
  startBtn.disabled = 0;
};

startBtn.addEventListener('click', onClick);
stopBtn.addEventListener('click', offClick);

// const button = document.querySelector("button");

// const onClick = () => {
//   const timerId = setTimeout(() => {
//     console.log("I love async JS!");
//   }, 2000);

//   console.log(timerId);
// };

// button.addEventListener("click", onClick);
