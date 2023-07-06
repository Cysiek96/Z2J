const url = "https://swapi.dev/api/";
const planetsUrl = url + "planets";
const peopleUrl = url + "people";
const searchingPlanetUrl = planetsUrl + "/?search=";

const container = document.querySelector("article.container");
const mainEl = document.querySelector("main");
const buttons = document.querySelectorAll("article.container button");
const planetWindowBtn = document.querySelector("button.close-window-button");
const planetSite = document.querySelector("article.planet-site");

let firstElement = 1;
let maxItemOnPage = firstElement + 10;
let aElementCounter = 0;

//Display first data packakage

blurryLoadingScreen();
generatePersonsCard(0, 10);

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "prev") {
      firstElement -= 10;
    } else {
      firstElement += 10;
    }
    maxItemOnPage += 10;
    const card = document.querySelectorAll("article.container div.person-data");
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
        personObject.planetName = planets.name;
        resolve(personObject);
      });
  });
}
function createDomElementForPerson(jsonElement) {
  return new Promise((resolve) => {
    const divEl = document.createElement("div");
    divEl.classList.add("person-data");
    const sectionEl = document.createElement("section");
    const h3El = document.createElement("h3");
    h3El.innerText = jsonElement.name;
    divEl.appendChild(h3El);

    for (let i = 0; i < 4; i++) {
      const p = document.createElement("p");
      p.innerHTML = generateInformation(i, jsonElement);
      sectionEl.appendChild(p);
    }

    displayButton();
    divEl.appendChild(sectionEl);
    container.appendChild(divEl);
    resolve("Done");
  });
}
function getInfoAboutHomePlanet() {
  const a = document.querySelectorAll("a");
  a[aElementCounter].addEventListener("click", (e) => {
    e.preventDefault();
  });
  a[aElementCounter].addEventListener("dblclick", (e) => {
    e.preventDefault();
    planetSite.style.animation = "none";
    planetSite.style.display = "grid";
    planetSite.style.animation = "appear 2s";
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
      return `Gender: <strong>${jsonElement.gender}</strong>`;
    case 1:
      return `Height: <strong>${jsonElement.height}[cm]</strong>`;
    case 2:
      return `Weight: <strong>${jsonElement.mass}[kg]</strong>`;
    case 3:
      return `Planet: <strong><a href="">${jsonElement.planetName}</a></strong>`;
  }
}

// planetScreen
function getPlanetInformation(a) {
  console.log(a);
  console.log(a.innerText);
  return new Promise(function (resolve, rejected) {
    console.log(searchingPlanetUrl + `${a.innerText}`);
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
    buttons.forEach((btn) => (btn.style.display = "none"));
    planetWindowBtn.style.display = "inline-block";
    const htmlElementsToFill = [
      document.querySelector("strong.planetName"),
      document.querySelector("strong.population"),
      document.querySelector("strong.diameter"),
      document.querySelector("strong.climate"),
      document.querySelector("strong.gravity"),
      document.querySelector("strong.terrain"),
    ];

    console.log(htmlElementsToFill);
    const { name, population, diameter, climate, gravity, terrain } =
      planetData;
    const fillData = [
      name,
      Number(population).toLocaleString(),
      Number(diameter).toLocaleString(),
      climate[0].toUpperCase() + climate.slice(1),
      gravity[0].toUpperCase() + gravity.slice(1),
      terrain[0].toUpperCase() + terrain.slice(1),
    ];
    htmlElementsToFill.forEach((element, i) => {
      element.innerText = fillData[i];
    });
    resolve("DONE");
  });
}

function eventListenerForRemovePlanetCard() {
  planetWindowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayButton();
    planetSite.style.animation = "none";
    planetSite.style.animation = "disapearPlanetSite 2.5s";
    setTimeout(() => {
      planetWindowBtn.style.display = "none";
      planetSite.style.display = "none";
    }, 2000);
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
