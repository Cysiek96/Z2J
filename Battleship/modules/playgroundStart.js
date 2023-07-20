const shipsToDestroy = [[], []];
let clicked = 0;
const oppoeneBoardSite = document.querySelector("section#oponentBoard");
opponentSqauresBoard.forEach((opponentSquare, i) => {
  opponentSquare.addEventListener("click", (e) => {
    if (clicked === 0) {
      createDeployedShipList(shipsToDestroy);
    }
    if (!oppoeneBoardSite.classList.contains("game-over")) {
      if (
        opponentSquare.innerText !== "O" &&
        opponentSquare.innerText !== "X"
      ) {
        shotShipO(opponentSquare, "opponent");
        isGameOver("opponent");
        allComputerActions();
      }
    }
    clicked++;
  });
});

function allComputerActions(boardSiteToShot = "player") {
  const number = computerShot();
  shotShipO(squares[number], boardSiteToShot);
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

function createDeployedShipList(list) {
  const name = [
    "carrier",
    "battleShip",
    "destroyer",
    "submarine",
    "patrolBoat",
  ];
  let whichBoardSiteYouShot;
  for (let y = 0; y < 2; y++) {
    y === 0
      ? (whichBoardSiteYouShot = "opponent")
      : (whichBoardSiteYouShot = "player");
    const girdToSearchForIndex = y === 0 ? opponentSqauresBoard : squares;
    for (let i = 0; i < 5; i++) {
      list[y][i] = Object.values(
        document.querySelectorAll(`div.${whichBoardSiteYouShot}-${name[i]}`)
      );
      // Change the array element into index
      list[y][i].forEach((el, z) => {
        list[y][i][z] = girdToSearchForIndex.indexOf(el);
      });
    }
  }
}

function shotShipO(square, boardSite) {
  const valuesForClassLists = [
    " Carrier Ship",
    "Battle Ship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];
  const gridToSearch =
    boardSite === "opponent" ? opponentSqauresBoard : squares;
  const shotSquareIndex = gridToSearch.indexOf(square);
  const isInShipsArray = shipGridContainShotSqareIndex(
    boardSite,
    shotSquareIndex
  );
  console.log(isInShipsArray);
  if (isInShipsArray[0]) {
    square.style.backgroundColor = "red";
    square.innerText = "X";
    if (isInShipsArray[1] === 0) {
      alert(
        `${
          boardSite === "player" ? "The Computer" : "Nice, You"
        } destroy the ship: ${valuesForClassLists[isInShipsArray[2]]}`
      );
    }
  } else {
    square.innerText = "O";
  }
}
function shipGridContainShotSqareIndex(boardSite, squareIndexNumber) {
  let boardSiteIndex = boardSite === "opponent" ? 0 : 1;
  for (let shipArray of shipsToDestroy[boardSiteIndex]) {
    for (let shipIndex of shipArray) {
      if (shipIndex === squareIndexNumber) {
        shipArray.splice(shipArray.indexOf(shipIndex), 1);
        return [
          true,
          shipArray.length,
          shipsToDestroy[boardSiteIndex].indexOf(shipArray),
        ];
      }
    }
  }
  return [false, 1];
}

function isGameOver(boardSite) {
  let arrayNum = boardSite === "opponent" ? 0 : 1;
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
