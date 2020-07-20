// Question 1
let numbers = [1, 2, 3, 4];
numbers.splice(0, numbers.length);
console.log(numbers);

numbers = [1, 2, 3, 4];
while (numbers.length > 0) {
  numbers.pop();
}
console.log(numbers);

numbers = [1, 2, 3, 4];
numbers.length = 0;
console.log(numbers);

numbers = [1, 2, 3, 4];
numbers = [];
console.log(numbers);

// Question 2
console.log([1, 2, 3] + [4, 5]);
// js doesn't allow you to concatenate strings with ' + '.
// + first converts the arrays to strings, then concatenates the strings.

// Question 4
let arr1 = [{ first: [1, 2, 3] }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();

arr2[0].first[2] = 5;
console.log(arr2, arr1);

// Question 5
function isColorValid(color) {
  return (color === "blue" || color === "green");
}

console.log(isColorValid('blue'));
