const READLINE = require('readline-sync');
const MATCH_POINT = 5;
const DEALER_MINIMUM = 17;
const MAX_SCORE = 21;
const CARD_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  jack: 10,
  queen: 10,
  king: 10,
  ace: 'ace'
};

function prompt(message) {
  return console.log(`=> ${message}`);
}

function getInput(message) {
  return READLINE.question(prompt(message));
}

function joinAnd(array) {
  switch (array.length) {
    case 1:
      return array.join('');
    case 2:
      return array.join(' and ');
    default:
      return `${array.slice(0, array.length - 1).join(', ')}, and ${array[array.length - 1]}`;
  }
}

function shuffle(deck) {
  for (let first = deck.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * first);
    [deck[first], deck[second]] = [deck[second], deck[first]];
  }
  return deck;
}

function initializeDeck() {
  let suits = ['hearts', 'spades', 'diamonds', 'clubs'];
  let cards = Object.keys(CARD_VALUES);

  let deck = [];
  for (let suit = 0; suit < suits.length; suit++) {
    cards.forEach(card => deck.push(`${card} of ${suits[suit]}`));
  }

  return shuffle(deck);
}

function dealCard(hand, deck) {
  return hand.push(deck.pop());
}

function dealStartingHands(playerHand, dealerHand, deck) {
  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());
}

function total(hand) {
  let cardValues = hand.map(card => CARD_VALUES[card.split(' ')[0]]);
  let sum = cardValues.reduce((acc, val) => {
    return (val === 'ace') ? acc : acc + val;
  }, 0);

  let aces = cardValues.filter(card => card === 'ace');
  sum += (aces.length * 11);
  aces.forEach(_ => {
    if (sum > 21) {
      sum -= 10;
    }
  });

  return sum;
}

function displayHand(hand, playerName, handTotal) {
  prompt(`${playerName} has: ${joinAnd(hand)} (total of ${handTotal}).`);
}

function displayHands(playerHand, dealerHand,
  playerTotal, dealerTotal, dealerHadTurn = false) {
  if (dealerHadTurn === false) {
    let cardValue = total(dealerHand[0].split());
    prompt(`Dealer has: ${dealerHand[0]}, and an unknown card (known total of ${cardValue}).`);
  } else {
    displayHand(dealerHand, 'Dealer', dealerTotal);
  }

  displayHand(playerHand, 'Player', playerTotal);
}

function isBust(total) {
  return total > MAX_SCORE;
}

function getPlayerChoice() {
  let choice = getInput(`Anything over ${MAX_SCORE} is bust! do you want to (h)it or (s)tay?`).trim().toLowerCase();

  while (!['h', 's'].includes(choice[0])) {
    choice = getInput('Sorry, your input was invalid. please input (h)it or (s)tay.').trim().toLowerCase();
  }

  return choice[0];
}

function hitPlayer(playerHand, deck) {
  prompt('You chose to hit!');
  dealCard(playerHand, deck);
}

function playerChooses(playerHand, dealerHand, deck, playerTotal, dealerTotal) {
  while (!isBust(playerTotal)) {
    let choice = getPlayerChoice();

    if (choice === 's') {
      break;
    } else if (choice === 'h') {
      hitPlayer(playerHand, deck);

      playerTotal = total(playerHand);
      displayHands(playerHand, dealerHand, playerTotal, dealerTotal);
    }
  }
}

function playerTurn(playerHand, dealerHand, deck, playerTotal, dealerTotal) {
  displayHands(playerHand, dealerHand, playerTotal, dealerTotal);
  playerChooses(playerHand, dealerHand, deck, playerTotal, dealerTotal);
}

function hitDealer(dealerTotal, dealerHand, deck) {
  while (dealerTotal < DEALER_MINIMUM) {
    prompt('Dealer chooses to hit!');

    dealCard(dealerHand, deck);
    dealerTotal = total(dealerHand);
    displayHand(dealerHand, 'Dealer', dealerTotal);
  }
}

function dealerChoice(dealerHand, deck, dealerTotal) {
  hitDealer(dealerTotal, dealerHand, deck);

  dealerTotal = total(dealerHand);
  if (!isBust(dealerTotal)) {
    prompt('Dealer chooses to stay.');
  }
}

function dealerTurn(dealerHand, deck, playerTotal, dealerTotal) {
  clearScreen();
  if (isBust(playerTotal)) return;

  prompt('You chose to stay!');
  prompt(`Dealer flips their second card... its ${dealerHand[1]}. Their sum is ${dealerTotal}.`);
  dealerChoice(dealerHand, deck, dealerTotal);
}

function updateScore(winner, score) {
  if (['DEALER_BUST', 'PLAYER_WIN'].includes(winner)) {
    score['player'] += 1;
  } else if (['PLAYER_BUST', 'DEALER_WIN'].includes(winner)) {
    score['dealer'] += 1;
  }

}

function returnWinner(playerTotal, dealerTotal) {
  if (playerTotal > MAX_SCORE) {
    return 'PLAYER_BUST';
  } else if (dealerTotal > MAX_SCORE) {
    return 'DEALER_BUST';
  } else if (playerTotal > dealerTotal) {
    return 'PLAYER_WIN';
  } else if (dealerTotal > playerTotal) {
    return 'DEALER_WIN';
  } else {
    return 'TIE';
  }
}

function winMessage(winner) {
  switch (winner) {
    case 'PLAYER_BUST':
      prompt('You went bust! You lose the round :(');
      break;
    case 'DEALER_BUST':
      prompt('Dealer went bust! You win the round!');
      break;
    case 'PLAYER_WIN':
      prompt('Player wins the round!');
      break;
    case 'DEALER_WIN':
      prompt('Dealer wins the round!');
      break;
    default:
      prompt("It's a tie!");
      break;
  }
}

function displayWinner
  (winner, playerHand, dealerHand, playerTotal, dealerTotal) {
  if (winner !== 'DEALER_BUST') {
    let dealerHadTurn = (winner !== 'PLAYER_BUST');
    displayHands(playerHand, dealerHand,
      playerTotal, dealerTotal, dealerHadTurn);
  }

  winMessage(winner);
}

function playRound(score) {
  let deck = initializeDeck();
  let dealerHand = [];
  let playerHand = [];

  clearScreen();

  dealStartingHands(playerHand, dealerHand, deck);
  let playerTotal = total(playerHand);
  let dealerTotal = total(dealerHand);

  playerTurn(playerHand, dealerHand, deck, playerTotal, dealerTotal);
  playerTotal = total(playerHand);

  dealerTurn(dealerHand, deck, playerTotal, dealerTotal);
  dealerTotal = total(dealerHand);

  let winner = returnWinner(playerTotal, dealerTotal);
  updateScore(winner, score);
  displayWinner(winner, playerHand, dealerHand, playerTotal, dealerTotal);
}

function displayScore(score) {
  prompt(`The score is Player: ${score['player']}, Dealer: ${score['dealer']}`);
}

function nextRoundPrompt() {
  getInput('Press enter to begin the next round');
}

function matchWinner(score) {
  if (score['player'] === MATCH_POINT) return 'Player';
  if (score['dealer'] === MATCH_POINT) return 'Dealer';

  return null;
}

function playMatch() {
  let score = {
    player: 0,
    dealer: 0
  };

  do {
    playRound(score);

    if (!matchWinner(score)) {
      displayScore(score);
      nextRoundPrompt();
    }

  } while (!matchWinner(score));

  prompt(`${matchWinner(score)} wins the match!`);
}

function clearScreen() {
  console.clear();
}

function welcomePrompt() {
  prompt(`Welcome to Twenty-One! Try to get a higher score than the dealer, but if you go over ${MAX_SCORE}, you'll lose.`);
  getInput(`We'll play to best of ${MATCH_POINT} matches! Press enter to begin.`);
}

function playAgain() {
  console.log('');
  let playAgain = getInput('Do you want to play another match? (y)es or (n)o.').toLowerCase().trim();
  if (!playAgain) playAgain = 'error';

  while (!['y', 'n'].includes(playAgain[0].toLowerCase())) {
    playAgain = getInput("Sorry, but your input was invalid. Please enter (y)es or (n)o.");
    if (!playAgain) playAgain = 'error';
  }

  return playAgain[0].toLowerCase() === 'y';
}

function playGame() {
  clearScreen();
  welcomePrompt();

  do {
    playMatch();
  } while (playAgain());

  clearScreen();
  prompt('Thanks for playing!');
}

playGame();