// Daily Double
function crunch(string) {
  return string.split('').map(char => char + char).join('');
}

console.log(crunch('gday'));

// Bannerizer
function logInBox(string, width = string.length) {
  if (string.length > width) string = string.slice(0, width);
  let horizontalBorder = '+' + '-'.repeat(string.length + 2) + '+';
  let emptyLine = '| ' + ' '.repeat(string.length) + ' |';
  let textLine = '| ' + string + ' |';

  console.log(horizontalBorder);
  console.log(emptyLine);
  console.log(textLine);
  console.log(emptyLine);
  console.log(horizontalBorder);
}

logInBox('To boldly go where no one has gone before.', 10);

function logInWrappingBox(string, maxLength = 20) {
  let horizontalBorder = '+' + '-'.repeat(string.length + 2) + '+';
  let emptyLine = '| ' + ' '.repeat(string.length) + ' |';
  let textLine = '| ' + string + ' |';

  let totalStringLength = string.length + 4;
  let boxArray =
  [horizontalBorder, emptyLine, textLine, emptyLine, horizontalBorder];
  let startSliceIndex = 0;
  do {
    boxArray.forEach(element => console.log(element.slice(startSliceIndex, startSliceIndex + maxLength)));
    startSliceIndex += maxLength;
  }
  while (startSliceIndex < totalStringLength);
}

logInWrappingBox('To boldly go where no one has gone before.', 30);

// Stringy Strings
function stringy(number) {
  let result = '';
  for (let i = 0; i < number; i++) {
    let number = (i % 2 === 0) ? '1' : '0';
    result += number;
  }
  return result;
}

console.log(stringy(0));
// Fibonacci Number Location by Length
// input: number
// output: number w/digits of number.

// while String(fib).length < number:
//  calculate fib.
//  counter ++.

// return counter.

// fib is n-1 + n-2.
// fib = [0, 1] => [fib[1], fib[0] + fib[1]];
// add to get fib.

function fibIndexByLength(digits) {
  if (digits <= 1) return 1;
  let iterations = 2;
  let fib = [0, 1];
  let fibNumber = fib[0] + fib[1];

  while (String(fibNumber).length < digits) {
    fib = [fib[1], fib[0] + fib[1]];
    fibNumber = fib[0] + fib[1];
    iterations += 1;
  }
  return iterations;
}

console.log('THIS NUMBER RIGHT HERE', fibIndexByLength(26));


// Right Triangles
function triangle(n) {
  for (let i = 0; i <= n; i++) {
    console.log(' '.repeat(n-i) + '*'.repeat(i));
  }
}

triangle(9);

// // MadLibs
// let readline = require('readline-sync');

// let noun = readline.question('Enter a noun\n');
// let verb = readline.question('Enter a verb\n');
// let adjective = readline.question('Enter an adjective\n');
// let adverb = readline.question('Enter an adverb\n');

// console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}?`);


// Double Doubles
// take a number
// if the number is a double, return it
// isDouble
// number to string
// if string.length is odd, false.
// else string.slice(0, string.length / 2) === string.slice(string.length / 2)
//
//
// if not, multiply the number by two and return it.

function twice(number) {
  function isDouble(number) {
    let numString = number.toString();
    if (numString.length % 2 !== 0) return false;
    if (numString.slice(0, numString.length / 2) === numString.slice(numString.length / 2)) return true;

    return false;
  }

  return isDouble(number) ? number : number * 2;
}

console.log(twice(37));
console.log(twice(44));
console.log(twice(334433));
console.log(twice(444));
console.log(twice(107));
console.log(twice(103103));

// GradeBook
function getGrade(grade1, grade2, grade3) {
  let average = (grade1 + grade2 + grade3) / 3;
  if (average >= 90) return 'A';
  else if (average >= 80) return 'B';
  else if (average >= 70) return 'C';
  else if (average >= 60) return 'D';
  else return 'F';
}

console.log(getGrade(95, 90, 93));
console.log(getGrade(50, 50, 95));

// Clean Up The Words
function cleanUp(string) {
  let array = string.split(' ').map(element => element.replace(/[!@#$%^&*()'"-?]/g, ' ').trim());
  console.log(array);
  return array.join(' ');
}

console.log(cleanUp("---what's my +*& line?"));

// What Century is That?
function century(year) {
  let century = Math.ceil(year / 100);
  if (century % 10 === 0) century += 1;
  century = century.toString();

  let checkVal = century.length > 1 ? century : '0' + century;
  if (checkVal[0] !== '1') {
    if (checkVal[1] === '1') return century + 'st';
    if (checkVal[1] === '2') return century + 'nd';
    if (checkVal[1] === '3') return century + 'rd';
  }

  return century + 'th';
}

console.log(century(2000));