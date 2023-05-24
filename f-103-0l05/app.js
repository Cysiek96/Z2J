const warningBtn = document.querySelector("button");
const alerts = document.querySelectorAll("p");
let click = 0;

console.log(alerts);
warningBtn.addEventListener("click", (e) => {
  if (click < 1) {
    alerts[click].classList.add("show");
    click++;
  } else {
    alerts[0].classList.remove("show");
    warningBtn.style.display = "none";
    alerts[1].classList.add("show");
    document.body.classList.toggle("nukeSended");
  }
});
