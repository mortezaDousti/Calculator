const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let hasError = false;
const operators = ['+', '-', '*', '/'];

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent;
    if (value === 'C') {
      display.value = '';
    } else if (value === '⌫') {
      display.value = display.value.slice(0, -1);
    } else if (value === '=') {
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
    } else {
      if (hasError) {
        display.value = value;
        hasError = false;
      } else {
        const lastchar = display.value.slice(-1);
        if (operators.includes(value) && operators.includes(lastchar)) {
          return;
        }
        display.value += value;
      }
    }
  });
});
