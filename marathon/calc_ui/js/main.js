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
const deleteBackspace = document.body.querySelector('.button_backspace');
let output = document.body.querySelector('.calculator__output');
let operation;
let a = null;
let b = null;
let res = null;
let checkresult = false;



for (let button of buttons) {
  button.onclick = function () {
    if (res) {
      res = null;
      a = null;
      output.innerHTML = null;
    }
    if (!a) {
      console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
      output.innerHTML === '0' ? output.innerHTML = button.innerHTML : output.innerHTML += button.innerHTML;
    }
    if (a) {
      if (!b) {
        b = output.innerHTML = button.innerHTML;
        console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
      } else {
        b = output.innerHTML += button.innerHTML;
        console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
      }
    }
    if (output.innerHTML.length >= 5) {
      output.innerHTML = output.innerHTML.slice(0, 5);
    }
    // if (output.innerHTML.length > 6) {
    //   output.style.fontSize = '60px';
    //   if (output.innerHTML.length > 9) {
    //     output.innerHTML = output.innerHTML.slice(0, 9);
    //   }
    // } else output.style.fontSize = '96px';
  }
}


for (let oper of operations) {
  oper.onclick = function () {
    res = null;
    if (checkresult) b = null;
    checkresult = false;
    if (a && b && operation) {
      console.log('bem');
      output.innerHTML = calc(operation, a, b);
      a = output.innerHTML;
      b = null;
      operation = null;
    }

    operation = oper.innerHTML;
    if (!a) {
      a = output.innerHTML;
    }
    console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
    // output.innerHTML = null;
    if (a && b && checkresult) {
      output.innerHTML = calc(operation, a, b);
      a = output.innerHTML;
      console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
      b = null;
    }
  }
}



result.onclick = function () {
  if (a && b && operation) {
    res = output.innerHTML = calc(operation, a, b);
    a = res;
    checkresult = true;
    console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
    if (output.innerHTML.length > 5) {
      output.innerHTML = (+output.innerHTML).toExponential(1);
    }
  }
  // if (output.innerHTML.length > 6) {
  //   output.style.fontSize = '60px';
  //   if (output.innerHTML.length > 9) {
  //     output.innerHTML = output.innerHTML.slice(0, 9);
  //   }
  // } else output.style.fontSize = '96px';
}



deleteC.onclick = function () {
  output.innerHTML = 0;
  a = null;
  b = null;
  res = null;
  operation = null;
  console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
}



deleteBackspace.onclick = function () {
  if (output.innerHTML.length === 1) {
    output.innerHTML = 0;
  } else {
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }

  if (res) {
    output.innerHTML = 0;
    res = null;
    a = null;
    b = null;
  }

  if (a) {
    b = output.innerHTML;
  }
  console.log('a: ' + a + ' b: ' + b + ' oper: ' + operation + ' check: ' + checkresult + ' res: ' + res);
}