const display = document.querySelector('.display');
display.value = '0';
const buttons = document.querySelectorAll('button');

const operators = ['+', '-', '*', '/'];

let hasError = false;
let hasResult = false;
let isInitialZero = true;

function handleInput(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '⌫') {
    deleteLast();
  } else if (value === '=') {
    handleEqual();
  } else {
    if (hasError) {
      display.value = value;
      hasError = false;
      return;
    } else {
      const lastChar = display.value.slice(-1);
      if (operators.includes(value) && operators.includes(lastChar)) {
        return;
      }
      if (value === '.' && !canAddDot()) {
        return;
      }
      addToDisplay(value);
    }
  }
}

function clearDisplay() {
  display.value = '0';
  hasError = false;
  hasResult = false;
  isInitialZero = true;
}

function deleteLast() {
  if (hasError) {
    clearDisplay();
    return;
  }
  display.value = display.value.slice(0, -1);
  if (display.value === '') {
    display.value = '0';
    isInitialZero = true;
  }
  hasResult = false;
}

function canAddDot() {
  const lastNumber = display.value.split(/[+\-*/]/).pop();
  return !lastNumber.includes('.');
}

function handleEqual() {
  if (hasError) {
    clearDisplay();
    return;
  }
  calculate();
}

function calculate() {
  if (display.value !== '0' && display.value !== 'Error') {
    try {
      const result = eval(display.value);
      if (!Number.isFinite(result)) {
        throw new Error();
      }
      display.value = result;
      hasError = false;
      hasResult = true;
      isInitialZero = false;
    } catch {
      display.value = 'Error';
      hasError = true;
      hasResult = false;
    }
  } else {
    display.value = '0';
    hasError = false;
  }
}

function addToDisplay(value) {
  if (hasResult && operators.includes(value)) {
    hasResult = false;
  }

  if (hasResult && !operators.includes(value)) {
    display.value = '';
    hasResult = false;
  }

  if (isInitialZero) {
    if (value === '.') {
      display.value = '0';
    } else {
      display.value = '';
    }

    isInitialZero = false;
  }

  display.value += value;
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent;
    handleInput(value);
  });
});
