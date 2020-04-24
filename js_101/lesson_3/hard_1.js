// Question 1
let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);

// Question 4
function isAnIpNumber(string) {
  return Number(string) >= 0 && Number(string) <= 255;
}

function isDotSeparatedIpAddress(inputString) {
  let separatedWords = inputString.split(".");

  if (separatedWords.length !== 4) {
    return false;
  }

  while (separatedWords.length > 0) {
    let word = separatedWords.pop();

    if (!isAnIpNumber(word)) {
      return false;
    }
  }

  return true;
}
console.log(isDotSeparatedIpAddress("4.5.5.211"));
