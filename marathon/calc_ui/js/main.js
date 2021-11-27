document.addEventListener("DOMContentLoaded", function () {

  function calc(operation, a, b) {
    if (operation === undefined || a === undefined || b === undefined)
      return "Error";

    const operations = {
      '+': () => +a + +b,
      '–': () => a - b,
      '×': () => a * b,
      '÷': () => a / b
    }

    if (!(operation in operations)) return "unknown operation";
    const result = operations[operation]();
    return isFinite(result) ? result : "Error";
  }


  const buttons = document.body.querySelectorAll('.button_num');
  const operations = document.body.querySelectorAll('.button_operation');
  const equalSign = document.body.querySelector('.button_result');
  const deleteSign = document.body.querySelector('.button_delete');
  const backspace = document.body.querySelector('.button_backspace');
  const output = document.body.querySelector('.calculator__output');
  let operation = null;
  let a = null;
  let b = null;
  let result = null;


  for (let button of buttons) {
    button.onclick = function () {
      if (result !== null) {
        result = null;
        a = null;
        b = null;
        output.innerHTML = null;
      }
      if (a === null) {
        output.innerHTML === '0' ? output.innerHTML = button.innerHTML : output.innerHTML += button.innerHTML;
      } else if (b === null) {
        b = output.innerHTML = button.innerHTML;
      } else {
        output.innerHTML === '0' ? output.innerHTML = button.innerHTML : output.innerHTML += button.innerHTML;
        b = output.innerHTML;
      }
      if (output.innerHTML.length >= 5) {
        output.innerHTML = output.innerHTML.slice(0, 5);
      }
    }
  }


  for (let oper of operations) {
    oper.onclick = function () {
      if (result !== null) {
        b = null;
        result = null;
      } else if (a !== null && b !== null && operation !== null) {
        output.innerHTML = calc(operation, a, b);
        a = output.innerHTML;
        b = null;
      }

      operation = oper.innerHTML;

      if (a === null) {
        a = output.innerHTML;
      }
    }
  }


  equalSign.onclick = function () {
    if (a !== null && b !== null && operation !== null) {
      result = output.innerHTML = calc(operation, a, b);
      if (!Number.isInteger(result) && typeof result !== 'string') {
        output.innerHTML = result.toFixed(2);
      }

      a = result;

      if (output.innerHTML.length > 5) {
        output.innerHTML = (+output.innerHTML).toExponential(1);
      }
    }
  }


  deleteSign.onclick = function () {
    output.innerHTML = 0;
    a = null;
    b = null;
    operation = null;
    result = null;
  }


  backspace.onclick = function () {
    if (output.innerHTML.length === 1) {
      output.innerHTML = 0;
    } else output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);

    if (a !== null) {
      b = output.innerHTML;
    }

    if (result !== null) {
      result = null;
      a = null;
      b = null;
      operation = null;
    }
  }

});