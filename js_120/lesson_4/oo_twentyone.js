const readline = require('readline-sync');

class Rules {
  static MAX_SCORE = 21;
  static joinOr(array, symbol, word) {
    switch (array.length) {
      case 1:
        return array.join(' ');
      case 2:
        return array.join(` ${word} `);
      default:
        return array.slice(0, -1).join(`${symbol} `) + `${symbol} ${word} ` + array.slice(-1);
    }
  }
}

class Card {
  constructor(suit, face) {
    this.suit = suit;
    this.face = face;
  }

  toString() {
    return `${this.face} of ${this.suit}`;
  }

  faceValue() {
    switch (this.face) {
      case 'King':
      case 'Queen':
      case 'Jack':
        return 10;
      case 'Ace':
        return 'Ace';
      default:
        return Number(this.face);
    }
  }
}

class Deck {
  static SUITS = ['♥', '♦', '♣', '♠' ];
  static FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];

    for (let suit = 0; suit < Deck.SUITS.length; suit++) {
      for (let face = 0; face < Deck.FACES.length; face++) {
        this.cards.push(new Card(Deck.SUITS[suit], Deck.FACES[face]));
      }
    }
    return this.shuffle();
  }

  shuffle() {
    for (let idx = 0; idx < this.cards.length; idx++) {
      let deck = this.cards;
      let randomIdx = Math.floor(Math.random() * deck.length);
      [deck[idx], deck[randomIdx]] = [deck[randomIdx], deck[idx]];
    }

    return this;
  }

  dealCard() {
    return this.cards.pop();
  }
}

class Hand {
  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    return this;
  }

  dealCard(card) {
    this.cards.push(card);
  }

  sum() {
    let aceCount = 0;

    let total = this.cards.reduce((acc, card) => {
      let val = card.faceValue();

      if (val === 'Ace') {
        aceCount++;
        return acc;
      } else {
        return acc + val;
      }
    }, 0);

    for (let count = aceCount; count > 0; count--) {
      total += 11;

      if (total > Rules.MAX_SCORE) {
        total -= 10;
      }
    }

    return total;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
    this.sum = 0;
  }

  displayHand() {
    console.log(`${this.name} has: ${Rules.joinOr(this.hand.cards, ',', 'and')} (total value: ${this.sum})`);
  }

  updateSum() {
    this.sum = this.hand.sum();
  }

  isBust() {
    return this.sum > Rules.MAX_SCORE;
  }

  toString() {
    return this.name;
  }

  resetSum() {
    this.sum = 0;
  }
}

class Human extends Player {
  constructor() {
    super('Player');
  }

  chooseHitOrSay() {
    console.log('Do you want to (h)it or (s)tay?');
    let choice = readline.question().trim().toLowerCase();

    while (!['h', 's'].includes(choice[0])) {
      console.log('Sorry, you input was invalid. Do you want to (h)it or (s)tay?');
      choice = readline.question().trim().toLowerCase();
    }

    return choice[0];
  }
}

class Dealer extends Player {
  constructor(handMinimum) {
    super('Dealer');
    this.handMinimum = handMinimum;
  }

  displayStartingHand() {
    let cardValue = this.hand.cards[0].faceValue() === 'Ace' ? 11 : this.hand.cards[0].faceValue();
    console.log(`${this.name} has: ${this.hand.cards[0]} and an unknown card (known total value: ${cardValue})`);
  }

  minScoreReached() {
    return this.sum >= this.handMinimum;
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.human = new Human();
    this.dealer = new Dealer(17);
    this.rules = new Rules();
  }

  play() {
    this.welcomeAndClear();

    do {
      this.resetGame();

      this.human.displayHand();
      this.dealer.displayStartingHand();

      this.humanTurn();
      if (!this.human.isBust()) {
        this.dealerTurn();
      }

      this.displayResults();
    } while (this.playAgain());

    this.goodbyeMessage();
  }

  welcomeAndClear() {
    console.clear();
    console.log('Welcome to Twenty-One!\n');
    console.log(`The player with the highest score wins, but if you go over ${Rules.MAX_SCORE}, you lose!`);
    console.log('Press enter to begin!');
    readline.question();
    console.clear();
  }

  goodbyeMessage() {
    console.log('Thanks for playing Twenty-One! Goodbye!');
  }

  resetGame() {
    this.deck.reset();
    this.resetHands();
    this.resetPlayerSums();

    this.dealStartingHands();
    this.updateSums();
  }

  resetHands() {
    this.human.hand.reset();
    this.dealer.hand.reset();
  }

  resetPlayerSums() {
    this.human.resetSum();
    this.dealer.resetSum();
  }

  dealStartingHands() {
    this.dealCardTo(this.human);
    this.dealCardTo(this.human);

    this.dealCardTo(this.dealer);
    this.dealCardTo(this.dealer);
  }

  dealCardTo(player) {
    let card = this.deck.dealCard();
    player.hand.dealCard(card);
  }

  updateSums() {
    this.human.updateSum();
    this.dealer.updateSum();
  }

  hitPlayer(player) {
    this.dealCardTo(player);

    player.updateSum();
    player.displayHand();
  }

  humanTurn() {
    while (!this.human.isBust()) {
      let choice = this.human.chooseHitOrSay();

      console.clear();

      if (choice === 'h') {
        console.log(`${this.human} chooses to hit!`);
        this.hitPlayer(this.human);
      } else {
        console.log(`${this.human} chooses to stay!`);
        break;
      }
    }
  }

  dealerTurn() {
    console.log(`${this.dealer} flips their second card... its ${this.dealer.hand.cards[1]}. Their total is ${this.dealer.sum}.`);

    while (!this.dealer.isBust()) {

      if (this.dealer.minScoreReached()) {
        console.log(`${this.dealer} chooses to stay!`);
        break;
      } else {
        console.log(`${this.dealer} chooses to hit!`);
        this.hitPlayer(this.dealer);
      }
    }
  }

  displayResults() {
    let humanSum = this.human.sum;
    let dealerSum = this.dealer.sum;

    console.log('');

    if (this.human.isBust()) {
      console.log(`${this.human} went bust! You lose the game.`);
    } else if (this.dealer.isBust()) {
      console.log(`${this.dealer} went bust! You win the game!`);
    } else {
      console.log(`The final score is ${this.human}: ${humanSum}, ${this.dealer}: ${dealerSum}`);
      if (humanSum > dealerSum) {
        console.log(`${this.human} wins!`);
      } else if (dealerSum > humanSum) {
        console.log(`${this.dealer} wins!`);
      } else {
        console.log("Its a tie!");
      }
    }
  }

  playAgain() {
    console.log('Would you like to play again? (y)es or (n)o.');
    let choice = readline.question().trim().toLowerCase();

    while (!['y', 'n'].includes(choice[0])) {
      console.log('Sorry, that input was invalid. Would you like to play again? (y)es or (n)o.');
      choice = readline.question().trim().toLowerCase();
    }

    console.clear();
    return choice[0] === 'y';
  }
}

let game = new TwentyOneGame();
game.play();