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
  const firstValue = firstNum || prompt("Type first number");
  const operation = prompt(
    "Type operation which  You want to do (+, -, *, /, %)."
  );
  const secondValue = prompt("Type second number:");
  return [firstValue, secondValue, operation];
}

function validateValues(firstNum, secondNum, operand) {
  let validation = "";
  if (firstNum && secondNum && operand !== null) {
    if (String(+firstNum) === "NaN") {
      validation += "First number isn't a number ";
    }
    if (String(+secondNum) === "NaN") {
      validation += "Second number isn't a number ";
    }
    if (!operationAvailabe.includes(operand)) {
      validation += "Operation isn't include in this verison of caluclator";
    } else {
      if (operand === "/") {
        +secondNum !== 0
          ? validation
          : (validation += "Why are You trying to divide by 0?");
      }
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
  console.log(first, second, operand);
  let result;
  switch (true) {
    case operand === "+":
      result = (first * multiply + second * multiply) / multiply;
      break;
    case operand === "-":
      result = (first * multiply - second * multiply) / multiply;
      break;
    case operand === "*":
      result = (first * multiply * second * multiply) / multiply ** 2;
      break;
    case operand === "/":
      result = (first * multiply) / (second * multiply);
      break;
    case operand === "%":
      result = ((first * multiply) % (second * multiply)) / multiply;
      break;
  }
  return result;
}
