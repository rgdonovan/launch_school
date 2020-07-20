// Lettercase Percentage
// input: string
// output: object.

// look at each letter in the string.
// match each letter that's lowercase. get the length.
// match each letter that's uppercase. get the length.
// match each char that's neither. get the length.
// divide each length by the length of the original string, rounded to 2 decimal points.
// push these values to the object. Return the object.

function letterPercentages(string) {
  let result = {
    lowercase: (string.match(/[a-z]/g) || []).length,
    uppercase: (string.match(/[A-Z]/g) || []).length,
    neither: (string.match(/[^a-z]/gi) || []).length
  };
  for (let prop in result) {
    if (result[prop] === 0) {
      result[prop] = '0.00';
    } else {
      result[prop] = String(((result[prop] / string.length) * 100).toFixed(2));
    }
  }

  return result;
}

console.log(letterPercentages(""));


// Triangle Sides
// input: 3 numbers
// if: 2 smallest numbers summed < larger, invalid. Or a number is 0, invalid.
// if all numbers equal, equilateral.
// if 2 numbers equal, isoceles
// if all numbers different, scalene.

// sort the numbers for smallest to biggest.
// if [0] is 0, return invalid.
// if [0] + [1] < [2], return invalid.
// for loop, then filter the array to see how many of it exist.
// if 3, return equilateral.
// if 2, return isoceles.
// else, return scalene.

function triangle(num1, num2, num3) {
  let sides = [num1, num2, num3].sort((a, b) => a - b);

  if (sides.includes(0) || (sides[0] + sides[1]) < sides [2]) return 'invalid';

  for (let i = 0; i < sides.length - 1; i++) {
    let matchingSides = sides.filter(side => side === sides[i]).length;
    if (matchingSides === 3) return 'equilateral';
    if (matchingSides === 2) return 'isoceles';
  }

  return 'scalene';
}

console.log(triangle(1, 3, 4));


// Tri-Angles
// input: 3 numbers
// output: string

// look at 3 inputs.

//  if sum !== 180, or an angle < 0, invalid.
//  find the greatest value. if > 90, obtuse, = 90, right, < 90 acute


function triAngle(angle1, angle2, angle3) {
  let angles = [angle1, angle2, angle3];
  if (!isValid(angles)) return 'invalid';

  return getTriangleType(arguments);
}

function isValid(angles) {
  return (angles.reduce((acc, val) => acc + val) === 180 ||
    Math.min(...angles) > 0);
}

function getTriangleType(angles) {
  let largestAngle = Math.max(...angles);

  if (largestAngle > 90) {
    return 'Obtuse';
  } else if (largestAngle === 90) {
    return 'Right';
  } else {
    return 'Acute';
  }
}

console.log(triAngle(120, 50, 10));


// Unlucky Days
// input: year
// output: number

// get year. 
// for each month in the year, look at day 13
// if a friday, add to sum.
// return sum.

function fridayThe13ths(year) {
  let count = 0;

  for (let month = 0; month < 12; month++) {
    let thirteenth = new Date(year, month, 13);
    if (thirteenth.getDay() === 5) {
      count++;
    }
  }
  return count;
}

console.log(fridayThe13ths(2017));


// Next Featured Number Higher than a Given7 Value
// featured number =
//  odd number
//  multiple of 7
//  each of its digits occurs once.

// input: integer
// output: the next featured number greater than the input.

// from the given number,
// divide that by 7, round down to see what last multiple was?
// from there, multiply by 7s. 
// at each number, check if meets criteria **
function featured(number) {
  let lastMultiple = Math.floor(number / 7);

  do {
    lastMultiple++;
    number = 7 * lastMultiple;

    if (number > 9876543201) return -1;
  } while (!isOdd(number) || ( isOdd(number) && !isUnique(number)));

  return number;
}

function isOdd(number) {
  return number % 2 !== 0;
}

function isUnique(number) {
  return String(number).split('').map((num, _, array) => {
    return array.filter(char => char === num).length;
  }).every(val => val === 1);
}
console.log(featured(9876543201));

// Sum Square - Square Sum
// input: integer
// output: integer

// sum the integers from 1 - n, then square that.
// then get the square for each int between 1 - n, and add them together.
// subtract b from a.
// return that.

// loop through all numbers in range.
// have a total accumulating for each;

function sumSquareDifference(num) {
  let sum = 0;
  let squareSum = 0;

  for (let i = 1; i <= num; i++) {
    sum += i;
    squareSum += (i ** 2);
  }

  return (sum ** 2) - squareSum;
}

console.log(sumSquareDifference(3));


// Bubble Sort
// make multiple iterations through an array
// on each pass, compare each pair of consecutive elements
// if a > b, swap them.
// repeat until a complete pass is made without any swaps.




// compare the element with the next element.
// if true, swap.
// let swapped = true.
// if not, go to next pair. 
// a > b compare.

// if swapped = true, repeat. 


function bubbleSort(array) {
  let swapped;
  do {
  swapped = false;

  for (let idx = 0; idx < array.length; idx++) {
    let [val1, val2] = array.slice(idx, idx + 2);
    if (val1 > val2) {
      array[idx] = val2;
      array[idx + 1] = val1;
      swapped = true;
    }
  }
  } while (swapped === true);
}

let arr = [4, 3, 2, 5, 1];
bubbleSort(arr);
console.log(arr);

arr = ['katie', 'gig', 'anna'];
bubbleSort(arr);
console.log(arr);


// Longest Sentence
// input: string
// output: longest sentence in string, + its word count.

// sentences my end with . ! or ?
// words === anything not spaces.
// preserve punctuation. "", etc.

// split the sentence on any specified punctuation.
// map that array to each string's length.
// find it in the string via .indexOf(sentence) + sentence length + 1;

function longestSentence(text) {
  let sentences = text.split(/[.?!]/g);
  let lengths = sentences.map(sentence => sentence.length);

  let longestLength = Math.max(...lengths);
  let longestSentence = sentences[lengths.indexOf(longestLength)];

  let sentenceIdx = text.indexOf(longestSentence);
  longestSentence = text.slice(sentenceIdx, sentenceIdx + longestLength + 2);

  let wordCount = longestSentence.split(' ').filter(word => word !== '').length;

  console.log(`${longestSentence}\n\nThe longest sentence has ${wordCount} words`);
}


let sentence = "whoo? oh boy. Maybe this works? ha!";
console.log(longestSentence(sentence));

let a = 5;
function add5(val) {
  val += 5;
  return val;
}

add5(a);
console.log(a);

let myFunc = function(a, b) {
  return a + b;
};

myFunc(5);

function addFunc(a, b) {
  return a + b;
}