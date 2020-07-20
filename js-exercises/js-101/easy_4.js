// How old is Teddy?
let randomBetween = (min, max) => {
  if (min > max) return Math.floor(Math.random() * (min - max + 1)) + max;
  else return Math.floor(Math.random() * (max - min + 1)) + min;
};

let age = randomBetween(20, 120);
console.log(`Teddy is ${age} years old!`);

// Searching 101
function searchNumbers() {
  const readline = require('readline-sync');
  let array = [];

  while (array.length < 6) {
    if (array.length === 5) array.push(readline.questionInt('Enter the last number\n'));
    else array.push(readline.questionInt('Enter a number\n'));
  }
  let comparisonValue = array.pop();
  console.log(array);

  if (array.includes(comparisonValue)) {
    console.log(`The number ${comparisonValue} appears in ${[array.join(', ')]}.`);
  } else {
    console.log(`The number ${comparisonValue} does not appear in ${[array.join(', ')]}.`);
  }
}

// When Will I Retire?
function calculateRetirement() {
  const readline = require('readline-sync');
  let userAge = Number(readline.question('How old are you?\n'));
  let retirementAge = Number(readline.question('At what age do you want to retire?\n'));
  let currentYear = 2020;
  
  let years = retirementAge - userAge;
  let retirementYear = currentYear + years;
  let yearsToRetirement = retirementYear - currentYear;

  console.log(`Its ${currentYear}. You'll retire in ${retirementYear}, in ${yearsToRetirement} more years.`);
}

// Palindromic Strings Pt 1
function isPalindrome(word) {
  let isPalindrome = true;
  word.split('').forEach((char, index, array) => {
    if (char !== array[array.length - 1 - index]) {
      isPalindrome = false;
    }
  });
  return isPalindrome;
}

function isPalindrome2(string) {
  string = string.toLowerCase().replace(/[ !?'",.]/g, '');
  return string === string.split('').reverse().join('');
}

function isPalindromicNumber(number) {
  return isPalindrome2(String(number));
}

// Running Totals
function runningTotal(array) {
  let sum = 0;
  let sumArray = array.map(num => {
    sum += num;
    return sum;
  });
  return sumArray;
}

// Letter Counter Pt1

// take a string
// convert to array
// convert array elements to their length
// create object
// for each element in array
// if object has property
// object[element] = +1
// else object[element] = 1
// need to convert num to string for property names?

function wordSizes(string) {
  let obj = {};
  let lengthArray = string.replace(/['",?!.']/g, '').split(' ').map(word => String(word.length));

  lengthArray.forEach(val => {
    if (obj.hasOwnProperty(val)) obj[val] += 1;
    else obj[val] = 1;
  });
  return obj;
}

console.log(wordSizes("it's not gonna be 2 for 4"));

// Letter Swap
function swap(sentence) {
  function swapLetters(word) {
    if (word.length === 1) return word;

    let firstLetter = word.charAt(0);
    let lastLetter = word.charAt(word.length - 1);
    return lastLetter + word.slice(1, word.length - 1) + firstLetter;
  }

  let result = sentence.split(' ').map(word => swapLetters(word)).join(' ');
  return result;
}
console.log(swap('do i work?'));