const calc = (operation, a, b) => {
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
};

const buttons = document.body.querySelectorAll('.button_num');
const operations = document.body.querySelectorAll('.button_operation');
const result = document.body.querySelector('.button_result');
const deleteC = document.body.querySelector('.button_delete');
const deleteBakspace = document.body.querySelector('.button_bakspace');
let output = document.body.querySelector('.calculator__output');
let operation;
let a;
let b;

for (let button of buttons) {
  button.onclick = function () {
    output.innerHTML === '0' ? output.innerHTML = button.innerHTML : output.innerHTML += button.innerHTML;
    if (output.innerHTML.length > 6) {
      output.innerHTML = output.innerHTML.slice(0, 6);
    }
  }
}
for (let oper of operations) {
  oper.onclick = function () {
    operation = oper.innerHTML;
    console.log(operation);
    a = output.innerHTML;
    console.log(a);
    output.innerHTML = null;
  }
}

result.onclick = function () {
  b = output.innerHTML;
  output.innerHTML = calc(operation, a, b);
}

deleteC.onclick = function () {
  output.innerHTML = 0;
}

deleteBakspace.onclick = function () {
  if (output.innerHTML.length === 1) {
    output.innerHTML = 0;
  } else {
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }
}