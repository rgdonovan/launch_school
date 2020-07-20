/*
Our forEach method only cares about ITERATING;
It doesn't care about what we do w/ each element.

Generic iteration functions let method callers pass in
a callback function that takes care of the specific
details of the iteration.

All our funciton has to do is invoke the callback
function w/the expected arguments
(in this case, the array element)
*/


function forEach(array, func, thisArg) {
  for (let index = 0; index < array.length; index++) {
    func.call(thisArg, array[index], index, array);
  }
}

forEach([1, 2, 3], (val, idx, arr) => console.log(`idx: ${idx} val:${val} array: ${arr}`));


function filter(array, func, thisArg) {
  let filteredArr = [];

  for (let index = 0; index < array.length; index++) {
    let value = array[index];
    if (func.call(thisArg, value, index, array)) {
      filteredArr.push(value);
    }
  }

  return filteredArr;
}

console.log(filter([1, 2, 15, 7], val => val > 5));


function map(array, func, thisArg) {
  let mappedArr = [];

  for (let index = 0; index < array.length; index++) {
    let value = array[index];
    mappedArr.push(func.call(thisArg, value, index, array));
  }

  return mappedArr;
}

console.log(map([1, 2, 3], (val, idx) => val * idx));


[1, 2, 3].reduce((acc, val) => acc + val)

function reduce(array, func, acc) {
  let index = (acc) ? 0 : 1;
  acc = (acc) ? acc : array[0];

  for (index; index < array.length; index++) {
    let val = array[index];

    acc = func(acc, val);
  }
  return acc;
}

let sum = reduce([1, 2, 5], (acc, val) => {
  return {...acc, [val]: 'hello'};
}, {});

console.log(sum);


let nums = [1, 2, 3, 4, 5, 6, 7, 8];


function filterReduce(array, callback) {
  return array.reduce((filteredItems, value) => {
    if (callback(value)) {
      filteredItems.push(value);
    }
    return filteredItems;
  }, []);
}

function mapReduce(array, callback) {
  return array.reduce((mappedItems, value) => {
    let mappedVal = callback(value);
    return [...mappedItems, mappedVal];
  }, []);
}

console.log(mapReduce([1, 2, 3], val => val * 5));


function objForEach(obj, callback) {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      callback(property, [obj[property]]);
    }
  }
}

let obj = { foo: 1, bar: 2, qux: 3 };
objForEach(obj, (property, value) => {
  console.log(`the value of ${property} is ${value}`);
});