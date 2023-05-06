const firstNum = +prompt("Podaj pierwszą liczbę");
const operand = prompt("Podaj operator matematyczny (+, -, *, /, lub %)");
const secondNum = +prompt("Podaj drugą liczbę");
const precision = 100000; // obsługa 0.1+0.2
let result = 0;
//sprawdzenie czy oba elementy są liczbami
if (!(String(firstNum) === "NaN" || String(secondNum) === "NaN")) {
  if (secondNum === 0) {
    alert("Hej, nie dzielimy przez 0!!!");
  } else {
    switch (true) {
      case operand === "+":
        result = (firstNum * precision + secondNum * precision) / precision;
        break;
      case operand === "-":
        result = (firstNum * precision - secondNum * precision) / precision;
        break;
      case operand === "*":
        result =
          (firstNum * precision * (secondNum * precision)) /
          (precision * precision);
        break;
      case operand === "/":
        result = (firstNum * precision) / (secondNum * precision);
        break;
      case operand === "%":
        result = ((firstNum * precision) % (secondNum * precision)) / precision;
        break;
      default:
        result = alert(
          "Przykro mi, ale ten kalkulator nie wspiera podanego działania."
        );
    }
    alert(`Twój wynik to : ${result}`);
  }
} else {
  alert("Haloo proszę podać wartość liczbową!");
}
