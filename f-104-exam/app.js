const main = document.querySelector("main");
const navigationDiv = document.querySelector("div.navigation");
const directory = "./img/";
const imgSrc = [
  "CleanShotCleanShot_2023-02-09_at_19.59.15",
  "CleanShot_2023-02-09_at_20.02.24",
  "CleanShot_2023-02-09_at_20.02.10",
  "CleanShot_2023-02-09_at_20.01.54",
  "CleanShot_2023-02-09_at_20.01.35",
  "CleanShot_2023-02-09_at_20.01.21",
  "CleanShot_2023-02-09_at_20.01.06",
  "CleanShot_2023-02-09_at_20.00.51",
  "CleanShot_2023-02-09_at_20.00.33",
  "CleanShot_2023-02-09_at_20.00.07",
  "CleanShot_2023-02-09_at_19.59.15",
];

for (let i = imgSrc.length - 1; i > 0; i--) {
  const img = document.createElement("img");

  img.src = String(`${directory}${imgSrc[i]}.png`);
  const aImg = img.cloneNode(true);
  img.id = `${i}`;
  main.appendChild(img);
  const a = document.createElement("a");
  a.href = `#${i}`;
  a.appendChild(aImg);
  navigationDiv.appendChild(a);
}
