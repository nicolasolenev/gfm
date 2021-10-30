//  Условие

// Создайте простой калькулятор Calc, который будет принимать значение a и значение b, а так же идентификатор нужного действия.
// Ваш калькулятор должен возвращать сообщение“ Error” в том случае если вы не указали все 3 параметра или если вычисляемые значения оказались не числами.
// В случае с неверным“ идентификатором нужного действия” возвращайте“ unknown operation”

// Решение

// createCalc(); // Запуск скрипта (калькулятора)

// Функция для вызова калькулятора, ввода данных, вывода ответа
function createCalc() {
  while (true) {
    let a;
    let b;
    let operation;

    while (true) {
      operation = prompt(
        "Введите операцию из списка:\nsum(Сложение)\ndif(Вычитание)\nmulti(Умножение)\ndiv(Деление)\nrem(Взятие остатка от деления)\nexp(Возведение в степень)"
      );
      if (operation === null) return; // Выбрать отмену = закрыть калькулятор
      if (!checkOperation(operation)) {
        // Проверка на существование операции
        alert("unknown operation");
        continue;
      }
      a = prompt("Введите первое число:");
      if (a === null) return; // Выбрать отмену = закрыть калькулятор
      if (!checkIsRightNumber(a)) {
        // Проверка на правильность ввода числа
        alert("Error");
        continue;
      }
      b = prompt("Введите второе число:");
      if (b === null) return;
      if (!checkIsRightNumber(b)) {
        // Проверка на правильность ввода числа
        alert("Error");
        continue;
      }
      break;
    }

    alert(calc(operation, a, b)); // Вывод ответа
  }
}

//  Калькулятор
function calc(operation, a, b) {
  operation = operation.trim().toLowerCase();
  a = +a; // Явное преобразование типа в Number
  b = +b;
  switch (operation) {
    case "sum":
    case "сложение":
      return a + b;
    case "dif":
    case "вычитание":
      return a - b;
    case "multi":
    case "умножение":
      return a * b;
    case "div":
    case "деление":
      return a / b;
    case "rem":
    case "взятие остатка от деления":
      return a % b;
    case "exp":
    case "возведение в степень":
      return a ** b;
  }
}

// Проверки на правильность вводимых данных
function checkOperation(operation) {
  return [
    "sum",
    "dif",
    "multi",
    "div",
    "rem",
    "exp",
    "сложение",
    "вычитание",
    "умножение",
    "деление",
    "взятие остатка от деления",
    "возведение в степень"
  ].includes(operation.trim().toLowerCase());
}

function checkIsRightNumber(a) {
  return a !== "" && !isNaN(a);
}

//  Тест вызовов калькулятора
// console.log(`Сложение 40 и 2: ${calc('sum', 40, 2)}`)
// console.log(`Разность 40 и 2: ${calc('dif', 40, 2)}`)
// console.log(`Умножение 40 и 2: ${calc('multi', 40, 2)}`)
// console.log(`Деление 40 и 2: ${calc('div', 40, 2)}`)
// console.log(`Остаток от деления 146 на 7: ${calc('rem', 146, 7)}`)
// console.log(`Возведение 2 в степень 8: ${calc('exp', 2, 8)}`)

// Тест проверки на правильность вводимых данных
// console.log(`Ввод числа: ${checkIsRightNumber(1)}`)
// console.log(`Ввод строки с числом: ${checkIsRightNumber('1')}`)
// console.log(`Ввод строки: ${checkIsRightNumber('some string')}`)
// console.log(`Ввод пустой строки: ${checkIsRightNumber('')}`)
// console.log(`Вызов без параметра: ${checkIsRightNumber()}`)
