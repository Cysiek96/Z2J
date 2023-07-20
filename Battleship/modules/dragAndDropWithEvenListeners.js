const shipsLength = [5, 4, 3, 3, 2];
let ships = document.querySelectorAll("section.shipsDeploy > div");
const rotateBtn = document.querySelector("button.rotate");
const startGameBtn = document.querySelector("button.gameStart");
const allSquareElements = Object.values(
  document.querySelectorAll("section > div.square")
);

let opponentShips = [];
ships.forEach((ship, i) => {
  ship.length = shipsLength[i];
  opponentShips.push(ship);
});

const squares = allSquareElements.filter(
  (square, i) => square.innerText === "" && i !== 0 && i < 121
); // get only the valid square value

let currentShip;
let columnDirection = false;
let directoryCorrection = 1;

rotateBtn.addEventListener("click", () => {
  if (columnDirection) {
    columnDirection = false;
    directoryCorrection = 1;
    rotateBtn.innerText = "Row Direction";
  } else {
    columnDirection = true;
    directoryCorrection = 10;
    rotateBtn.innerText = "Column Direction";
  }
});

squares.forEach((square, i) => {
  square.addEventListener("dragover", (e) => {
    if (!square.classList.contains("ship")) {
      if (
        square.innerText === "" &&
        isValidArea(i, columnDirection, squares, directoryCorrection) &&
        !square.classList.contains("noDraggable")
      ) {
        e.preventDefault();
        changeTheBackgorundColor(i, "#03045e");
      }
    }
  });
  square.addEventListener("dragleave", () => {
    if (
      !square.classList.contains("ship") &&
      isValidArea(i, columnDirection, squares, directoryCorrection)
    ) {
      changeTheBackgorundColor(i, "inherit");
    }
  });
  square.addEventListener("drop", (e) => {
    if (!square.classList.contains("ship")) {
      const squareNumber = squares.indexOf(e.target);
      createAndRemoveDOMElement(squareNumber);
      creatShipsNeigbourhood(
        squareNumber,
        columnDirection,
        directoryCorrection,
        squares
      );
    }
  });
});

ships.forEach((ship) => {
  ship.addEventListener("dragstart", function (e) {
    currentShip = e.target;
    ship.style.opacity = "0.7";
  });
  ship.addEventListener("dragend", (e) => {
    e.preventDefault();
    ship.style.opacity = "1";
  });
});

function createAndRemoveDOMElement(squareNumber) {
  for (let i = 0; i < currentShip.length; i++) {
    const squareIndexWithCorrectionValue =
      squareNumber + i * directoryCorrection;
    const divEl = document.createElement("div");
    squares[squareIndexWithCorrectionValue].classList.add(`ship`);
    squares[squareIndexWithCorrectionValue].classList.add(
      `player-${currentShip.id}`
    );
    squares[squareIndexWithCorrectionValue].appendChild(divEl);
  }

  document.querySelector(`section.shipsDeploy>div#${currentShip.id}`).remove();
  ships = document.querySelectorAll("section.shipsDeploy > div");
  if (ships.length === 0) {
    rotateBtn.style.display = "none";
    startGameBtn.style.display = "block";
  }
}
function changeTheBackgorundColor(i, color) {
  for (let y = 0; y < currentShip.length; y++) {
    squares[i + y * directoryCorrection].style.backgroundColor = color;
  }
}

function isValidArea(
  targettingSquareIndexNumber,
  columnDirection,
  selectedGrid,
  directoryCorrection
) {
  const validation = createValidationArea(
    targettingSquareIndexNumber,
    columnDirection,
    directoryCorrection
  );
  for (let i = 0; i < currentShip.length; i++) {
    const indexForThisIteration =
      targettingSquareIndexNumber + i * directoryCorrection;
    if (selectedGrid[indexForThisIteration]) {
      if (
        validation.includes(indexForThisIteration) &&
        !selectedGrid[indexForThisIteration].classList.contains("ship") &&
        !selectedGrid[indexForThisIteration].classList.contains("noDraggable")
      ) {
        validation.push(true);
      } else {
        validation.push(false);
      }
    } else {
      validation.push(false);
    }
  }
  return validation.filter((val) => val === false).length > 0 ? false : true;
}

function creatShipsNeigbourhood(
  targettingSquareIndexNumber,
  columnDirection,
  directoryCorrection,
  selectedGrid
) {
  let disabledSquareRules = [];
  if (!columnDirection) {
    disabledSquareRules = [
      [-11, -10, -9],
      [-1, 0, 1],
      [9, 10, 11],
    ];
  } else {
    disabledSquareRules = [
      [-11, -10, -9],
      [-1, 0, 1],
      [9, 10, 11],
    ];

    if (targettingSquareIndexNumber % 10 === 9) {
      disabledSquareRules.map((num) => num.pop());
    } else if (targettingSquareIndexNumber % 10 === 0) {
      disabledSquareRules.map((num) => num.shift());
    }
  }
  disabledSquareRules.forEach((num) => {
    let validateArea = [];
    if (!columnDirection) {
      validateArea = createValidationArea(
        +targettingSquareIndexNumber + num[1],
        columnDirection,
        directoryCorrection
      );
    }

    for (let y = 0; y < num.length; y++) {
      if (columnDirection) {
        validateArea = createValidationArea(
          +targettingSquareIndexNumber + num[y],
          columnDirection,
          directoryCorrection
        );
      }
      for (let i = 0; i < currentShip.length; i++) {
        const indexForThisIteration =
          +targettingSquareIndexNumber + i * directoryCorrection + num[y];
        if (selectedGrid[indexForThisIteration]) {
          if (
            validateArea.includes(+indexForThisIteration) &&
            !(+indexForThisIteration === 0)
          ) {
            selectedGrid[indexForThisIteration].classList.add("noDraggable");
          }
        }
      }
    }
  });
}

function createValidationArea(
  targettingSquareIndexNumber,
  columnDirection,
  directoryCorrection
) {
  const validation = [];
  let firstElementInDraggingRowNumber;
  if (!columnDirection) {
    firstElementInDraggingRowNumber =
      Math.trunc(targettingSquareIndexNumber / 10) * 10;
  } else {
    while (targettingSquareIndexNumber > 10) {
      targettingSquareIndexNumber -= 10;
    }
    firstElementInDraggingRowNumber = targettingSquareIndexNumber;
  }
  for (let i = 0; i < 10; i++) {
    validation.push(i * directoryCorrection + firstElementInDraggingRowNumber);
  }
  return validation;
}
