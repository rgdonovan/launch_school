/* eslint-disable max-lines-per-function */
// rotation (pt 1)
// input: anything, but ideally array
// output: different array

// if input not array, return undefined.
// return a new array 
// with the first element moved to the end of the array.
// don't modify the og array

// new array = slice of old array + oA[0]

function rotateArray(array) {
  if (!Array.isArray(array)) return undefined;
  if (array.length  === 0) return [];

  return array.slice(1).concat(array[0]);
}

console.log(rotateArray(['a']));


// Rotation (Pt 2)
// input: number, num
// output: newArray
// convert the number to a string, to an array.
// create a substring of the last num elements of the array.
// call the rotateArray function on them.
// splice it back in? or concat.
function rotateRightmostDigits(number, count) {
  let numString = String(number);
  let startSubStr = numString.slice(0, -count);
  let endSubStr = rotateString(numString.slice(-count));

  return Number(startSubStr + endSubStr);

}

function rotateString(string) {
  return string.slice(1) + string[0];
}

console.log(rotateRightmostDigits(12345, 4));


// Rotation (pt 3)
// input number
// return number (0s can be dropped)

// number to string
// loop through the string chars.
// at each char, create a substr.
// rotate the string.
// reassign that to the string var.

function maxRotation(number) {
  let length = String(number).length;

  for (let count = length; count >= 2; count--) {
    number = rotateRightmostDigits(number, count);
  }

  return number;
}

console.log(maxRotation(735291));


// Stack Machine Interpretation
// register == the current value. Not part of the stack.
// Operation that requires a value: pops the top item from the stack.
// it then opeates on the popped value and register value, and stores the
// result back in the register.

// write a function w/ a 
// input: string (to be parsed)

// object of operations.

// when calling function, 
function miniLang(commandLine) {
  let stack = [];
  let register = 0;
  commandLine.split(' ').forEach(command => {
    let operation = (Number.isNaN(Number(command))) ? command : 'n';
    switch (operation) {
      case 'n':
        register = Number(command);
        break;
      case 'PUSH':
        stack.push(register);
        break;
      case 'ADD':
        register += stack.pop();
        break;
      case 'SUB':
        register -= stack.pop();
        break;
      case 'MULT':
        register *= stack.pop();
        break;
      case 'DIV':
        register = Math.round(register / stack.pop());
        break;
      case 'MOD':
        register = Math.round(register % stack.pop());
        break;
      case 'POP':
        register = stack.pop();
        break;
      case 'PRINT':
        console.log(register);
        break;
    }
  });
}


miniLang('PRINT');


// word to digit

// input: string sentence
// output: string, string words converted to numbers.
// iterate through each of the keys
// find and replace all the matching words in the sentence with the key's value.

let numbers = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

function wordToDigit(sentence) {
  Object.keys(numbers).forEach(word => {
    let regex = new RegExp('\\b' + word + '\\b', 'g');
    sentence = sentence.replace(regex, numbers[word]);
  });

  return sentence;
}

console.log(wordToDigit('Please call me at five five five one two three four. Thanks.'));


// Fibonacci Numbers (Recursion)
function fibonacci(num) {
  if (num <= 2) {
    return 1;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

console.log(fibonacci(12));


// Fibonacci Numbers (Procedural)
// number is the result of the number + the previous number.
// have number, next number.
// 1 + 1 = 2
// 1 + 2 = 3
// 2 + 3 = 5
// 3 + 5 = 8
// ... basically, add until you get to that number.
// [1, 1]
// [1, [1 + 1]]
// [2, [2 + 1]]
function fibonacciProcedural(nth) {
  let previousTwo = [1, 1];

  for (let counter = 3; counter <= nth; counter += 1) {
    console.log(previousTwo);
    previousTwo = [previousTwo[1], previousTwo[0] + previousTwo[1]];
  }

  return previousTwo;
}

function fibonacci2(nth) {
  let previous = [0, 1];
  for (let counter = 2; counter < nth; counter++) {
    console.log(previous);
    previous = [previous[1], previous[0] + previous[1]];
  }
  return previous[0] + previous[1];
}

console.log('its a', fibonacci2(12));
// Fibonacci Numbers (Memoization)
//
// each time you do the equation, check to see if the result is already stored.
//  if its not, do the equation.
//  store the results in an object.
// return the key from the equation.
function fibonacciMemo(num) {
  let cache = [0, 1];
  let fib = num => {
    if (num <= 2) {
      return 1;
    } else {
      return fibonacci(num - 1) + fibonacci(num - 2);
    }
  };
}

function fibonacci3(num) {
  let cache = [0, 1];

  let fib = num => {
    let result = cache[num];
    console.log(`num is ${num}, cache is ${cache}`);
    if (typeof result !== 'number') {
      result = fib(num - 1) + fib(num - 2);
      cache[num] = result;
    }
    return result;
  };

  return fib(num);
}

console.log(fibonacci3(12));