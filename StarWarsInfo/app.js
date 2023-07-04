const url = "https://swapi.dev/api/";
const planetsUrl = url + "planets";
const peopleUrl = url + "people";
const searchingPlanetUrl = planetsUrl + "/?search=";

const container = document.querySelector("article.container");
const mainEl = document.querySelector("main");
const buttons = document.querySelectorAll("button");

let firstElement = 1;
let maxItemOnPage = firstElement + 10;
let aElementCounter = 0;

//Display first data packakage

blurryLoadingScreen();
generatePersonsCard(0, 10);

buttons.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.classList.add("mouse-over");
  });
  btn.addEventListener("mouseout", () => {
    btn.classList.remove("mouse-over");
  });

  btn.addEventListener("click", () => {
    if (btn.id === "prev") {
      firstElement -= 10;
    } else {
      firstElement += 10;
    }

    maxItemOnPage += 10;

    const card = document.querySelectorAll("div");
    card.forEach((div) => div.remove());
    generatePersonsCard(firstElement, maxItemOnPage);
  });
});

// Functions that display the person's cards

function generatePersonsCard() {
  aElementCounter = 0;

  for (let i = 0; i < 10; i++) {
    getPeoples(i)
      .then(getHomeworldForPerson)
      .then(createDomElementForPerson)
      .then(getInfoAboutHomePlanet)
      .catch(displayErrorMsg);
  }
}

function getPeoples(i) {
  return new Promise(function (resolve, rejected) {
    fetch(peopleUrl + `/${firstElement + i}/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          rejected("Get Persons data - Request Rejected ");
        }
      })
      .then((personObject) => resolve(personObject));
  });
}
function getHomeworldForPerson(personObject) {
  return new Promise(function (resolve, rejected) {
    fetch(personObject.homeworld)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          rejected("Get Homeworld data for person - Request Rejected ");
        }
      })
      .then((planets) => {
        resolve([personObject, planets]);
      });
  });
}
function createDomElementForPerson(jsonElement) {
  new Promise(() => {
    const divEl = document.createElement("div");
    divEl.classList.add("person-data");
    const sectionEl = document.createElement("section");
    const h3El = document.createElement("h3");
    h3El.innerText = jsonElement[0].name;
    divEl.appendChild(h3El);

    for (let i = 0; i < 4; i++) {
      const p = document.createElement("p");
      p.innerHTML = generateInformation(i, jsonElement);
      sectionEl.appendChild(p);
    }

    displayButton();
    divEl.appendChild(sectionEl);
    container.appendChild(divEl);
  });
}
function getInfoAboutHomePlanet() {
  const a = document.querySelectorAll("a");
  a[aElementCounter].addEventListener("click", (e) => {
    e.preventDefault();
    getPlanetInformation(e.target)
      .then(createPlanetContent)
      .then(eventListenerForRemovePlanetCard)
      .catch(displayErrorMsg);
  });
  aElementCounter++;
}

function displayErrorMsg(err) {
  console.log(` NO WAY! Error found: " ${err}`);
}

function generateInformation(iteration, jsonElement) {
  switch (iteration) {
    case 0:
      return `Gender: <strong>${jsonElement[0].gender}</strong>`;
    case 1:
      return `Height: <strong>${jsonElement[0].height}[cm]</strong>`;
    case 2:
      return `Weight: <strong>${jsonElement[0].mass}[kg]</strong>`;
    case 3:
      return `Planet: <strong><a href="">${jsonElement[1].name}</a></strong>`;
  }
}

// planetScreen
function getPlanetInformation(a) {
  return new Promise(function (resolve, rejected) {
    fetch(searchingPlanetUrl + `${a.innerText}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          rejected("NOT OK");
        }
      })
      .then((planetData) => resolve(planetData));
  });
}

function createPlanetContent(planetData) {
  planetData = planetData.results[0];
  new Promise((resolve) => {
    const planetInformationCard = document.createElement("article");
    planetInformationCard.classList.add("planet-site");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.style.display = "none"));
    planetInformationCard.innerHTML = `<div class="planet-main-info">
    <div>
      <h1><strong>${planetData.name}</strong></h1>
      <small>Planet Name</small>
    </div>
    <div>
      <h2><strong>${Number(
        planetData.population
      ).toLocaleString()}</strong></h2>
      <small>Population</small>
    </div>
  </div>
  <div class="planet-second-info">
    <h3>Diameter: <strong>${Number(
      planetData.diameter
    ).toLocaleString()}</strong></h3>
  </div>
  <div class="planet-third-info">
    <h4>Climate: <strong>${planetData.climate}</strong></h4>
    <h4>Gravity: <strong>${planetData.gravity}</strong></h4>
    <h4>Terrarian: <strong>${planetData.terrain}</strong></h4>
  </div>
  <button class="close-window-button"><i class="fa-solid fa-xmark" style="color: #1fb28d"></i></button>`;

    mainEl.appendChild(planetInformationCard);
    resolve("DONE");
  });
}

function eventListenerForRemovePlanetCard() {
  const planetInformationCard = document.querySelector("article.planet-site");
  const closeBtn = document.querySelector(".close-window-button");
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayButton();
    planetInformationCard.style.animation = "none";
    planetInformationCard.style.animation = "disapearPlanetSite 2.5s";
    setTimeout(() => planetInformationCard.remove(), 2000);
  });
}

function displayButton() {
  if (firstElement >= 10 && firstElement < 80) {
    buttons.forEach((btn) => (btn.style.display = "flex"));
  } else if (firstElement < 10) {
    buttons[0].style.display = "none";
    buttons[1].style.display = "flex";
  } else {
    buttons[1].style.display = "none";
  }
}

// BLURRY LOADING !!!!
function blurryLoadingScreen() {
  const loadTxt = document.querySelector(".loading-text");
  const bg = document.querySelector("main");

  let load = 0;
  let int = setInterval(blurring, 30);

  function blurring() {
    load++;
    if (load > 99) {
      clearInterval(int);
      loadTxt.remove();
    }
    loadTxt.innerText = `Leaving interstellar space: \n${load}%`;
    loadTxt.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  }

  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
