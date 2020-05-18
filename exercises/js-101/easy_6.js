// repeater
// input: string
// output: string

// double each char in input string
// make string into array.
// forEach element, double it (map to new array to save it)
// return array joined as string.

function repeater(string) {
  return string.split('').map(char => char + char).join('');
}
console.log(repeater('wowee'));

// Double Char (pt 2)
// split string into array.
// if its not a vowel, call repeater on it.
// join the resulting array.
function doubleConsonants(string) {
  return string.split('').map(char => (!char.match(/[aeiou'" !.?]/g) ? repeater(char) : char)).join('');
}

console.log(doubleConsonants('...regina?'));

// Reverse Number
// input: pos number
// output number

// take input of number
// convert number to string, then array,
// then reverse array, then join, then convert to number?

function reverseNumber(number) {
  return Number(number.toString().split('').reverse().join(''));
}

console.log(reverseNumber(12345));


// Get the Middle Character
// input: non-empty string
// output: char at middle length of string. If string is even, return 2 chars.

// declare center char var.
// get length / 2.
// if uneven, get slice of string (length/2 + 2)
// return string.

function centerOf(string) {
  let halfLength = Math.floor(string.length / 2);

  if (string.length % 2 !== 0) {
    return string[halfLength];
  } else {
    return string.slice(halfLength - 1, halfLength + 1);
  }
}

console.log(centerOf('Launch'));

// Always return negative
function negative(number) {
  return Math.abs(number) * -1;
}

console.log(negative(0));

// Counting Up
// output an array
// get all numbers from a number till ! >0
// push each value to an array.
// reverse and return the array.
function sequence(number) {
  let result = [];
  do {
    result.push(number);
    number--;
  } while (number > 0);

  return result.reverse();
}

console.log(sequence(5));

// Name Swapping
// input: 2 strings
// output: formatted string
// split into array, reverse, join w, ', '
function swapName(string) {
  return string.split(' ').reverse().join(', ');
}

console.log(swapName('Regina Donovan'));


// Sequence Count
// input: 2 ints.
// # of elements, starting number.
// output: array of values.
// start at starting value, muliply by index,
// till reached specified sequence length.

function sequence2(count, start) {
  let result = [];
  for (let i = 1; i <= count; i++) {
    result.push(start * i);
  }
  return result;
}

console.log(sequence2(4, -7));


// Reverse It (pt 1)
// input: string
// output: string
// split string to array of words, reverse it.

function reverseSentence(string) {
  return string.split(' ').reverse().join(' ');
}

console.log(reverseSentence('Hey there'));

// Reverse It (pt 2)
// input: string
// output: string
// split string into array of words.
// for each word, check if length >= 5
// if so, split the word into an array, reverse it, join it.

function reverseWords(string) {
  return string.split(' ').map(word => {
    return (word.length >= 5) ? word.split('').reverse().join('') : word;
  }).join(' ');
}

console.log(reverseWords('professional is a long word dayumn'));

// Reversed Arrays
// input: array
// output: the same array, mutated
// NO USING REVERSE
// for the length of the elements in the array,
// swap the first and the last till you get to the middle.

function reverse2(array) {
  for (let i = 0; i < array.length; i++) {
    if ( i >= Math.ceil(array.length / 2)) break;

    let oppositeIndex = array.length - 1 - i;
    let lastChar = array[oppositeIndex];
    let curChar = array[i];

    array[i] = lastChar;
    array[oppositeIndex] = curChar;
  }
  return array;
}

let list = [1, 2, 3, 4, 5];
let result = reverse2(list);
console.log(result); // logs [4,3,2,1]
console.log(list === result); // logs true


// Matching PArentheses
// input: string
// output: true/false
// go through the string char by char.
// if there's a (, it must be followed by a ).
// if there's a ), its false.

// strip the string to just ()s.
// going through the string, count the ()s
// for each (, once you get to ) there shoud be a corresponding number.

// loop though the string
// if you encounter ) before (, return false.
// if you encounter (, count as many till you reach a ).
// at ), count as many till you reach a ( or end of the string.
// if (, repeat.
// else if end of string, compare count. if uneven, return false.

function isBalanced(string) {
  let parens = string.split('').filter(char => (char === '(' || char === ')'));
  let count = {
    '(' : 0,
    ')' : 0
  };

  for (let i = 0; i < parens.length; i++) {
    let paren = parens[i];

    count[paren] += 1;

    if (count[')'] > count['(']) return false;
  }
  if (count['('] !== count[')']) return false;

  return true;
}
