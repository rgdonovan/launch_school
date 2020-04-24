const READLINE = require('readline-sync');

do {
  runGame();
} while (playAgain());

function playAgain() {
  prompt('would you like to do another calculation?');
  do {
    let response = READLINE.question().toLowerCase();
    if (['y', '1'].includes(response[0])) {
      return true;
    } else if (['n', '0'].includes(response[0])) {
      return false;
    } else {
      prompt("I'm afraid that was invalid input. Please enter 'yes' or 'no'");
    }
  } while (true);
}

function runGame() {
  console.clear();
  displayWelcomeMessage();

  let loanAmount = getLoanAmount();
  let apr = getAPR();
  let months = getNumMonths();

  printMonthlyAmount(loanAmount, apr, months);
}

function displayWelcomeMessage() {
  prompt('Welcome to the car loan calculator!');
}

function getLoanAmount() {
  let loan = cleanInput(getInput('How much is the loan?'));
  while (isInvalidNum(loan)) {
    loan = cleanInput(getInput('Please input a valid amount'));
  }
  return Number(loan);
}

function getAPR() {
  let apr = cleanInput(getInput('What is the annual percentage rate? For example "5%", ".05"'));
  while (isInvalidNum(apr)) {
    apr = cleanInput(getInput('Please input a valid amount. For example "5%" or "0.05"'));
  }
  apr = Number(apr);
  return getInterestRate(apr);
}

function getNumMonths() {
  let numMonths = cleanInput(getInput('What is the loan duration in months?'));
  while (isInvalidNum(numMonths)) {
    numMonths = cleanInput(getInput('Please input a valid number of months'));
  }
  return Number(numMonths);
}

function printMonthlyAmount(loan, apr, numMonths) {
  let monthlyInterest = apr / 12;
  let monthlyPayment =
    loan * (monthlyInterest /
      (1 - Math.pow((1 + monthlyInterest),(-numMonths))));
    console.log(`The monthly payment will amount to $${monthlyPayment.toFixed(2)}`);
}

function getInput(message) {
  return READLINE.question(prompt(message));
}

function cleanInput(input) {
  return input.replace(/[$,% months]/g, '');
}

function isInvalidNum(input) {
  return Number.isNaN(Number(input)) || Number(input) <= 0;
}

function getInterestRate(apr) {
  return apr >= 1 ? apr / 100 : apr;
}

function prompt(message) {
  console.log(`=> ${message}`);
}