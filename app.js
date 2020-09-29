function calculator(value){
  if(typeof value !== "string"){
    return "Не строка";
  }
  let signs = value.match(/\+|\-(?!\d)|\*|\//g);
  let numbers = value.match(/\d+|(\-?\d+)/g);
  let character = value.match(/[^0-9\+\-\*\/|(|)]/g);
  if(signs == null || numbers == null || numbers.length > 5 || character != null){
    return "Введенно не выражение";
  }
  for(i = 0; signs.indexOf("*") != -1 || signs.indexOf("/") != -1; i++){
    if(signs[i] == "*" || signs[i] == "/"){
      let newNumber = countingNumbers(numbers[i],numbers[i+1],signs[i]);
      if(newNumber == "Деление на 0"){
        return "Деление на 0";
      }
      signs.splice(i,1);
      numbers[i] = newNumber;
      numbers.splice(i+1,1);
      i--;
    }
  }
  for(i = 0; signs.indexOf("+") != -1 || signs.indexOf("-") != -1;){
      let newNumber = countingNumbers(numbers[i],numbers[i+1],signs[i]);
      signs.splice(i,1);
      numbers[i] = newNumber;
      numbers.splice(i+1,1);
      console.log(signs);
      console.log(numbers);
  }
  return numbers[0];
}
function countingNumbers(number1, number2, action) {
  switch (action) {
    case "+":
    return Number(number1) + Number(number2);
    case "-":
    return Number(number1) - Number(number2);
    case "*":
    return Number(number1) * Number(number2);
    case "/":
    if (number2 !== "0") {
      return Number(number1) / Number(number2);
    } else {
      return "Деление на 0";
    }
  }
}

console.log(calculator("123+213+3+(-1)"));