// MadLibs
let words = {
  noun: ['fox', 'dog', 'head', 'leg', 'tail', 'cat'],
  verb: ['jumps', 'lifts', 'bites', 'eats', 'pats'],
  adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry'],
  adverb: ['easily', 'lazily', 'noisily', 'excitedly']
};

function replaceWords(string, words) {
  let keywords = Object.keys(words);
  let sentence = string.split(' ');

  for (let i = 0; i < keywords.length; i++) {
    let word = keywords[i];

    for (let j = 0; j < sentence.length; j++) {
      let randomIdx = Math.floor(Math.random() * words[word].length);
      let regex = new RegExp('^' + word);
      sentence[j] = sentence[j].replace(regex, words[word][randomIdx]);
    }
  }
  return sentence.join(' ');
}

console.log(replaceWords('the noun adjective cat verb! adverb', words));


// Transpose matrix.
// input: Array of 3 sub-arrays, each length = 3.
// output: transposed array. Original is not mutated.

// for rows: 0, 1, 2 (can loop through directly)
// push element to corresponding spot; 
// row 0, element 0 to [0][0], [1][0], [2][0]
// row 1, element 0 to [0, 1], 1 to [1, 1], 2 to [2, 1];
// row 2, element 0 to [0][2], [1][2], [2][2]
function transpose(matrix) {
  let newMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatrix.push([]);
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      newMatrix[col].push(matrix[row][col]);
    }
  }

  return newMatrix;
}
const matrix = [
  [1, 1, 1, 1],
  [2, 2, 2, 2],
  [3, 3, 3, 3],
  [4, 4, 4, 4]
];

let newMatrix = transpose(matrix);

console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]


// Transpose Matrix Pt 2

// 

function transpose2(matrix) {
  let transposed = [];
  for (let row = 0; row < matrix[0].length; row++) {
    transposed.push([]);
    for (let column = 0; column < matrix.length; column++) {
      transposed[row].push(matrix[column][row]);
    }
  }
  return transposed;
}

console.log(transpose2([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]));