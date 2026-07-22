const display = document.querySelector('.display');
display.value = '0';
const buttons = document.querySelectorAll('button');

const operators = ['+', '-', '*', '/'];

let hasError = false;
let hasResult = false;

function handleInput(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '⌫') {
    deleteLast();
  } else if (value === '=') {
    calculate();
  } else {
    if (hasError) {
      display.value = value;
      hasError = false;
    } else {
      const lastChar = display.value.slice(-1);
      if (operators.includes(value) && operators.includes(lastChar)) {
        return;
      }
      addToDisplay(value);
    }
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
  if (display.value === '0') {
    display.value = '';
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '0';
  hasError = false;
  hasResult = false;
}

function deleteLast() {
  if (hasError) {
    clearDisplay();
    return;
  }
  display.value = display.value.slice(0, -1);
  if (display.value === '') {
    display.value = '0';
  }
  hasResult = false;
}

function calculate() {
  if (display.value !== '' && display.value !== 'Error') {
    try {
      display.value = eval(display.value);
      hasError = false;
      hasResult = true;
    } catch {
      display.value = 'Error';
      hasError = true;
    }
  } else {
    display.value = '0';
    hasError = false;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent;
    handleInput(value);
  });
});
