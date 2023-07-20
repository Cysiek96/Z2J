const shipsToDestroy = { player: [], opponent: [] };
let clicked = 0;
const oppoeneBoardSite = document.querySelector("section#oponentBoard");

opponentSqauresBoard.forEach((opponentSquare) => {
  opponentSquare.addEventListener("click", () => {
    if (clicked === 0) {
      createDeployedShipList(shipsToDestroy);
    }
    if (
      !oppoeneBoardSite.classList.contains("game-over") &&
      opponentSquare.innerText !== "O" &&
      opponentSquare.innerText !== "X"
    ) {
      shotShipO(opponentSquare, "opponent");
      isGameOver("opponent");
      allComputerActions();
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
    const girdToSearchForIndex = getValuesByBoardSite(whichBoardSiteYouShot);
    for (let i = 0; i < 5; i++) {
      list[whichBoardSiteYouShot][i] = Object.values(
        document.querySelectorAll(`div.${whichBoardSiteYouShot}-${name[i]}`)
      );
      // Change the array element into index
      list[whichBoardSiteYouShot][i].forEach((el, z) => {
        list[whichBoardSiteYouShot][i][z] = girdToSearchForIndex.indexOf(el);
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
  const gridToSearch = getValuesByBoardSite(boardSite);
  const shotSquareIndex = gridToSearch.indexOf(square);
  const { existInShipsArray, untrackedShipFragment, shipToDrownIndex } =
    searchForIndexInGrid(boardSite, shotSquareIndex);

  if (existInShipsArray) {
    square.style.backgroundColor = "red";
    square.innerText = "X";
    if (untrackedShipFragment === 0) {
      alert(
        `${getValuesByBoardSite(boardSite, "msg")} destroy the ship: ${
          valuesForClassLists[shipToDrownIndex]
        }`
      );
    }
  } else {
    square.innerText = "O";
  }
}
function searchForIndexInGrid(boardSite, squareIndexNumber) {
  for (let shipArray of shipsToDestroy[boardSite]) {
    for (let shipIndex of shipArray) {
      if (shipIndex === squareIndexNumber) {
        shipArray.splice(shipArray.indexOf(shipIndex), 1, null);
        let sum = shipArray.length;
        shipArray.forEach((index) => {
          if (index === null) {
            sum--;
          }
        });
        return {
          existInShipsArray: true,
          untrackedShipFragment: sum,
          shipToDrownIndex: shipsToDestroy[boardSite].indexOf(shipArray),
        };
      }
    }
  }
  return {
    existInShipsArray: false,
    untrackedShipFragment: undefined,
  };
}

function isGameOver(boardSite) {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    shipsToDestroy[boardSite][i].forEach((index) =>
      index === null ? "" : sum++
    );
  }
  if (sum === 0) {
    createWinInfo(boardSite);
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

function getValuesByBoardSite(boardSite, elementToGet = "grid") {
  if (elementToGet === "grid") {
    if (boardSite === "opponent") {
      return opponentSqauresBoard;
    }
    return squares;
  } else if (elementToGet === "msg") {
    if (boardSite === "opponent") {
      return "Nice, You";
    }
    return "The Computer";
  }
}
