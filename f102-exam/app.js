const multiply = 1000;
const operationAvailabe = ["+", "-", "*", "/", "%"];
let result;
let isValid = true;
confirm(
  "Hey, thanks for use my prompt calculator.\nWhen You will done your calculation just leave one value empty.  "
);

while (isValid === true) {
  values = getValues(result);
  isValid = validateValues(values[0], values[1], values[2]);
  if (isValid === true) {
    result = calcValues(values);
    alert(`Your result is: ${result}`);
  } else {
    alert(isValid);
  }
}

function getValues(firstNum = undefined) {
  let firstValue;
  if (firstNum !== undefined && !isNaN(+firstNum)) {
    firstValue = firstNum;
  } else {
    firstValue = prompt("Type first number");
  }
  const operation = prompt(
    "Type operation which  You want to do (+, -, *, /, %)."
  );
  const secondValue = prompt("Type second number:");
  return [firstValue, secondValue, operation];
}

function validateValues(firstNum, secondNum, operand) {
  let validation = "";
  if (operand !== null) {
    if (String(+firstNum) === "NaN") {
      validation += "First number isn't a number ";
    }
    if (String(+secondNum) === "NaN") {
      validation += "Second number isn't a number ";
    }
    if (!operationAvailabe.includes(operand)) {
      validation += "Operation isn't include in this verison of caluclator";
    }
  } else {
    validation += "Thanks for using my calcualtor";
  }
  return validation || true;
}

function calcValues(arrayOfValues) {
  const first = arrayOfValues[0];
  const second = arrayOfValues[1];
  const operand = arrayOfValues[2];

  switch (operand) {
    case "+":
      return (result = add(first, second));
    case "-":
      return (result = substract(first, second));
    case "*":
      return (result = multiplyCalc(first, second));
    case "/":
      return (result = divide(first, second));
    case "%":
      return (result = modulo(first, second));
  }
}

function add(firstNum, secondNum) {
  return (firstNum * multiply + secondNum * multiply) / multiply;
}
function substract(firstNum, secondNum) {
  return (firstNum * multiply - secondNum * multiply) / multiply;
}
function multiplyCalc(firstNum, secondNum) {
  return (firstNum * multiply * secondNum * multiply) / multiply ** 2;
}
function divide(firstNum, secondNum) {
  if (+secondNum !== 0) {
    return (firstNum * multiply) / (secondNum * multiply);
  } else {
    return "Why are You trying to divide by 0??";
  }
}
function modulo(firstNum, secondNum) {
  return ((firstNum * multiply) % (secondNum * multiply)) / multiply;
}
