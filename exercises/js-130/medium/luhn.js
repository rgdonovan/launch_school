function doubleLuhnDigit(digit) {
  return (digit * 2 > 9) ? ((digit * 2) - 9) : digit * 2;
}

class Luhn {
  constructor(string) {
    this.string = string;
  }

  valid() {
    let numbers = this.string.replace(/[ ]/g, '');
    if (numbers === '0' || numbers.length < 1 || numbers.match(/\D/) !== null) {
      return false;
    }

    numbers = numbers.split('').reverse().map((digit, idx) => {
      digit = Number(digit);
      return idx % 2 !== 0 ? doubleLuhnDigit(digit) : digit;
    });

    let sum = numbers.reduce((acc, val) => acc + val);
    return sum % 10 === 0;
  }
}


module.exports = Luhn;