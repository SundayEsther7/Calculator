const display = document.getElementById('display');
let openParenthesis = true; // Flag to track open parenthesis

// Allow only calculator characters
display.addEventListener("input", () => {
  display.value = display.value.replace(/[^0-9+\-*/().%]/g, "");
});


// Button input
function appendNumber(num) {
  display.value += num;
}

//Appends the given operator to the display value.
function appendOperator(op) {
    const current = display.value;

  // Prevent operators as the first character
  if (current === '' && /[+\-*/%]/.test(op)) {
    display.value = 'Invalid input';
    setTimeout(clearDisplay, 1000);
    return;
  }

  // Prevent double or invalid operator sequences
  if (/[+\-*/%]$/.test(current)) {
    display.value = 'Invalid input';
    setTimeout(clearDisplay, 1000);
    return;
  }

  display.value += op;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    display.value = eval(display.value.replace('×', '*').replace('÷', '/'));
  } catch {
    display.value = 'Error';
  }
}

function appendParenthesis() {
  if (openParenthesis) {
    display.value += '(';
  } else {
    display.value += ')';
  }
  openParenthesis = !openParenthesis;
}

// Toggles the sign of the current display value.
function toggleSign() {
  if (display.value.startsWith('-')) {
    display.value = display.value.substring(1);
  } else if (display.value !== '') {
    display.value = '-' + display.value;
  }
}

// Appends the given operator to the display value.
function calculate() {
  try {
    // Handle percentage
    let expression = display.value.replace(/%/g, '/100');
    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}

// Keyboard input
document.addEventListener('keydown', (e) => {
  // Prevent browser default typing
  e.preventDefault();
// Check if the pressed key is a number, operator, or enter
  if (/[0-9.]/.test(e.key)) {
    appendNumber(e.key);
  } 
  // Check if the pressed key is an operator
  else if (/[+\-*/%]/.test(e.key)) {
    appendOperator(e.key);
  } 
  // Check if the pressed key is a function key
  else if (e.key === 'Enter') {
    calculate();
  } 
  // Check if the pressed key is a clear key
  else if (e.key === 'Escape') {
    clearDisplay();
  } 
// Check if the pressed key is a parenthesis
  else if (e.key === '(' || e.key === ')') {
    display.value += e.key;
  }
});
