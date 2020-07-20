const readline = require('readline-sync');

let penultimate = string => {
  let wordArray = string.split(' ');
  return wordArray[wordArray.length - 2];
};

console.log(penultimate('yeah so this should be last hopefully'));

function xor(value1, value2) {
  if ((value1 && !value2) || (value2 && !value1)) {
    return true;
  }
  return false;
}

console.log(xor(5, 0) === true);
console.log(xor(false, true) === true);
console.log(xor(1, 1) === false);
console.log(xor(true, true) === false);