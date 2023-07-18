const shipsToDestroy = [[], []];

opponentSqauresBoard.forEach((opponentSquare) => {
  opponentSquare.addEventListener("click", () => {
    if (
      !document
        .querySelector("section#oponentBoard")
        .classList.contains("game-over")
    ) {
      if (
        opponentSquare.innerText !== "O" &&
        opponentSquare.innerText !== "X"
      ) {
        shotShipO(opponentSquare, "opponent");
        createNonShotShipsList(shipsToDestroy, "opponent");
        isGameOver("opponent");
        allComputerActions();
      }
    }
  });
});

function allComputerActions(boardSiteToShot = "player") {
  const number = computerShot();
  shotShipO(squares[number], boardSiteToShot);
  createNonShotShipsList(shipsToDestroy, boardSiteToShot);
  isGameOver(boardSiteToShot);
}

function computerShot() {
  let randomNonShotSquare;
  do {
    randomNonShotSquare = Math.floor(Math.random() * squares.length);
  } while (
    squares[randomNonShotSquare].innerText === "O" ||
    squares[randomNonShotSquare].innerText === "X"
  );
  return randomNonShotSquare;
}

function createNonShotShipsList(list, whichBoardSiteYouShot) {
  const name = [
    "carrier",
    "battleShip",
    "destroyer",
    "submarine",
    "patrolBoat",
  ];
  for (let y = 0; y < 2; y++) {
    for (let i = 0; i < 5; i++) {
      list[y][i] = document.querySelectorAll(
        `div.${whichBoardSiteYouShot}-${name[i]}`
      );
    }
  }
}

function shotShipO(square, boardSite) {
  const valuesForClassLists = {
    carrier: " Carrier Ship",
    battleShip: "Battle Ship",
    destroyer: "Destroyer",
    submarine: "Submarine",
    patrolBoat: "Patrol Boat",
  };

  if (square.classList.contains("ship")) {
    square.style.backgroundColor = "red";
    square.innerText = "X";
    const typeOfShip =
      boardSite === "opponent"
        ? square.classList[2].slice(9)
        : square.classList[2].slice(7);
    const existingShip = document.querySelectorAll(
      `.${square.classList[2]}`
    ).length;
    valuesForClassLists.typeOfShip;
    square.classList.remove(square.classList[2]);
    square.classList.remove("ship");

    if (existingShip === 1) {
      alert(
        `${
          boardSite === "player" ? "The Computer" : "Nice, You"
        } destroy the ship: ${valuesForClassLists[typeOfShip]}`
      );
    }
  } else {
    square.innerText = "O";
  }
}

function isGameOver(boardSite) {
  let arrayNum = boardSite === "opponent" ? 1 : 0;
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    sum += shipsToDestroy[arrayNum][i].length;
  }

  if (sum === 0) {
    createWinInfo(boardSite);
  } else {
    return sum;
  }
}
function createWinInfo(winner) {
  document.querySelector("section#oponentBoard").classList.add("game-over");
  const articelEl = document.querySelector("article");
  const msg =
    winner === "player"
      ? " Oh nooo... The computer won... This time"
      : " WOOOW, You did it. You beat the computer! <3 ";
  articelEl.innerText = msg;
  articelEl.style.display = "flex";
}
