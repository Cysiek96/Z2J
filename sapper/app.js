const mainSection = document.querySelector("section.mainSection");
const mainEl = document.querySelector("main");
const markedMinesCounter = document.querySelector(".markedMinesCounter");
const timeEl = document.querySelector("div.time");
const faceEl = document.querySelector("i.fa-face-smile");

const choosenLevel = prompt(
  "Choose your difficultyl lvl: (8x8) -1, (16x16) -2, (30x16) -3. Enter only number."
);
const ruleBook = {
  1: {
    row: 8,
    col: 8,
    mines: 10,
    addRules: [-9, -8, -7, -1, 1, 7, 8, 9],
  },
  2: {
    row: 16,
    col: 16,
    mines: 40,
    addRules: [-17, -16, -15, -1, 1, 15, 16, 17],
  },
  3: {
    row: 16,
    col: 30,
    mines: 99,
    addRules: [-31, -30, -29, -1, 1, 29, 30, 31],
  },
};

let clicked = 0;
markedMinesCounter.innerText = `0${ruleBook[choosenLevel].mines}`;
const addRules = ruleBook[choosenLevel].addRules;
if (choosenLevel >= 0) {
  if (Number(choosenLevel) === 3) {
    mainEl.style.margin = "15vh 20vw";
    mainEl.style.width = "60vw";
  }
  createSapperBlocks();
}

const buttonsNode = document.querySelectorAll("button");
const buttons = Array.prototype.slice.call(buttonsNode);

buttons.forEach((button) => {
  evetListenerAdd(button);
});

faceEl.addEventListener("click", () => restartGame());

function createSapperBlocks() {
  // Creating grid for dynamicaly choosen difficultly lvl
  mainSection.style.gridTemplate = `repeat(${ruleBook[choosenLevel].row},auto) /repeat(${ruleBook[choosenLevel].col},auto) `;
  mainSection.style.gap = 0;
  for (let i = 0; i < ruleBook[choosenLevel].row; i++) {
    for (let j = 0; j < ruleBook[choosenLevel].col; j++) {
      const button = document.createElement("button");
      button.classList.add(`r${i}`);
      button.classList.add(`c${j}`);
      if (Number(choosenLevel) !== 3) {
        button.style.height = `calc(50px/${ruleBook[choosenLevel].row / 8}) `;
        button.style.width = `calc(50px/${ruleBook[choosenLevel].col / 8})`;
      } else {
        button.style.height = `25px `;
        button.style.width = `25px `;
      }
      if (ruleBook[choosenLevel].row === 8) {
        button.style.fontSize = "medium";
      } else {
        button.style.fontSize = "smaller";
      }
      mainSection.appendChild(button);
    }
  }
}
function evetListenerAdd(btn) {
  // RClick Event
  btn.addEventListener("contextmenu", (e) => {
    if (!btn.disabled) {
      e.preventDefault();
      let marekdMinesText = Number(markedMinesCounter.innerText);
      if (marekdMinesText >= 0) {
        if (btn.childElementCount !== 0) {
          if (!btn.firstChild.classList.contains("fa-flag")) {
            btn.classList.add("clicked");
            if (btn.childElementCount !== 0) {
              btn.classList.add("minedOne");
            } else if (btn.innerText !== "") {
              btn.innerText = "";
            }
            btn.innerHTML = `<i class="fa-solid fa-flag" style="color: #ed0202"></i>`;
            markedMinesCounterUpdater(markedMinesCounter);
          } else if (btn.firstChild.classList.contains("fa-flag")) {
            btn.classList.remove("clicked");
            btn.firstChild.remove();
            if (btn.classList.contains("minedOne")) {
              btn.innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
            } else if (btn.value !== "") {
              btn.innerText = btn.value;
            }
            markedMinesCounterUpdater(markedMinesCounter, 1);
          }
        } else {
          btn.classList.add("clicked");
          if (btn.childElementCount !== 0) {
            btn.classList.add("minedOne");
          } else if (btn.innerText !== "") {
            btn.innerText = "";
          }
          btn.innerHTML = `<i class="fa-solid fa-flag" style="color: #ed0202"></i>`;
          markedMinesCounterUpdater(markedMinesCounter);
        }
      }
    }
    isGameOver(btn);
  });
  // LclickEvent
  btn.addEventListener("click", function () {
    clicked++;
    btn.classList.add("clicked");
    btn.disabled = "true";
    if (clicked === 1) {
      gameStart();
    } else {
      isGameOver(btn);
    }
    if (btn.innerText === "" && btn.childElementCount === 0) {
      unhideButtonsTest(btn);
    }
  });
}

function addingMinesAndNumbers() {
  minesRandomResult = generateandomFieldForMines();
  minesRandomResult.forEach((num) => {
    buttons[num].innerHTML = `<i class="fa-solid fa-land-mine-on"></i>`;
  });
  addNumbersIntoGame();
}

function gameStart() {
  addingMinesAndNumbers();
  myTimer = setInterval(addSecond, 1000);
}

function addSecond() {
  if (+timeEl.innerText < 9) {
    timeEl.innerText = `00${+timeEl.innerText + 1}`;
  } else if (+timeEl.innerText < 99) {
    timeEl.innerText = `0${+timeEl.innerText + 1}`;
  } else if (+timeEl.innerText < 999) {
    timeEl.innerText = `${+timeEl.innerText + 1}`;
  } else {
    confirm("TIME END !!");
  }
}

function addNumbersIntoGame() {
  let cycle = 0;
  buttons.forEach((button) => {
    if (button.childElementCount !== 0) {
      let addArr = [];
      let j = 0;
      while (j < addRules.length) {
        const toAdd = buttons[cycle + addRules[j]];
        addArr[j] = toAdd;
        if (colAndRowValidate(buttons[cycle], toAdd)) {
          +toAdd.innerText++;
          +toAdd.value++;
        }
        j++;
      }
    }
    cycle++;
  });
}

function unhideButtonsTest(btn) {
  let cycle = buttons.indexOf(btn);
  let z = 0;
  let isEmptyArray = [];
  do {
    if (btn !== undefined) {
      if (btn.childElementCount === 0 && btn.innerText === "") {
        let j = 0;
        const fieldArray = [];
        while (j < addRules.length) {
          const toAdd = buttons[cycle + addRules[j]];
          if (colAndRowValidate(btn, toAdd)) {
            fieldArray[j] = toAdd;
            toAdd.classList.add("clicked");
            toAdd.disabled = "true";
          }
          j++;
        }
        // Filter fully iterate array from while lop
        const filtered = fieldArray.filter(
          (field) =>
            field.innerText === "" &&
            field.childElementCount !== 1 &&
            field !== undefined
        );
        isEmptyArray.push(...filtered);
        //Remove array elements, which aren't unique
        isEmptyArray = [...new Set(isEmptyArray)];
        if (isEmptyArray.length === 0 || isEmptyArray === undefined) {
          break;
        } else {
          if (buttons.indexOf(isEmptyArray[z]) !== undefined) {
            cycle = buttons.indexOf(isEmptyArray[z]);
          } else {
            break;
          }
          btn = isEmptyArray[z];
        }
      }
      z++;
    } else {
      break;
    }
  } while (true);
}

function colAndRowValidate(minedButton, existingNearestBtn) {
  if (
    existingNearestBtn !== undefined &&
    existingNearestBtn.childElementCount === 0
  ) {
    // Create a closest rows and columns number
    const row = +minedButton.classList[0].slice(1);
    const col = +minedButton.classList[1].slice(1);
    const numbersRulesRow = [row - 1, row, row + 1];
    const numbersRulesCol = [col - 1, col, col + 1];
    return (
      numbersRulesRow.includes(
        Number(existingNearestBtn.classList[0].slice(1))
      ) &&
      numbersRulesCol.includes(Number(existingNearestBtn.classList[1].slice(1)))
    );
  }
}

function generateandomFieldForMines() {
  const randomGenNum = [];
  for (let i = 0; i < ruleBook[choosenLevel].mines; i++) {
    do {
      random = Math.floor(
        Math.random() * ruleBook[choosenLevel].row * ruleBook[choosenLevel].col
      );
    } while (
      buttons[random].classList.contains("clicked") ||
      randomGenNum.includes(random)
    );
    randomGenNum[i] = random;
  }
  return randomGenNum;
}

function isGameOver(btn) {
  let counter = 0;
  if (btn.firstElementChild !== null) {
    if (
      btn.classList.contains("clicked") &&
      btn.firstChild.classList.contains("fa-land-mine-on")
    ) {
      confirm(
        ":( This time you lost. Click on the happy smiley face to start another run!"
      );
      buttons.forEach((minedBtn) => {
        minedBtn.childElementCount ? minedBtn.classList.add("clicked") : "";
      });
      buttons.map((btn) => (btn.disabled = "true"));
      cleaIntervals();
    }
  } else {
    buttons.forEach((button) => {
      button.classList.contains("clicked") || button.childElementCount !== 0
        ? counter++
        : "";
    });
    if (counter === ruleBook[choosenLevel].row * ruleBook[choosenLevel].col) {
      confirm("YOU WIN. Congratulations!");
      cleaIntervals();
    }
  }
}
function restartGame() {
  buttons.forEach((btn) => {
    btn.classList.remove("clicked");
    btn.value = "";
    btn.innerText = "";
    btn.removeAttribute("disabled");
    if (btn.childElementCount > 0) {
      btn.childNodes[0].remove();
    }
  });
  cleaIntervals();
  markedMinesCounter.innerText = `0${ruleBook[choosenLevel].mines}`;
  timeEl.innerText = "000";
  clicked = 0;
}

function cleaIntervals() {
  clearInterval(myTimer);
}

function markedMinesCounterUpdater(markedMinesCounter, add = 0) {
  let marekdMinesText = Number(markedMinesCounter.innerText);
  if (add === 0) {
    if (marekdMinesText < 11) {
      markedMinesCounter.innerText = `00${marekdMinesText - 1}`;
    } else if (marekdMinesText >= 11) {
      markedMinesCounter.innerText = `0${marekdMinesText - 1}`;
    } else {
      markedMinesCounter.innerText = "000";
    }
  } else {
    if (marekdMinesText < 9) {
      markedMinesCounter.innerText = `00${marekdMinesText + 1}`;
    } else if (marekdMinesText >= 9) {
      markedMinesCounter.innerText = `0${marekdMinesText + 1}`;
    } else {
      markedMinesCounter.innerText = "010";
    }
  }
}
