// Isn't it odd

// input: int
// outut: bool

function isOdd(number) {
  return Math.abs(number) % 2 === 1;
}

console.log(isOdd(-4));


// Odd Numbers
for (let i = 1; i < 100; i += 2) {
  console.log(i);
}

// Even Numbers
for (let i = 1; i < 100; i++) {
  if (i % 2 === 0) console.log(i);
}

// How big is the room?
// get input of width
// get input of height
// output string 

function calcRoom() {
  const readline = require('readline-sync');
  let length = Number(readline.question('Enter the length of the room.\n'));
  let width = Number(readline.question('Enter the width of the room.\n'));

  let sqMeters = areaMeters(length, width);
  let sqFeet = areaFeet(sqMeters);

  console.log(`The area of the room is ${sqMeters} square meters (${sqFeet.toFixed(2)} square feet)`);

}

function areaMeters(length, width) {
  return length * width;
}

function areaFeet(sqMeters) {
  return sqMeters * 10.7639;
}

// calcRoom();


// Tip Calculator

// prompt: bill amount
// prompt: tip rate
// convert to numbers, calc. 
// return string.


function tipCalculator() {
  const readline = require('readline-sync');
  let bill = parseFloat(readline.question('What is the bill?\n'));
  let tip = parseInt(readline.question('What is the tip percentage?\n'), 10);

  tip = (tip / 100) * bill;

  console.log(`The tip is $${tip.toFixed(2)}`);
  console.log(`The total is $${(bill + tip).toFixed(2)}`);
}

// tipCalculator();


// Sum / Product of Consecutive Integers
// get input: num > 0
// get input: s or p.

// if p, multiply all between 1 and number
// if s, add all between 1 and number.
// loop: counter starting at input.

function sumOrProduct() {
  const readline = require('readline-sync');
  let number = Number(readline.question('Please enter an integer greater than 0:\n'));
  let choice;
  while (!['s', 'p'].includes(choice)) {
    choice = readline.question('Enter "s" to compute the sum, or "p" to compute the product\n');
  }

  let total = (choice === 'p') ? 1 : 0;
  let operation = (choice === 'p') ? 'product' : 'sum';

  for (let i = 1; i <= number; i++) {
    if (choice === 's') {
      total += i;
    } else if (choice === 'p') {
      total *= i;
    }
  }

  console.log(`The ${operation} of the integers between 1 and ${number} is ${total}`);
}

// sumOrProduct();


// Short Long Short

// input: 2 strings
// output: log to console.

function shortLongShort(string1, string2) {
  if (string1.length < string2.length) {
    console.log(string1 + string2 + string1);
  } else if (string2.length < string1.length) {
    console.log(string2 + string1 + string2);
  } else {
    console.log(string1 + string2 + string1);
  }
}

shortLongShort('ab', 'de');


// Leap Years (pt 1)

// input: integer
// output: boolean

// if: year % 4 === 0
//  if year % 100 == 0 false
//    if year % 400 === 0 true
// true

function isLeapYear(year) {
  if (year < 1752 && year % 4 === 0) return true;

  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) return true;
      return false;
    }
    return true;
  }
  return false;
}

console.log(isLeapYear(12));


// Multiples of 3 and 5

// input: number
// output: number (sum)
// sum all numbers between 1 and the given number IF
// they are multiples of 3 or 5

function multiSum(number) {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(multiSum(1000));


// ASCII String Value
// for each char, add its char code value to sum. return sum.
function asciiValue(string) {
  let sum = 0;

  for (let i = 0; i < string.length; i++) {
    sum += string.charCodeAt(i);
  }

  return sum;
}

console.log(asciiValue(''));
