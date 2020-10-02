function calculator(value) {
  if (typeof value !== 'string') {
    return 'Не строка';
  }
  let signs = value.match(/[+*/]|-(?!\d)|\((?!-\d+\))|(?<!\(-\d+)\)|(?<!\()-/g);
  let numbers = value.match(/\d+|(?<=\()\-?\d+(?=\))/g);
  let character = value.match(/[^0-9\+\-\*\/|(|)]/g);
  if (signs === null || numbers === null || numbers.length > 5 || character !== null) {
    return 'Введенно не выражение';
  }
  for (i = signs.indexOf('(') + 1; signs.indexOf('(') !== -1 && signs.indexOf(')') !== -1; i++) {
    if (signs[i] !== ')' && signs[i] === '*' || signs[i] === '/') {
      let newNumber = calculateNumbers(numbers[i - 1], numbers[i], signs[i]);
      if (newNumber === 'Деление на 0') {
        return 'Деление на 0';
      }
      signs.splice(i, 1);
      numbers[i - 1] = newNumber;
      numbers.splice(i, 1);
      i--;
    }
    if (signs[i] !== ')' && (signs[i + 1] !== '*' && signs[i + 1] !== '/') && (signs[i - 1] !== '*' && signs[i - 1] !== '/')) {
      if (signs[i] === '+' || signs[i] === '-') {
        let newNumber = calculateNumbers(numbers[i - 1], numbers[i], signs[i]);
        if (newNumber == 'Деление на 0') {
          return 'Деление на 0';
        }
        signs.splice(i, 1);
        numbers[i - 1] = newNumber;
        numbers.splice(i, 1);
        i--;
      }
    }
    if (signs[i] === ')' && signs[i - 1] === '(') {
      signs.splice(i, 1);
      signs.splice(i - 1, 1);
    }
  }
  for (i = 0; signs.indexOf('*') !== -1 || signs.indexOf('/') !== -1; i++) {
    if (signs[i] == '*' || signs[i] == '/') {
      let newNumber = calculateNumbers(numbers[i], numbers[i + 1], signs[i]);
      if (newNumber == 'Деление на 0') {
        return 'Деление на 0';
      }
      signs.splice(i, 1);
      numbers[i] = newNumber;
      numbers.splice(i + 1, 1);
      i--;
    }
  }
  for (i = 0; signs.indexOf('+') !== -1 || signs.indexOf('-') !== -1;) {
    let newNumber = calculateNumbers(numbers[i], numbers[i + 1], signs[i]);
    signs.splice(i, 1);
    numbers[i] = newNumber;
    numbers.splice(i + 1, 1);
  }
  return isNaN(numbers[0]) ? 'Введено что-то не то' : numbers[0];
}

function calculateNumbers(number1, number2, action) {
  switch (action) {
    case '+':
    return +number1 + +number2;
    case '-':
    return +number1 - +number2;
    case '*':
    return +number1 * +number2;
    case '/':
    if (number2 !== '0') {
      return +number1 / +number2;
    } else {
      return 'Деление на 0';
    }
  }
}
console.log(calculator('2*2'));
console.log(calculator('2-2'));
console.log(calculator('2/2'));
console.log(calculator('2+2'));
console.log(calculator('2/0'));
console.log(calculator('2+(2-2*2)'));
console.log(calculator('2+(2-2*2*2)'));