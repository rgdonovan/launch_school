
function encode(string) {
  let encodedStr = ''
  let count = 1;

  for (let idx = 0; idx < string.length; idx++) {
    let currentChar = string[idx];
    let nextChar = string[idx + 1];

    if (nextChar === currentChar) {
      count++;
    } else {
      encodedStr += (count === 1) ? `${currentChar}` : `${count}${currentChar}`
      count = 1;
    }
  }
  return encodedStr;
}


function decode(string) {
  function isDigit(char) {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char);
  }
  let decodedStr = '';
  let compressionCount = '';

  for (let idx = 0; idx < string.length; idx++) {
    let currentChar = string[idx];

    if (isDigit(currentChar)) {
      compressionCount += currentChar;
    } else {
      if (!compressionCount) {
        decodedStr += currentChar;
      } else {
        decodedStr += currentChar.repeat(Number(compressionCount));
        compressionCount = '';
      }
    }
  }
  return decodedStr;
}
module.exports = {encode, decode};
