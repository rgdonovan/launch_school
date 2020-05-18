// Cute Angles
function dms(angle) {
  const ANGLE_TO_MINUTES = angle * 60;
  const ANGLE_TO_SECONDS = angle * 3600;
  let degrees = Math.floor(angle);
  let minutes = Math.floor(ANGLE_TO_MINUTES % 60);
  let seconds = Math.floor(ANGLE_TO_SECONDS % 60);

  console.log(formatdms(degrees, minutes, seconds));
}

function formatdms(degrees, minutes, seconds) {
  degrees = prependZero(degrees);
  minutes = prependZero(minutes);
  seconds = prependZero(seconds);

  return `${degrees}°${minutes}'${seconds}"`;
}

function prependZero(number) {
  return number < 10 ? '0' + number.toString() : number.toString();
}
dms(0);

// Combining Arrays

// join the arrays into one.
// iterate over each element; if its not in the results array, push it.
let arr1 = [1, 3, 5];
let arr2 = [3, 6, 9];

function union(arr1, arr2) {
  let results = [];

  arr1.concat(arr2).forEach(val => {
    if (!results.includes(val)) {
      results.push(val);
    }
  });

  return results;
}

console.log(union(arr1, arr2));

// Halvsies
// input: array
// output: nested array

// create a nested array with these 2 values:
// create an array from idx 0 to the half length of the array. if the array is an even length, favor this side.
// create another nested array sliced from this half length to the end of the array.

function halvsies(array) {
  let halfLengthIndex = Math.ceil(array.length / 2);
  let firstHalf = array.slice(0, halfLengthIndex);
  let secondHalf = array.slice(halfLengthIndex);

  return [firstHalf, secondHalf];
}
console.log(halvsies([1]));

// Find the Duplicate

// input: array
// output: primitive

// shift the first element in the array.
// if the remaining array contains that value, return it.
// otherwise, repeat for the next val in the array.

function findDup(array) {
  for (let i = 0; i < array.length; i++) {
    let val = array[i];
    if (array.slice(i + 1).includes(val)) {
      return val;
    }
  }
  return undefined;
}

console.log(findDup([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
  38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
  14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
  78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
  89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
  41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
  55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
  85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
  40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
   7, 34, 57, 74, 45, 11, 88, 67,  5, 58]));

console.log(findDup([1, 2, 3]));


// Combine Two Lists

// input: 2 arrays, same length (not empty)
// output: array

// loop, push both.

function interleave(arr1, arr2) {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i], arr2[i]);
  }

  return result;
}

console.log(interleave([1, 2, 3], ['a', 'b', 'c']));


// Multiplicative Average

//input: array of ints
//output: number as string. rounded to 3 decimal places.

// multiply all the integers together (reduce)
// divide by the length of the array.
// convert to string, toFixed(3)

function multiplicativeAverage(array) {
  let total = array.reduce((acc, val) => acc * val);
  return (total / array.length).toFixed(3);
}

console.log(multiplicativeAverage([3, 5]));

// Multiply Lists

// input: 2 arrays of numbers, same length
// output: array

// at each index of an array, multiply its value with the value in the
// matching index of the other array.
// map.

function multiplyList(arr1, arr2) {
  return arr1.map((val, index) => val * arr2[index]);
}

console.log(multiplyList([3, 5, 7], [9, 10, 11]));

// List of Digits

// input: positive int
// output: array of digits in the number.

// turn the number to a string, then split, then map numbers?

function digitList(number) {
  return number.toString().split('').map(char => Number(char));
}

console.log(digitList(12345));

// How Many?

// input: array of primitives
// output: formatted object keys/values

// count the number of occurrences of each value (in object?)
// for each value:
// does the object.hasOwnProperty(value)
// create a key if it doesn't exist, with val = 1.
// if it does exist, val++.

function countOccurrences(array) {
  let elements = {};
  for (let i = 0; i < array.length; i++) {
    let key = array[i]
    if (elements.hasOwnProperty(key)) {
      elements[key] += 1;
    } else {
      elements[key] = 1;
    }
  }
  printElements(elements);
}

function printElements(object) {
  let format = (key, value) => `${key} => ${value}`
  Object.keys(object).forEach(key => console.log(format(key, object[key])));
}

let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
                'motorcycle', 'motorcycle', 'car', 'truck'];

countOccurrences(vehicles);

// Array Average
function average(array) {
  let sum = array.reduce((acc, val) => acc + val);
  return Math.floor((sum / array.length));
}

console.log(average([1, 5, 87, 45, 8, 8]));
console.log(average([9, 47, 23, 95, 16, 52]));

// After Midnight

// input: number, pos or neg
// output: string (formatted)

// take a number representing minutes, and return it as the time of day
// in 24hr format.
// if the number is positive, its after midnight.
// if the number is negative, its before.

// take the input as number of minutes.
// turn it into minutes and hours.
//  there are 60 mins in an hour, 24 hours in a day.
// (minutes % 60), ((minutes / 60) % 24)

// if the input was negative, subtract these from the totals.
// if it was positive, add them.

// formatting function:
// input: numbers (hours, minutes)
// if either is less than 10, add a 0.
// return formatted string.

function timeOfDay(minutes) {
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const DAYS_PER_WEEK = 7;

  let absMinutes = Math.abs(minutes);
  let mins = absMinutes % 60;
  let hours = Math.floor((absMinutes / MINUTES_PER_HOUR) % HOURS_PER_DAY);
  let days = Math.floor(
    (absMinutes / MINUTES_PER_HOUR) / HOURS_PER_DAY) % DAYS_PER_WEEK;
  console.log('days =', days);

  if (minutes < 0) {
    mins =  MINUTES_PER_HOUR - mins;
    hours = HOURS_PER_DAY - (hours + 1);
    days = DAYS_PER_WEEK - days;
  }

  return formatTime(mins, hours, days);
}

function formatTime(mins, hours, days) {
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'];

  if (mins < 10) {
    mins = '0' + mins.toString();
  }
  if (hours < 10) {
    hours = '0' + hours.toString();
  }
  if (days === 7) {
    days = 0;
  }

  return `${WEEKDAYS[days]} ${hours}:${mins}`;
}

console.log(timeOfDay((1440 * 67)));

// consider the default to be sunday 00:00
// every 24hrs back goes back a day; every 24hrs forward, forward.
// 7 days in a week.
// array of days [0 - 7],
// get days from hours / hours per day (24)
// get day of week from days % 7
// get array at that index.


// After Midnight (Part 2)
// input: string
// output: number

// take input of string.
// get numbers from split strings. .split().Number()
// for arr[0], get minutes from hours (*60)
// for arr[1], get minutes.
// add together.

// to get time after midnight: 
// subtract hours from 24, mins from 60 before doing calc.

// get time from string.
// return an array of values
// in beforeMidnight, return the minutes as is
// in afterMidnight, subtract them.
function timeArrayFromString(time) {
  return time.split(':').map(val => Number(val));
}

function beforeMidnight(time) {
  const MINUTES_PER_HOUR = 60;
  let hours = timeArrayFromString(time)[0];
  let minutes = timeArrayFromString(time)[1];

  if (hours === 24) {
    hours = 0;
  }
  return (hours * MINUTES_PER_HOUR) + minutes;
}

function afterMidnight(time) {
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;

  let hours = HOURS_PER_DAY - timeArrayFromString(time)[0];
  let minutes = MINUTES_PER_HOUR - timeArrayFromString(time)[1];
  if (hours === 24) {
    hours = 0;
  }
  if (minutes !== 0) {
    hours -= 1;
  }
  return (hours * MINUTES_PER_HOUR) + minutes;
}
console.log(beforeMidnight('00:00'));
console.log(afterMidnight('00:00'));