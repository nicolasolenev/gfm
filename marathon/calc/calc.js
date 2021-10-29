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
      operation = prompt('Введите операцию из списка:\nsum(Сложение)\ndif(Вычетание)\nmulti(Умножение)\ndiv(Деление)\nrem(Взятие остатка от деления)\nexp(Возведение в степень)');
      if (operation === null) return; // Выбрать отмену = закрыть калькулятор
      if (!checkOperation(operation)) { // Проверка на существование операции
        alert('unknown operation');
        continue;
      }
      a = prompt('Введите первое число:')
      if (a === null) return; // Выбрать отмену = закрыть калькулятор
      if (!checkIsRightNumber(a)) { // Проверка на правильность ввода числа
        alert('Error');
        continue;
      }
      b = prompt('Введите второе число:')
      if (b === null) return;
      if (!checkIsRightNumber(b)) { // Проверка на правильность ввода числа
        alert('Error');
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
    case 'sum':
    case 'сложение':
      return getSum(a, b);
    case 'dif':
    case 'вычетание':
      return getDif(a, b);
    case 'multi':
    case 'умножение':
      return getMulti(a, b);
    case 'div':
    case 'деление':
      return getDiv(a, b);
    case 'rem':
    case 'взятие остатка от деления':
      return getRem(a, b);
    case 'exp':
    case 'возведение в степень':
      return getExp(a, b);
  }
}



// Проверки на правильность вводимых данных
function checkOperation(operation) {
  return ['sum', 'dif', 'multi', 'div', 'rem', 'exp', 'сложение', 'вычетание', 'умножение', 'деление', 'взятие остатка от деления', 'возведение в степень'].includes(operation.trim().toLowerCase())
}

function checkIsRightNumber(a) {
  return a !== '' && !isNaN(a);
}



//  Операции
function getSum(a, b) { //   Сложение +
  return a + b
}

function getDif(a, b) { //   Вычитание -
  return a - b
}

function getMulti(a, b) { //   Умножение *
  return a * b
}

function getDiv(a, b) { ///   Деление /
  return a / b
}

function getRem(a, b) { ///   Взятие остатка от деления %
  return a % b
}

function getExp(a, b) { ///   Возведение в степень **
  return a ** b
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