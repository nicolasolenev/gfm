const calc = (operation, a, b) => {
  if (operation === undefined || a === undefined || b === undefined)
    return "Error";

  const operations = {
    sum: () => +a + +b,
    sub: () => a - b,
    mult: () => a * b,
    div: () => a / b
  };

  if (!(operation in operations)) return "unknown operation";

  const result = operations[operation]();

  return isFinite(result) ? result : "Error";
};

// const callFunc = calc("sum", 3, 39);
// console.log(callFunc);