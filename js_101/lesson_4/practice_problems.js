function xor(val1, val2) {
  return (val1 && !val2) || (!val1 && val2);
}

console.log(xor(5, 0));
console.log(xor(false, true));
console.log(xor(1, 1));
console.log(xor(true, true));

// question 2
function oddities(array) {
  let newArray = [];

  for (let i = 1; i < array.length; i+= 2) {
    newArray.push(array[i]);
  }
  return newArray;
}

console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
console.log(oddities(["abc", "def"])); // logs ['abc']
console.log(oddities([123])); // logs [123]
console.log(oddities([])); // logs []

//q3
const DIGITS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
};
function stringTonumber(result) {
  let arrayOfDigits = result.split('').map(char => DIGITS[char]);
  let value = 0;
  arrayOfDigits.forEach(digit => (value = (10 * value) + digit));
  return value;
}
function stringToSignednumber(result) {
  switch (result[0]) {
    case "-":
      return -stringTonumber(result.slice(1, result.length));
    case "+":
      return stringTonumber(result.slice(1, result.length));
    default:
      return stringTonumber(result);
  }
}
let num = '12345';

//convert a non-negative int to a result
function numberToString(number) {
  let stringNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = '';

  do {
    let remainder = number % 10;
    number = Math.floor(number / 10);
    result = stringNumbers[remainder] + result;
  } while (number > 0);
  return result;
}
console.log(numberToString(0));

function signedNumberToString(number) {
  switch (Math.sign(number)) {
    case 1:
      return `+${numberToString(number)}`;
    case -1:
      number = Math.abs(number);
      return `-${numberToString(number)}`;
    default:
      return numberToString(number);
  }
}
console.log(signedNumberToString(4321));
console.log(signedNumberToString(-123));
console.log(signedNumberToString(0));