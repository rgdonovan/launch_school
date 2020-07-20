// 1000 lights;
function lightsOn(n) {
  let switches = [];
  for (let i = 0; i < n; i++) {
    switches.push(false);
  }

  for (let i =1; i <= n; i++) {
    let toggleEach = i;
    for (let toggle = 0; toggle <= n; toggle += toggleEach) {
      switches[toggle] = !switches[toggle];
    }
  }

  return switches.map((val, index) => {
    return val === true ? index : val;
  }).filter(val => val !== false);
}

console.log(lightsOn(100));
// split the diamond into 2 triangles.
// triangle 2 will be 1n shorter than the 1st.

// print space.repeat(spaceAmt) *.repeat(starAmt) space.repeat(spaceAmt);
// reduce space by 1, increase star by 2.
// do this until space amt === 0.

// print spaceAmt = 1, star = line - 2.
// space + 1, star - 2 till star === 1.


function diamond(n) {
  let spaceAmt = (n - 1) / 2;
  let starAmt = 1;

  while (spaceAmt >= 0) {
    console.log(' '.repeat(spaceAmt) + '*'.repeat(starAmt) + ' '.repeat(spaceAmt));
    spaceAmt--;
    starAmt += 2;
  }
  spaceAmt = 1;
  starAmt = n - (spaceAmt * 2);

  while (starAmt > 0) {
    console.log(' '.repeat(spaceAmt) + '*'.repeat(starAmt) + ' '.repeat(spaceAmt));
    spaceAmt++;
    starAmt -= 2;
  }
}

diamond(5);



function numberSequence(n) {
  let result = [];
  let increment = 2;
  let number = 1;

  while (number > 0) {
    result.push(number);

    if (number === n) {
      increment = -2;
    }

    number += increment;
  }
  return result;
}

numberSequence(5);


// ABCs

// for each subArray
// does the string include both chars?
// if yes, return false.


function isBlockWord(word) {
  let blocks = [['B', 'O'], ['X', 'K'], ['D', 'Q'], ['C', 'P'],
  ['N', 'A'], ['G', 'T'], ['R', 'E'], ['F', 'S'], ['J', 'W'], ['H', 'U'],
  ['V', 'I'], ['L', 'Y'], ['Z', 'M']];
  word = word.toUpperCase();

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    let [char1, char2] = block;

    if (word.includes(char1) && word.includes(char2)) {
      return false;
    }
  }

  return true;
}

console.log(isBlockWord('jest'));


function isBlockWord2(word) {
  let blocks = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];
  let letters = word.split('');

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];

    let matchingBlock = blocks.filter(block => block.indexOf(letter.toUpperCase()) > -1)[0];

    if (matchingBlock === undefined) {
      return false;
    } else {
      blocks.splice(blocks.indexOf(matchingBlock), 1);
    }
  }
  return true;
}
console.log(isBlockWord2('jest'));

// we declare the block pairs as strings in an array.
// we split the word into an array of letters.

// loop through the letters array.
// at each letter, filter the blocks array.
//    filter only the strings that include the letter in the outer loop.
//      do this by using.indexOf(letter) > -1. String.prototype.indexOf finds the first instance of a substring.
//    assign element 0 of this filtered array to variable 'matching block'. (so it's a string).
//    if (matchingBlock ==== undefined), no match was found. return false.
//    else, splice this element from the array. blocks.splice(blocks.indexOf(matchingBlock), 1).


// Caesar Cipher
// input: string, shift amount
// output: shifted string

// case sensitive
// account for spaces, punctuation

// shift word
// shift all words.

// have a corresponding number for each letter of the alphabet
// declare results string ''
// loop through each letter.
// if not a-z /i, push to string.
// if caps, isCaps === true. swap to lower case.
// get the number of the letter.
//    shift it the according amount.
//    if the number > 26, -= 26 until in range.
// let newLetter =  isCaps ? alphabet[number].toUpperCase() : alphabet[n]

function encryptWord(word, shift) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let encryptedWord = '';

  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    let isUpperCase = (char === char.toUpperCase());
    char = char.toLowerCase();

    if (alphabet.indexOf(char) === -1) {
      encryptedWord += char;
      continue;
    }

    char = alphabet.indexOf(char) + shift;
    while (char >= 26) {
      char -= 26;
    }

    encryptedWord += isUpperCase ?
      alphabet[char].toUpperCase() : alphabet[char];
  }
  return encryptedWord;
}

function caesarEncrypt(string, shift) {
  let results = [];
  let words = string.split(' ');
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    results.push(encryptWord(word, shift));
  }
  return results.join(' ');
}

console.log(caesarEncrypt('Please just work? -_-', 3));
