let obj = {
  foo: "foo",
  bar: "bar",
  qux: 42,
};
let foo;
let bar;
let qux;

({foo, qux, bar} = obj);

console.log(foo, bar, qux);

function xyz({foo, bar, qux}) {
  console.log(foo, bar, qux);
}

xyz(obj);

let arr = [1, 2, 3];
let [first, , third] = arr;

console.log(first, third);

[first, third] = [third, first];
console.log(first, third);

arr = [1, 2, 3, 4];
[first, ...third] = arr;
console.log(first, third);


function addThree(arg1, arg2, arg3) {
  return arg1 + arg2 + arg3;
}

console.log(addThree(...arr));

let arrCopy = [...arr];
let longArr = [...arr, ...arr];
let arrMix = [...arr, ...[2, 2, 2], ...arr];

console.log(arrCopy);
console.log(longArr);
console.log(arrMix);

let objCopy = {...obj};
console.log(objCopy);

let dogObj = {name: 'doggo'};
let mergedObj = {...dogObj, ...obj};

console.log(mergedObj);

foo = {a: 1, b:2, c:3, d:4};
let {a, ...rest} = foo;
console.log(a, rest);

function maxItem() {
  let maximum = arguments[0];
  [].forEach.call(arguments, value => {
    if (value > maximum) {
      maximum = value;
    }
  });
  return maximum;
}

console.log(maxItem(2, 6, 10, 4));

function maxItem2(first, ...args) {
  let maximum = first;

  args.forEach(value => {
    if (value > maximum) {
      maximum = value;
    }
  });

  return maximum;
}

console.log(maxItem(2, 6, 10, 4));


function cat() {
  let animalType = "cat";
  let age = 9;
  let colors = ["black", "white"];
  return {
    type: animalType,
    age,
    colors,
  };
}

let { type, age, colors } = cat();
console.log(type);    // cat
console.log(age);     // 9
console.log(colors);  // [ 'black', 'white' ]


function fiveArgs(first, mid1, mid2, mid3, last) {
  return {
    first,
    last,
    middle: [mid1, mid2, mid3].sort(),
  };
}