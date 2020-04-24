(function() {
  console.log("Sometimes, syntax isn't intuitive!");
})();


var sum = 0;
sum += 10;
sum += 31;

let numbers = [1, 7, -3, 3];

sum += (function(arr) {
  return arr.reduce((sum, number) => {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum);  // ?


(function(number) {
    for (let i = number; i >= 0; i--) {
      console.log(i);
    }
  })(7);


let bar = (function(start) {
    let prod = start;
    return function (factor) {
      prod *= factor;
      return prod;
    };
  })(2);

  let result = bar(3);
  result += bar(4);
  result += bar(5);
  console.log(result);


(function countdown(num) {
  console.log(num);
  if (num !== 0) countdown(num - 1);
})(5);



