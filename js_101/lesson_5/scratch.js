let array = [5, 3, 6, 2, 7, 1];

array.sort((a, b) => a - b);
console.log(array);

array = [2, 11, 9, 4, 107, 21, 1];

// array.sort((a, b) => a - b);
let a = array.slice().sort((a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});

//array.sort((a, b) => b - a);
let b = array.slice().sort((a, b) => {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 0;
  }
});
// a to b kurabete kotaega negative nara b ga mae iku. positive nara ushiro iku.
// b - a, a - b, mata hokano kurabekata wo tsukattemo, sono kotae no n/p de b no suuji wo ugokasu.

// a starts at array[1]. b starts at array[0].
// if a value is negative, arg1 will go before arg2.
// if a value is positive, arg2 will go before arg1.
// you can think of the <- -> movement direction as correlating with the pos/neg result.
console.log(`array a = [${a}]\narray b = [${b}]`);

let words = ['go', 'ahead', 'and', 'jump'];
words.sort((a, b) => a.length - b.length);
console.log(words);

let scores = [[3, 6, 4], [6, 8, 9], [1, 4, 2]];
scores.sort((a, b) => {
  a = a.reduce((acc, val) => acc + val);
  b = b.reduce((acc, val) => acc + val);
  return a - b;
});

console.log(scores);

let objectArray = [{ a: 'ant' }, { b: 'bear' }];
let cat = {c : 'cat'};
objectArray.push(cat);

let serialized = JSON.stringify(objectArray);
serialized = JSON.parse(serialized);
cat.d = 'dog';
console.log(serialized);

let long = [{ a: 'ant', b: 'elephant' }, { c: 'cat', d: 'dog' }].filter(object => {
  return Object.keys(object).some(key => object[key][0] === key);
});

console.log(long);

// greater than 13, greater length than 6.
let idk = [[8, 13, 27], ['apple', 'banana', 'cantaloupe']].map(arr => {
  return arr.filter(val => {
    if (typeof val === 'number') {
      return val > 13;
    } else {
      return val.length > 6;
    }
  });
});

console.log(idk);

let why = [[[1], [2], [3], [4]], [['a'], ['b'], ['c']]].map(element1 => {
  return element1.map(element2 => {
    return element2.filter(element3 => {
      return element3.length > 0;
    });
  });
});
console.log(why);

// study group s hd