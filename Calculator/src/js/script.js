const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

const operators = ['+', '-', '*', '/'];

let hasError = false;

function addToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  hasError = false;
}

function deleteLast() {
  if (hasError) {
    clearDisplay();
    return;
  }
  display.value = display.value.slice(0, -1);
}

function calculate() {
  if (display.value !== '' && display.value !== 'Error') {
    try {
      display.value = eval(display.value);
      hasError = false;
    } catch {
      display.value = 'Error';
      hasError = true;
    }
  } else {
    display.value = '';
    hasError = false;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent;
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
  });
});
