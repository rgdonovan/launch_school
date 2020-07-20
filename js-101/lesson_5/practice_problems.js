// Problem 1
let arr = ['10', '11', '9', '7', '8'];
arr.sort((a, b) => Number(b) - Number(a));

console.log(arr);

//Problem 2
let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];
books.sort((a, b) => Number(a.published) - Number(b.published));

console.log(books);

//Problem 3
let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
console.log(arr1[2][1][3]);
let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
console.log(arr2[1]['third'][0]);
let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
console.log(arr3[2]['third'][0][0]);
let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
console.log(obj1['b'][1]);
let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
console.log(Object.keys(obj2.third)[0]);

//Problem 4
arr1 = [1, [2, 3], 4];
arr1[1][1] = 4;
console.log(arr1)
arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr2[2] = 4;
console.log(arr2);
obj1 = { first: [1, 2, [3]] };
obj1.first[2][0] = 4;
console.log(obj1);
obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2.a.a[2] = 4;
console.log(obj2);

//Problem 5
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let totalAges = Object.values(munsters).reduce((acc, val) => {
  return val.gender === 'male' ? acc + val.age : acc;
},0);

console.log(totalAges);

// Problem 6
munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

Object.entries(munsters).forEach(munster => {
  console.log(`${munster[0]} is a ${munster[1].age} year old ${munster[1].gender}`);
});

// Problem 8
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};
Object.values(obj).forEach(arr => {
  arr.forEach(word => {
    word.split('').forEach(char => {
      if (char.match(/[aeiou]/g)) {
        console.log(char);
      }
    });
  });
});

// Problem 9
let array = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let newArr = array.map(arr => {
  if (typeof arr[0] === 'number') {
    return arr.slice().sort((a, b) => a - b);
  } else {
    return arr.sort();
  }
});

console.log(array, newArr);

// Problem 10
array = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

newArr = array.map(subArr => {
  if (typeof subArr[0] === 'number') {
    return subArr.slice().sort((a, b) => b - a);
  } else {
    return subArr.slice().sort().reverse();
  }
});
console.log(array, newArr);

// Problem 11
arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

newArr = arr.map(obj => {
  let newObj = {};
  for (let val in obj) {
    newObj[val] = obj[val] + 1;
  }
  return newObj;
});

console.log(newArr);
console.log(arr);

// Problem 12
arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
newArr = arr.map(subArr => {
  return subArr.filter(val => val % 3 === 0);
});

console.log(newArr);

// Problem 13
arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
arr.sort((a, b) => {
  let aVal = a.reduce((acc, val) => (val % 2 !== 0 ? acc + val : acc));
  let bVal = b.reduce((acc, val) => (val % 2 !== 0 ? acc + val : acc));
  return aVal - bVal;
});

console.log(arr);

// Problem 14
obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

// Problem 14
let sizeAndColors = Object.values(obj).map(subObj => {
  if (subObj.type === 'fruit') {
    return subObj.colors.map(
      color => color.charAt(0).toUpperCase() + color.slice(1));
  } else {
    return subObj['size'].toUpperCase();
  }
});

console.log(sizeAndColors);

// Problem 15
arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

newArr = arr.filter(obj => {
  return Object.values(obj).every(subArr => {
    return subArr.every(val => val % 2 === 0);
  });
});

console.log(newArr);

// Problem 16
arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
// return an object:
// key = subarr[0] val = subArr[1]
obj = arr.reduce((acc, val) => {
  return {...acc,  [val[0]]: val[1]};
}, {});

console.log(obj);

// Problem 17

//returns 32 hexadecimal chars represented as a string.
// 8 - 4 - 4 - 12 pattern (5 sections)
function generateUUID() {
  let chars = ['0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let sections = [8, 4, 4, 4, 12];

  let uuid = '';
  sections.forEach((section, index) => {
    for (let i = 0; i < section; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      uuid += chars[randomIndex];
    }
    if (index < sections.length - 1) {
      uuid += '-';
    }
  });
  return uuid;
}
let hex = generateUUID();
console.log(hex);

let todoLists = [
  {
    id: 1,
    listName: 'Groceries',
    todos: [
      { id: 1, name: 'Bread', completed: false },
      { id: 2, name: 'Milk', completed: false },
      { id: 3, name: 'Apple Juice', completed: false }
    ]
  }
];
todoLists[0]["todos"][2].name = 'Orange Juice';
console.log(todoLists[0]['todos'][2]);

function evenValues(array) {
  let evens = [];
  array.forEach((value, index) => {
    console.log('value', value, 'at', index);
    if (value % 2 === 0) {
      evens.push(value);
    }
    console.log('removing', array.shift());

  });

  return evens;
}

console.log(evenValues([1, 3, 4, 2, 4, 6, 5, 7, 9, 10, 12]));
