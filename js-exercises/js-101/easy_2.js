// Welcome Stranger

// input: array(2+ elements) and object (title, occupation)

// take name from array, title & occ from object.
// log greeting message.

function greetings(array, object) {
  console.log(`Hello, ${array.join(' ')}! Nice to have a ${object.title} ${object.occupation} around.`);
}

greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" });


// Greeting a user

// ask for users name
// if ends w/ exclamation point, return message in caps.

function sayHello() {
  const readline = require('readline-sync');

  let name = readline.question('What is your name?\n');
  let message;

  if (name[name.length - 1] === '!') {
    name = name.slice(0, -1).toUpperCase();
    message = `HELLO ${name}! WHY ARE WE YELLING?`;
  } else {
    message = `Hello ${name}`;
  }

  console.log(message);
}

// sayHello();


// Multiplying 2 Numbers

// input: 2 numbers
// return: product

function multiply(num1, num2) {
  return num1 * num2;
}

console.log(multiply(3, 5));


// Squaring an Argument
// use prev function to get square

function square(number) {
  return multiply(number, number);
}

console.log(square(5));


// Arithmetic Integer
// prompt for 2 pos ints
// print the results of add, sub, prod, quot, remain, power.

function doSomeMath() {
  const readline = require('readline-sync');

  let num1 = parseInt(readline.question(`Enter your first number`), 10);
  let num2 = parseInt(readline.question(`Enter your second number`), 10);

  console.log(`${num1} + ${num2} = ${num1 + num2}`);
  console.log(`${num1} - ${num2} = ${num1 - num2}`);
  console.log(`${num1} * ${num2} = ${num1 * num2}`);
  console.log(`${num1} / ${num2} = ${Math.round(num1 / num2)}`);
  console.log(`${num1} % ${num2} = ${num1 % num2}`);
  console.log(`${num1} ** ${num2} = ${Math.pow(num1, num2)}`);
}

// doSomeMath();


// The end is Near But Not Here
// input: sequence of non-blank chars
// output: return second to last word

// convert string to array. 
// find second to last element
// return that.

function penultimate(string) {
  return string.split(' ').filter((_, index, arr) => index === arr.length - 2).join('');
}

console.log(penultimate('golly gee willikers'));


// Exclusive Or

// if a & !b || if b & !a

function xOr(a, b) {
  return (a && !b) || (b && !a);
}

console.log(xOr(false, false));


// Odd Lists

// input: array
// output: every other element of an array. 1st, 3rd, 5th elements.

function oddities(array) {
  return array.filter((_, idx) => idx % 2 === 0);
}

console.log(oddities(['abc', 'def']));


// String to Number

// input: string of digits
// array of digits. match to index. return number.

function stringToInteger(string) {
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let num = 0;

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    num = (10 * num) + numbers.indexOf(char);
  }
  return num;
}

console.log(stringToInteger('4231'));


// convert string to signed number
// input: string of numbers, plus potential + / - at beginning

function stringToSignedInteger(string) {
  let isPositive = true;
  if (['-', '+'].includes(string[0])) {
    isPositive = (string[0] === '+');
    string = string.slice(1);
  }

  return isPositive ? stringToInteger(string) : (stringToInteger(string) * -1);
}

console.log(stringToSignedInteger('+4231'));

function stringToSignedInteger2(string) {
  switch (string[0]) {
    case '-':
      return -stringToInteger(string.slice(1));
    case '+':
      return stringToInteger(string.slice(1));
    default:
      return stringToInteger(string);
  }
}

console.log(stringToSignedInteger2('4231'));


// convert a number to a string
// input: non-negative number

// array of string numbers.
// while number > 0, divide by 10 to get numbers. 
// match to string array, put in different array. 
// reverse array, join to string. return.

function integerToString(number) {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = '';

  do {
    let remainder = (number % 10);
    number = Math.floor(number / 10);

    result = chars[remainder] + result;
  } while (number > 0);

  return result;
}

console.log(integerToString(4321));


// Signed number to sting
 function signedIntegerToString(number) {
   let isPos = number > 0;
   let string = integerToString(Math.abs(number));

   return isPos ? string : '-' + string;
 }

 console.log(signedIntegerToString(-123));
