const squares = document.querySelectorAll(".gameBoard div");
const btn = document.querySelector("button.conf");
const alertWindow = document.querySelector("div.alertWindow");
const winningFormat = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let text = "O";
let iter = 0;
let isWin = false;

btn.addEventListener("click", () => {
  if (isWin) {
    clearTheGame();
  }
  alertWindow.classList.remove("show");
});

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.innerText === "") {
      square.innerText = `${text}`;
      square.classList.add("circle");
      checkWin("circle");
      if (!isWin && iter < 4) {
        addCross();
        checkWin("cross");
      }
    } else {
      getAlert();
    }
  });
});
function clearTheGame() {
  squares.forEach((square) => {
    square.innerText = "";
    square.classList.remove("circle");
    square.classList.remove("cross");
    isWin = false;
    iter = 0;
  });
}
function addCross() {
  let idx = Math.floor(Math.random() * squares.length);
  while (squares[idx].innerText !== "") {
    idx = Math.floor(Math.random() * squares.length);
  }
  squares[idx].innerText = "X";
  squares[idx].classList.add("cross");
  iter++;
}
function getAlert(text = "Do not cheat!", btnText = "That was mistake") {
  alertWindow.childNodes[1].innerHTML = text;
  btn.innerText = btnText;
  alertWindow.classList.add("show");
}
function checkWin(classToCheck) {
  let winCondition = 15;
  let draw = 9;
  // Look for draw condition, but firstly check if user win
  squares.forEach((square) => {
    if (square.innerText !== "") {
      draw--;
    }
  });
  //
  // Maps the entire win table and searches for values that subtract from winCondition. A value of 0 indicates a win by some player.
  winningFormat.forEach((win) => {
    win.forEach((idx) => {
      if (squares[idx].classList.contains(classToCheck)) {
        winCondition -= +squares[idx].getAttribute("data-value");
      }
    });

    if (winCondition == 0) {
      if (classToCheck === "circle") {
        getAlert(`Circle wins !!!! Great Job`, "Once again ?");
        return (isWin = true);
      } else {
        getAlert(
          "Cross wins :(. Will You try to beat this player? ",
          "Let try to beat him!"
        );
        return (isWin = true);
      }
    } else {
      winCondition = 15;
    }
  });
  // If there are no win, and we fullfil all fields then call the draw.
  if (draw === 0) {
    getAlert("It is draw. Let try to beat the computer", "Once again?");
    return (isWin = true);
  }
}
