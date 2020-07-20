class DivideByZeroError extends Error {};

function div(first, second) {
  if (second === 0) {
    throw new DivideByZeroError("Dividing by zero!");
  }

  return first / second;
}


function divideOneBy(divisor) {
  if (divisor !== 0) {
    let result = div(1, divisor);
    console.log(result);
  } else {
    console.log('divide by 0 ignored!');
  }
}

divideOneBy(1);
divideOneBy(0);

