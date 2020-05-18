// Uppercase Check
function isUppercase(string) {
  let upperCaseString = string.toUpperCase();

  return string === upperCaseString;
}

console.log(isUppercase('Hi'));


// Delete Vowels
function removeVowels(array) {
  return array.map(string => {
    return string.replace(/[aeiou]/gi, '');
  });
}

console.log(removeVowels(['Abcdefghijklmnopqrstuvwxyz']));


// Lettercase Counter

// input: string
// output: object w/ 3 properties: lowercasechars, uppercase chars, special chars.
// for each char, filter
function letterCaseCount(string) {
  let lowerChars = string.match(/[a-z]/g) || [];
  let upperChars =  string.match(/[A-Z]/g) || [];
  let neitherChars = string.match(/[^a-z]/gi) || [];

  return {
    lowercase: lowerChars.length,
    uppercase: upperChars.length,
    neither: neitherChars.length

  };
}

console.log(letterCaseCount(''));

// capitalize words
// split string into array of words
// replace element w/ first letter caps + substring.
// join back into string

function wordCap(string) {
  return string.split(' ').map(word => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

console.log(wordCap('four score "and" seven'));


// swap case
// for each letter in string:
// if lowercase, caps. else lowercase.

function swapCase(string) {
  return string.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}

console.log(swapCase('CamelCase'));

// Staggered Caps (pt 1)
function staggeredCaps(string) {
  return string.split('').map((char, index) => {
    if (index % 2 === 0) return char.toUpperCase();
    return char.toLowerCase();
  }).join('');
}

console.log(staggeredCaps('hello there'));


// Staggered Caps (pt 2)
function staggeredCaps2(string) {
  let needUpper = true;
  return string.split('').map((char) => {
    if (char.match(/[a-z]/gi)) {
      let newChar = needUpper ? char.toUpperCase() : char.toLowerCase();
      needUpper = !needUpper;
      return newChar;
    } else {
      return char;
    }
  }).join('');
}
console.log(staggeredCaps2('hello 666 there'));


// how long are you?
// input: string, only separated by spaces
// output: array of strings

// for each element, find its length
// concatenate it to the end
// return a new array

function wordLengths(string) {
  if (arguments.length === 0) console.log('no args here');
  if (!string) return [];
  return string.split(' ').map(word => `${word} ${word.length}`);
}

console.log(wordLengths());

// NOTE!! arrow functions don't have access to the arguments object.


// Search Word (Pt 1)
// input: word, string of text.
// output: int representing the number of times the word appears in the text.

function searchWord(word, text) {
  return text.toLowerCase().split(' ').filter(words => words === word.toLowerCase()).length;
}

const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

console.log(searchWord('', text));
