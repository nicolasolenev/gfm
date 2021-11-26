function calc(operation, a, b) {
  if (operation === undefined || a === undefined || b === undefined)
    return "Error";

  const operations = {
    '+': () => +a + +b,
    '–': () => a - b,
    '×': () => a * b,
    '÷': () => a / b
  };

  if (!(operation in operations)) return "unknown operation";

  const result = operations[operation]();

  return isFinite(result) ? result : "Error";
}


const buttons = document.body.querySelectorAll('.button_num');
const operations = document.body.querySelectorAll('.button_operation');
const result = document.body.querySelector('.button_result');
const deleteC = document.body.querySelector('.button_delete');
const deleteBakspace = document.body.querySelector('.button_bakspace');
let output = document.body.querySelector('.calculator__output');
let operation;
let a = null;
let b = null;
let checkresult = false;

for (let button of buttons) {
  button.onclick = function () {
    if (!a) {
      output.innerHTML === '0' ? output.innerHTML = button.innerHTML : output.innerHTML += button.innerHTML;
    }
    if (a) {
      if (!b) {
        b = output.innerHTML = button.innerHTML;
      } else {
        b = output.innerHTML += button.innerHTML;
      }
    }
    if (output.innerHTML.length >= 5) {
      output.innerHTML = output.innerHTML.slice(0, 5);
    }
  }
}
for (let oper of operations) {
  oper.onclick = function () {
    if (checkresult) b = null;
    checkresult = false;
    if (a && b && operation) {
      output.innerHTML = calc(operation, a, b);
      a = output.innerHTML;
      b = null;
      operation = null;
    }

    operation = oper.innerHTML;
    if (!a) {
      a = output.innerHTML;
    }
    if (a && b && checkresult) {
      output.innerHTML = calc(operation, a, b);
      a = output.innerHTML;
      b = null;
    }
  }
}

result.onclick = function () {
  if (a && b && operation) {
    output.innerHTML = calc(operation, a, b);
    a = output.innerHTML;
    checkresult = true;
    if (output.innerHTML.length > 5) {
      output.innerHTML = (+output.innerHTML).toExponential(1);
    }
  }
}

deleteC.onclick = function () {
  output.innerHTML = 0;
  a = null;
  b = null;
}

deleteBakspace.onclick = function () {
  if (output.innerHTML.length === 1) {
    output.innerHTML = 0;
  } else {
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }
}