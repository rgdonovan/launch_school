const READLINE = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
const WIN_SCORE = 5;
const WIN_CONDITIONS = {
  rock : ['scissors', 'lizard'],
  paper : ['rock', 'spock'],
  scissors : ['paper', 'lizard'],
  lizard : ['spock', 'paper'],
  spock : ['rock', 'scissors']
};

do {
  runGame();
} while (playAgain());

function playAgain() {
  let response = getInputLowerCase('Would you like to play again?');

  while (response[0] !== 'n' && response[0] !== 'y') {
    response = getInputLowerCase('Please enter "y" or "n".');
  }
  if (response[0] === 'y') {
    return true;
  } else {
    prompt('Thanks for playing!');
    return false;
  }
}

function runGame() {
  let winCount = {
    user : 0,
    cpu : 0,
    tie : 0
  };
  let winner;

  console.clear();
  welcomeMessage();

  while (winCount['user'] < WIN_SCORE && winCount['cpu'] < WIN_SCORE) {
    let choice = getUserChoice();
    let cpuChoice = getCpuChoice();

    winner = determineWinner(choice, cpuChoice);
    winCount[winner] += 1;

    console.clear();
    printRoundWinner(choice, cpuChoice, winner);
    prompt(`the score is you: ${winCount['user']}, cpu: ${winCount['cpu']}`);
  }

  printMatchWinner(winner, winCount);
}

function getUserChoice() {
  let choice = getInputLowerCase(`choose one: ${VALID_CHOICES.join(', ')}. \nYou can just type the first letter or two if you're feeling lazy :)`);
  if (isAbbreviated(choice)) {
    choice = autoCompleteChoice(choice);
  }
  while (!isValidChoice(choice)) {
    choice = getInputLowerCase("That's not a valid choice");
    if (isAbbreviated(choice)) {
      choice = autoCompleteChoice(choice);
    }
  }
  return choice;
}

function autoCompleteChoice(choice) {
    VALID_CHOICES.forEach(word => {
      if (word.substring(0, choice.length) === choice) {
       choice = word;
      }
    });
  return choice;
}

function isAbbreviated(choice) {
  return choice.length > 0 && choice.length <= 2;
}
function isValidChoice(choice) {
  return VALID_CHOICES.includes(choice);
}

function getCpuChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let cpuChoice = VALID_CHOICES[randomIndex];

  return cpuChoice;
}

function determineWinner(choice, cpuChoice) {
  if (WIN_CONDITIONS[choice] && WIN_CONDITIONS[choice].includes(cpuChoice)) {
    return 'user';
  } else if (
    WIN_CONDITIONS[cpuChoice] && WIN_CONDITIONS[cpuChoice].includes(choice)) {
      return 'cpu';
  } else {
    return 'tie';
  }
}

function printRoundWinner(choice, cpuChoice, winner) {
  prompt(`You chose ${choice}, computer chose ${cpuChoice}.`);

  if (winner === 'user') {
    prompt(`You win this round!`);
  } else if (winner === 'cpu') {
    prompt('Computer wins this round :(');
  } else {
    prompt("It's a draw!");
  }
}

function printMatchWinner(winner, winCount) {
  let winMessage;
  if (winner === 'user') {
    winMessage = 'You win the match!!';
  } else {
    winMessage = 'Computer wins the match :(';
  }
  prompt(winMessage);
  prompt(`Final scores:\n you: ${winCount['user']} cpu: ${winCount['cpu']}`);
}

function getInputLowerCase(message) {
  return READLINE.question(prompt(`${message}`)).toLowerCase();
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function welcomeMessage() {
  prompt(`Welcome to Rock Paper Scissors Lizard Spock!\nFirst to ${WIN_SCORE} wins!`);
}
