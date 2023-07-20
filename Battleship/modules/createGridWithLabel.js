const label = [
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  "J",
  "I",
  "H",
  "G",
  "F",
  "E",
  "D",
  "C",
  "B",
  "A",
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  "J",
  "I",
  "H",
  "G",
  "F",
  "E",
  "D",
  "C",
  "B",
  "A",
];
const playerSection = document.querySelector("section");
const computerSection = document.querySelector("section#oponentBoard");
let gridDemension = 11 * 11;

function createBoardGameWithLabels(section) {
  for (let i = 0; i < gridDemension; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if ((i >= 1 && i <= 11) || (i !== 0 && i % 11 === 0)) {
      square.innerText = label[label.length - 1];
      label.pop();
    }
    section.appendChild(square);
  }
}

createBoardGameWithLabels(playerSection);
createBoardGameWithLabels(computerSection);
