// Question 1
let sentence = 'The Flintstones Rock!';

for (let i = 0; i < 10; i++) {
  console.log(' '.repeat(i) + sentence);
}

// Queston 2
let munstersDescription = "The Munsters are creepy and spooky.";
let reverseCase = [...munstersDescription].map(char =>  {
  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  } else {
    return char.toUpperCase();
  }
}).join('');

console.log(reverseCase);

// Question 3
function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(divisor);
    }
    divisor--;
  }
  return factors;
}
console.log(factors(15));

// Question 5
console.log(0.3 + 0.6, 0.3 + 0.6 === 0.9);

// Question 6
let nanArray = [NaN];
console.log(isNaN(nanArray[0]));

// Question 8
let munsters = {
  Herman: { age: 32, gender: "male" },
  Lily: { age: 30, gender: "female" },
  Grandpa: { age: 402, gender: "male" },
  Eddie: { age: 10, gender: "male" },
  Marilyn: { age: 23, gender: "female" }
};

function change(object) {
  Object.values(object).forEach(member => {
    member['age'] += 42;
    member['gender'] = 'other';
  });
}
change(munsters);
console.log(munsters);
