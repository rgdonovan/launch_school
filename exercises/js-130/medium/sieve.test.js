function markNumbers(number, range, limit) {
  let multiplier = 2;
  let multiple = number * multiplier;
  // take our starting prime, and multiply it by the multiplier.
  while (multiple <= limit) {
    // while the multiple is less than or equal to our limit:
    if (range.indexOf(multiple) !== -1) {
      range[range.indexOf(multiple)] = 0;
      // if the multiple is found in our array, set it to 0.
    }
    multiplier ++;
    // add one to the multiplier. 3, 4, 5 etc.
    multiple = number * multiplier;
    // update the multiple. 2 * 3, 2 * 4, 2 * 5, etc. 
  }
  return range;
}

// basically, look at our starting number. 2. its a prime. 
// multiply it by 2. (its 4). find 4 in our array, set it to 0.
// update the multiplier (3). update the mutiple (2 * 3, its now 6.)
// find 6 in our array. if its there, set it to 0.
// update our multiplier (4). Update the multiple (2 * 4, its now 8). look for that, set to 0 if it exists.
// keep doing this till we reach our limit. 

//THEN. forEach look repeats. Look at the next number. is it 0? if it is, skip it. 
// if its not, do the thing. will happen for 3 (3 *2, 3*3, 3*4) and 5 (5*1, 5*2, 5*3). 

// once gone through the whole array, filter out the 0s. return it.

function primes(limit) {
  let range = [...Array(limit - 1).keys()].map(num => num + 2);
  // gets an array of all possible numbers, starting from 2
  range.forEach(number => {
    if (number === 0) return;
    // if the number is 0, skip and continue.
    markNumbers(number, range, limit);
    // otherwise, call markNumbers.
  });

  return range.filter(num => num !== 0);
  // filter out the 0s and return the array.
}

primes(13);