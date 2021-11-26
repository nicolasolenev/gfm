const calc = (operation, a, b) => {
  if (operation === undefined || a === undefined || b === undefined)
    return "Error";

  const operations = {
    "+": () => +a + +b,
    "–": () => a - b,
    "×": () => a * b,
    "÷": () => a / b
  };

  if (!(operation in operations)) return "unknown operation";

  const result = operations[operation]();

  return isFinite(result) ? result : "Error";
};

const buttons = document.body.querySelectorAll(".button_num");
const operations = document.body.querySelectorAll(".button_operation");
const result = document.body.querySelector(".button_result");
const deleteC = document.body.querySelector(".button_delete");
const deleteBakspace = document.body.querySelector(".button_bakspace");
let output = document.body.querySelector(".calculator__output");
let operation;
let a;
let b;

for (let button of buttons) {
  button.onclick = function() {
    output.innerHTML === "0"
      ? (output.innerHTML = button.innerHTML)
      : (output.innerHTML += button.innerHTML);
    if (output.innerHTML.length > 6) {
      output.innerHTML = output.innerHTML.slice(0, 6);
    }
  };
}
for (let oper of operations) {
  oper.onclick = function() {
    operation = oper.innerHTML;
    const calc = (operation, a, b) => {
      if (operation === undefined || a === undefined || b === undefined)
        return "Error";

      const operations = {
        "+": () => +a + +b,
        "–": () => a - b,
        "×": () => a * b,
        "÷": () => a / b
      };

      if (!(operation in operations)) return "unknown operation";

      const result = operations[operation]();

      return isFinite(result) ? result : "Error";
    };

    const buttons = document.body.querySelectorAll(".button_num");
    const operations = document.body.querySelectorAll(".button_operation");
    const result = document.body.querySelector(".button_result");
    const deleteC = document.body.querySelector(".button_delete");
    const deleteBakspace = document.body.querySelector(".button_bakspace");
    let output = document.body.querySelector(".calculator__output");
    let operation;
    let a = null;
    let b = null;
    let checkresult = false;

    for (let button of buttons) {
      button.onclick = function() {
        if (!a) {
          console.log("a: " + a + " b: " + b + " oper: " + operation);
          output.innerHTML === "0"
            ? (output.innerHTML = button.innerHTML)
            : (output.innerHTML += button.innerHTML);
        }
        if (a) {
          if (!b) {
            b = output.innerHTML = button.innerHTML;
            console.log(
              "a: " + a + " b: " + b + " oper: " + operation + checkresult
            );
          } else {
            b = output.innerHTML += button.innerHTML;
            console.log(
              "a: " + a + " b: " + b + " oper: " + operation + checkresult
            );
          }
        }
        // if (output.innerHTML.length > 6) {
        //   output.style.fontSize = '60px';
        //   if (output.innerHTML.length > 9) {
        //     output.innerHTML = output.innerHTML.slice(0, 9);
        //   }
        // } else output.style.fontSize = '96px';
      };
    }
    for (let oper of operations) {
      oper.onclick = function() {
        if (checkresult) b = null;
        checkresult = false;
        if (a && b && operation) {
          console.log("bem");
          output.innerHTML = calc(operation, a, b);
          a = output.innerHTML;
          b = null;
          operation = null;
        }

        operation = oper.innerHTML;
        if (!a) {
          a = output.innerHTML;
        }
        console.log(
          "a: " + a + " b: " + b + " oper: " + operation + checkresult
        );
        // output.innerHTML = null;
        if (a && b && checkresult) {
          output.innerHTML = calc(operation, a, b);
          a = output.innerHTML;
          console.log(
            "a: " + a + " b: " + b + " oper: " + operation + checkresult
          );
          b = null;
        }
      };
    }

    result.onclick = function() {
      if (a && b && operation) {
        output.innerHTML = calc(operation, a, b);
        a = output.innerHTML;
        checkresult = true;
        console.log(
          "a: " + a + " b: " + b + " oper: " + operation + checkresult
        );
      }
      // if (output.innerHTML.length > 6) {
      //   output.style.fontSize = '60px';
      //   if (output.innerHTML.length > 9) {
      //     output.innerHTML = output.innerHTML.slice(0, 9);
      //   }
      // } else output.style.fontSize = '96px';
    };

    deleteC.onclick = function() {
      output.innerHTML = 0;
      a = null;
      b = null;
    };

    deleteBakspace.onclick = function() {
      if (output.innerHTML.length === 1) {
        output.innerHTML = 0;
      } else {
        output.innerHTML = output.innerHTML.slice(
          0,
          output.innerHTML.length - 1
        );
      }
    };
    console.log(operation);
    a = output.innerHTML;
    console.log(a);
    output.innerHTML = null;
  };
}

result.onclick = function() {
  b = output.innerHTML;
  output.innerHTML = calc(operation, a, b);
};

deleteC.onclick = function() {
  output.innerHTML = 0;
};

deleteBakspace.onclick = function() {
  if (output.innerHTML.length === 1) {
    output.innerHTML = 0;
  } else {
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }
};
