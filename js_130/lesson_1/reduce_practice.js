const scores = [30, 90, 17, 81, 10, 55, 20, 40];

function add(accumulator, element) {
  return accumulator + element;
}
let minMax = scores.reduce(add);
console.log(minMax);

minMax = scores.reduce((acc, score) => {
  return [Math.min(acc[0], score), Math.max(acc[1], score)];
}, [100, 0]);

console.log(minMax);

const peopleArr  = [
  {
      username:    'glestrade',
      displayname: 'Inspector Lestrade',
      email:       'glestrade@met.police.uk',
      authHash:    'bdbf9920f42242defd9a7f76451f4f1d',
      lastSeen:    '2019-05-13T11:07:22+00:00',
  },
  {
      username:    'mholmes',
      displayname: 'Mycroft Holmes',
      email:       'mholmes@gov.uk',
      authHash:    'b4d04ad5c4c6483cfea030ff4e7c70bc',
      lastSeen:    '2019-05-10T11:21:36+00:00',
  },
  {
      username:    'iadler',
      displayname: 'Irene Adler',
      email:       null,
      authHash:    '319d55944f13760af0a07bf24bd1de28',
      lastSeen:    '2019-05-17T11:12:12+00:00',
  },
];


let studentObj = peopleArr.reduce((acc, person) => {
  return {...acc, [person.username]: person};
}, {});

console.log(studentObj);


function objFromArray(acc, object, property) {
  return {...acc, [object[property]]: object};
}

let newObj = peopleArr.reduce((acc, person) => objFromArray(acc, person, 'username'));
console.log(newObj);


function fizzBuzzReducer(acc, val) {
  console.log(`the val is ${val}`);
  if (val % 15 === 0) return `${acc} Fizz Buzz\n`;
  if (val % 5 === 0) return `${acc} Fizz\n`;
  if (val % 3 === 0) return `${acc} Buzz\n`;

  return `${acc} ${val}\n`;
}

let fizzbuzz = scores.reduce(fizzBuzzReducer, '');
console.log(fizzbuzz);


const fileLines = [
  'Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton',
  'Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown',
  'Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester',
  'Inspector Gregory,Inspector Tobias Gregson,Inspector Hill',
  'Inspector Stanley Hopkins,Inspector Athelney Jones'
];

let investigators = fileLines.reduce((acc, val) => {
  return [...acc, ...val.split(',')];
}, []);

console.log(investigators);

function flatMap(func, array) {
  let reducer = (acc, val) => [...acc, ...func(val)];
  return array.reduce(reducer);
}

investigators = flatMap(line => line.split(','), fileLines);
console.log(investigators);


function minMaxReducer(acc, val) {
  return {
    min: Math.min(acc.min, val),
    max: Math.max(acc.max, val),
  };
}

let initMinMax = {
  min: Number.MAX_VALUE,
  max: Number.MIN_VALUE,
};

minMax = scores.reduce(minMaxReducer, initMinMax);
console.log(minMax);

// ^ the above does the same amount of calcs as doing 2 passes.

// Combining map and filter into one pass is an example of
// reduce's efficiency.


