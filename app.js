function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operatorSymbol) {
  switch (operatorSymbol) {
    case "+":
      return Math.round(add(num1, num2) * 100) / 100;
    case "-":
      return Math.round(subtract(num1, num2) * 100) / 100;
    case "*":
      return Math.round(multiply(num1, num2) * 100) / 100;
    case "/":
      return num2 == 0 ? "Diee!" : Math.round(divide(num1, num2) * 100) / 100;

    default:
      console.log("Wrong operator!");
      break;
  }
}

function getInput() {
  clearScreen();
  input.forEach((button) => {
    button.addEventListener("click", () => populateDisplay(button));
  });
  handleOperator();
}

function populateDisplay(btn) {
  if (justCalculated) {
    clearScreen();
    justCalculated = false;
  }
  result.textContent += btn.textContent;
}

const input = document.querySelectorAll(".numbers");
const result = document.querySelector("#result");
const operatingButtons = document.querySelectorAll(".operators");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

let numberArr = [];
let index = 1;
let operator;

function clearScreen() {
  result.innerHTML = "";
}

clearBtn.addEventListener("click", () => {
  numberArr = [];
  index = 1;
  operator = undefined;
  justCalculated = false;
  clickCount = 0;
  clearScreen();
  console.log(
    `Cleared Everything: \n${numberArr}\n${index}\n${operator}\n${clickCount}`
  );
});

equalsBtn.addEventListener("click", () => {
  console.log(numberArr);
  if (numberArr[1] === undefined) {
    numberArr[1] = Number(result.textContent);
  }
  result.textContent = operate(numberArr[0], numberArr[1], operator);
  if (result.textContent != "Diee!") {
    numberArr = [Number(result.textContent)];
  }
  justCalculated = true;
  numberArr = [];
  index = 1;
  operator = undefined;
  justCalculated = true;
  clickCount = 0;
});

let clickCount = 0;
let justCalculated = false;

function handleOperator() {
  operatingButtons.forEach((operatingButton) => {
    operatingButton.addEventListener("click", () => {
      if (result.textContent == "") {
        console.log("Nani");
        return 0;
      }
      clickCount += 1;
      operator = operatingButton.textContent;
      if (clickCount < 2) {
        numberArr[index - 1] = Number(result.textContent);
        console.log(numberArr);
        clearScreen();
        index++;
      } else {
        numberArr[index - 1] = Number(result.textContent);
        console.log(`New array after 2nd click: ${numberArr}`);
        result.textContent = operate(numberArr[0], numberArr[1], operator);
        index = 1;
        numberArr[index - 1] = Number(result.textContent);
        index++;
        console.log(`New array after 2nd click: ${numberArr}`);
      }
      justCalculated = true;
    });
  });
}

getInput();
