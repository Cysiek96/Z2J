  let opponentSqauresBoard = Object.values(
    document.querySelectorAll("section#oponentBoard > div.square")
  );
  opponentSqauresBoard = opponentSqauresBoard.filter(
    (square, i) => square.innerText === "" && i !== 0 && i < 121
  );

  startGameBtn.addEventListener("click", () => {
    document.querySelector("section.shipsDeploy").remove();
    deployComputerShipsOnBoard();
  });

  function deployComputerShipsOnBoard() {
    createFreeSquareNnumber();
  }
  function createFreeSquareNnumber() {
    let randomSquareNumber;
    for (let i = 0; i < 5; i++) {
      const columnDirection = Math.random() * 2 >= 1 ? true : false;
      const directoryCorrection = columnDirection ? 10 : 1;
      currentShip = opponentShips[i];
      let valid = [];
      do {
        randomSquareNumber = Math.floor(
          Math.random() * opponentSqauresBoard.length
        );
        valid = isValidArea(
          randomSquareNumber,
          columnDirection,
          opponentSqauresBoard,
          directoryCorrection
        );
      } while (!valid);
      for (let i = 0; i < currentShip.length; i++) {
        createDOMElement(randomSquareNumber, directoryCorrection);
      }
      creatShipsNeigbourhood(
        randomSquareNumber,
        columnDirection,
        directoryCorrection,
        opponentSqauresBoard
      );
    }
  }

  function createDOMElement(randomSquareNumber, directoryCorrection) {
    for (let i = 0; i < currentShip.length; i++) {
      const squareNumber = randomSquareNumber + i * directoryCorrection;
      opponentSqauresBoard[squareNumber].classList.add("ship");
      opponentSqauresBoard[squareNumber].classList.add(
        `opponent-${currentShip.id}`
      );
    }
  }
