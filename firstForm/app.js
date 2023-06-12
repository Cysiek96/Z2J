const inputs = {
  name: document.getElementById("name"),
  surname: document.getElementById("surname"),
  gender1: document.querySelector(".man"),
  gender2: document.querySelector(".woman"),
  login: document.querySelector("#login"),
  pass: document.querySelector("#password"),
  birthDate: document.getElementById("birthDate"),
};

const btn = document.querySelector("button");
const form = document.querySelector("form");
let validation;

btn.addEventListener("click", (e) => {
  validation = 0;
  e.preventDefault();
  for (let lp in inputs) {
    // Gender Validation start
    if (lp === "gender1" || lp === "gender2") {
      let parent = inputs[lp].parentNode.parentNode;
      if (
        inputs["gender1"].checked === false &&
        inputs["gender2"].checked === false
      ) {
        if (parent.nextElementSibling.nodeName !== "P") {
          parent.insertAdjacentHTML(
            "afterend",
            "<p>To pole nie może być puste</p>"
          );
        }
      } else if (parent.nextElementSibling.nodeName === "P") {
        parent.nextElementSibling.remove();
      }
      // End of gender validation
    } else {
      checkForNextSiebling(inputs[lp]);
    }
  }
  if (document.querySelectorAll("p").length === 0) {
    confirm(
      `You created a user: ${inputs["name"].value} ${
        inputs.surname.value
      }, Born: ${inputs.birthDate.value}, Gender: ${
        inputs.gender1.checked ? "M" : "W"
      }, with login: ${inputs.login.value}`
    );
  }
});

function checkForNextSiebling(childNode) {
  const current = childNode.parentNode.nextElementSibling;
  if (current.nodeName !== "P" && childNode.value === "") {
    childNode.parentNode.insertAdjacentHTML(
      "afterend",
      "<p>To pole nie może być puste</p>"
    );
  } else if (current.nodeName === "P" && childNode.value !== "") {
    current.remove();
  }
}
