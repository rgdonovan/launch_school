// Question 1
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice = advice.replace('important', 'urgent');

console.log(advice);

// Question 2
let numbers = [1, 2, 3, 4, 5];
let reversed = numbers.slice().reverse();
let reversed2 = numbers.slice().sort((a, b) => b - a);
console.log(reversed2, reversed, numbers);

let reversed3 = numbers.reduce((acc, val) => {
  return [val, ...acc];
},[]);

let reversed4 = [];

numbers.forEach((_, index, array) => {
  reversed4.push(array[array.length - 1 - index]);
});

console.log(reversed3, reversed4, numbers);

// Question 3
numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

console.log(numbers.includes(8));
console.log(numbers.includes(95));

// Question 4
let famousWords = "seven years ago...";

console.log('four score and ' + famousWords);
console.log("four score and ".concat(famousWords));

// Question 5
numbers = [1, 2, 3, 4, 5];
numbers.splice(numbers.indexOf(3), 1);

console.log(numbers);

// Question 6
let flintstones = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];
let unnested = flintstones.reduce((acc, val) => {
  return acc.concat(val);
}, []);

let flatten = (array) => {
  let newArray = [];
  let helper = array => {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if (Array.isArray(element)) {
        helper(element);
      } else {
        newArray.push(element);
      }
    }
  };
  helper(array);
  return newArray;
};

console.log(flatten(flintstones));
console.log(unnested);

//Question 7
flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };

let barneyArray = Object.entries(flintstones).find(val => val[0] === 'Barney');
let barneyArray2 = Object.entries(flintstones).filter(val => val[0] === 'Barney').shift();

console.log(barneyArray, barneyArray2);

// Question 8
numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false

console.log(Array.isArray(numbers), Array.isArray(table));

// Question 9
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

console.log(statement1.match(/t/g).length);
console.log(statement2.match(/t/g) || [].length);

// Question 10
let title = "Flintstone Family Members";
let amount = Math.floor((40 - title.length) / 2);
title = title.padStart(title.length + amount, ' ');
console.log(title);