let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let obj = {};
flintstones.forEach((val, index)=> {
  obj[val] = index;
});

console.log(obj);

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let age = Object.values(ages).reduce((acc, val) => (val < acc ? val : acc));
age = Math.min(...Object.values(ages));
console.log(age);

let statement = "The Flintstones Rock";
let letters = {};

statement.split('').filter(char => char !== ' ').forEach(char => {
  letters[char] = letters[char] || 0;
  letters[char] += 1;
});

let result = [1, 2, undefined, 3, 4, 5].sort();
console.log(result);