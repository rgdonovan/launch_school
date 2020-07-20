// Sum of Digits

function sum(num) {
  return num.toString().split('').reduce((acc, val) => acc + val);
}

console.log(sum(496));

// Alphabetical Numbers
// have a dictionary of number/words
// map an array of matching numWords. Sort that array. convert back.

function alphabeticNumberSort(array) {
  const numberWords = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven',
    8: 'eight',9 : 'nine', 10 : 'ten',11 : 'eleven', 12 : 'twelve', 13 : 'thirteen', 14 : 'fourteen',
    15 : 'fifteen', 16 : 'sixteen', 17 : 'seventeen', 18 : 'eighteen', 19 : 'nineteen'};

    return array.map(num => numberWords[num]).sort().map(word => {
    return Object.keys(numberWords).find(key => numberWords[key] === word);
  });
}

console.log(alphabeticNumberSort(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]));

let NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function wordSort(num1, num2) {
  if (NUMBER_WORDS[num1] > NUMBER_WORDS[num2]) {
    return 1;
  } else if (NUMBER_WORDS[1] < NUMBER_WORDS[2]) {
    return -1;
  } else {
    return 0;
  }
}

function alphabeticNumberSort2(array) {
  return array.sort((a, b) => {
    if (NUMBER_WORDS[a] > NUMBER_WORDS[b]) return 1;
    else if (NUMBER_WORDS[a] < NUMBER_WORDS[b]) return -1;
    else return 0;
  });
}

console.log(alphabeticNumberSort2(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]));


// Multiply All Pairs

// input: 2 arrays (no empty)
// output: array of all possible multiplications, sorted.
// for each element in array, multiply by each other element in other array. 
// map these values to new array, then sort it.

function multiplyAllPairs(arr1, arr2) {
  let array = [];

  for (let i = 0; i < arr1.length; i++) {
    arr2.forEach(val => array.push(val * arr1[i]));
  }

  return array.sort((a, b) => a - b);
}

console.log(multiplyAllPairs([2, 5, 8], [10, 2]));

// Leading Substrings
// input: string
// output: array
// split string into array
// for each element(char)
// return a joined string of all the chars up to that index
function substringsAtStart(string) {
  return string.split('').map((_, idx, array) => array.slice(0, idx + 1).join(''));
}

console.log(substringsAtStart('eieioh'));

// All substrings
// input: string
// output: array

// loop through each element.
// make a slice of it and each following element
// once at the end of the array, repeat, with the next value.

function substrings(string) {
  let results = [];
  let array = string.split('');

  for (let firstChar = 0; firstChar < array.length; firstChar++) {
    for (let lastChar = firstChar + 1; lastChar <= array.length; lastChar++) {
      results.push(array.slice(firstChar, lastChar));
    }
  }
  return results;
}

function allSubStrings(string) {
  let results = [];

  for (let char = 0; char < string.length; char++) {
    results.push(...substringsAtStart(string.slice(char)));
  }

  return results;
}

console.log(allSubStrings('abcde'));

// Palindromic Substrings
// input: string
// output: array

// going through the string, create substrings of every possible combination.
// if that string, made to an array & reversed, is the same as the forward vers, its a pallindrome
// push to a results array
// return the results array

function palindromes(string) {
  let results = [];

  for (let i = 0; i < string.length; i++) {
    for (let j = i + 1; j < string.length + 1; j++) {
      let word = string.slice(i, j);
      if (word.split('').reverse().join('') === word && word.length > 1) {
        results.push(word);
      }
    }
  }
  return results;
}

console.log(palindromes('aha'));


// sum of sums
// input: array
// output: number

// loop through the array, creating a new substring each time.
// sum the elements in that array, push the result to a results array
// sum the results array.
function sumOfSums(array) {
  let sum = 0;
  for (let i = 1; i < array.length + 1; i++) {
    sum += array.slice(0, i).reduce((acc, val) => acc + val);

  }
  return sum;
}
console.log(sumOfSums([1, 5, 7, 3]));


// grocery list
// input: nested array
// output: array

// take a nested array [item, number]
// for each element[1], look at the number,
// push element[0] to the results array for each time it appears

function buyFruit(array) {
  let results = [];
  array.forEach(nestedArray => {
    let count = nestedArray[1];
    while (count > 0) {
      results.push(nestedArray[0]);
      count--;
    }
  });
  return results;
}

console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]));

// input: inventoryItem (num), transactions (array of obj).
// output: array containing only the transactions for the specified item

// for transaction obj
// filter array
// if obj.id === inventoryItem


function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(obj => obj.id === inventoryItem);
}

// item available pt 2

function isItemAvailable(inventoryItem, transactions) {
  let itemList = transactionsFor(inventoryItem, transactions);
  return itemList.reduce((acc, val) => {
    if (val['movement'] === 'in') {
      return acc + val['quantity'];
    } else {
      return acc - val['quantity'];
    }
  }, 0) > 0;
}

let transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                     { id: 105, movement: 'in',  quantity: 10 },
                     { id: 102, movement: 'out', quantity: 17 },
                     { id: 101, movement: 'in',  quantity: 12 },
                     { id: 103, movement: 'out', quantity: 20 },
                     { id: 102, movement: 'out', quantity: 15 },
                     { id: 105, movement: 'in',  quantity: 25 },
                     { id: 101, movement: 'out', quantity: 18 },
                     { id: 102, movement: 'in',  quantity: 22 },
                     { id: 103, movement: 'out', quantity: 15 }, ];

console.log(isItemAvailable(105, transactions));

console.log(!!{});