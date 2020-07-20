function primes(limit) {
  let primes = [];
  let markedNums = [];
  let number = 2;

  while (number <= limit) {
    if (!markedNums.includes(number)) {
      primes.push(number);

      for (let multiple = number; multiple <= limit; multiple += number) {
        markedNums.push(multiple);
      }
    }
    number++;
  }

  return primes;
}

console.log(primes(13));

function primes2(limit) {
  let range = [...Array(limit - 1).keys()].map(number => number + 2);
  
  range.forEach(number => {
    if (number === 0) return;
    setMultiplesToZero(number, range, limit);
  });

  return range.filter(number => number !== 0);
}


function setMultiplesToZero(number, range, limit) {
  let multiplier = 2;
  let multiple = number * multiplier;

  while (multiple <= limit) {
    if (range.indexOf(multiple) !== -1) {
      range[range.indexOf(multiple)] = 0;
    }

    multiplier++;
    multiple = number * multiplier;
  }
  return range;
}

console.log(primes2(13));