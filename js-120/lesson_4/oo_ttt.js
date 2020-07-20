const readline = require('readline-sync');
const clear = require('clear');

class Square {
  static INITIAL_MARKER = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.INITIAL_MARKER) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.INITIAL_MARKER;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[counter] = new Square();
    }
  }

  display() {
    console.log('');
    console.log(`     |     |`);
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log(`     |     |`);
    console.log(`-----|-----|-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log(`     |     |`);
    console.log(`-----|-----|-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log(`     |     |`);
    console.log('');
  }

  displayWithClear() {
    clear();
    console.log('');
    this.display();
  }

  availableSquares() {
    return Object.keys(this.squares).filter(key => {
      return this.squares[key].isUnused();
    });
  }

  isFull() {
    return this.availableSquares().length === 0;
  }

  markSquareAt(square, marker) {
    this.squares[square].setMarker(marker);
  }

  countMarkersFor(player, row) {
    return row.filter(square => {
      return this.squares[square].getMarker() === player.getMarker();
    }).length;
  }

  choicePrompt() {
    return this.availableSquares().length > 1 ? 'Please choose from the available squares' : 'Please choose the available square';
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score++;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static MATCH_POINT = 3;
  static WIN_CONDITIONS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ]

  static joinOr(array, symbol, word) {
    switch (array.length) {
      case 1:
        return array.join(' ');
      case 2:
        return array.join(` ${word} `);
      default:
        return array.slice(0, -1).join(`${symbol} `) + ` ${word} ` + array.slice(-1);
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = null;
    this.currentPlayer = null;
  }

  playRound() {
    this.board.reset();
    this.board.displayWithClear();

    while (!this.roundOver()) {
      this.board.displayWithClear();

      this.currentPlayerMoves();
      this.togglePlayer();
    }

    this.board.displayWithClear();
    this.displayRoundResults();
  }

  playMatch() {
    this.setFirstPlayer(this.chooseFirstPlayer());

    while (!this.matchOver()) {
      this.playRound();
      this.updateMatchScore();
      this.displayMatchScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;

      this.toggleFirstPlayer();
    }

    this.displayMatchResults();
  }

  play() {
    this.displayWelcomePrompt();
    this.playMatch();
    this.displayGoodByeMessage();
  }

  playAgain() {
    console.log('Would you like to play the next round? (y)es or (n)o.');
    let choice = readline.question().trim().toLowerCase();

    while (!['y', 'n'].includes(choice[0])) {
      console.log('Sorry, that input was invalid. Would you like to play the next round? (y)es or (n)o.');
      choice = readline.question().trim().toLowerCase();
    }

    clear();
    return choice[0] === 'y';
  }

  displayWelcomePrompt() {
    clear();
    console.log(`Welcome to Tic Tac Toe! The first player to win ${TTTGame.MATCH_POINT} games wins!`);
  }

  displayGoodByeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  chooseFirstPlayer() {
    console.log('Would you like to go first? (y)es or (n)o.');
    let choice = readline.question().trim().toLowerCase();

    while (!['y', 'n'].includes(choice[0])) {
      console.log('Sorry, that input was invalid. Would you like to go first? (y)es or (n)o.');
      choice = readline.question().trim().toLowerCase();
    }

    return choice[0] === 'y' ? this.human : this.computer;
  }

  setFirstPlayer(player) {
    this.firstPlayer = player;
    this.currentPlayer = this.firstPlayer;
  }

  humanMoves() {
    let validChoices = this.board.availableSquares();

    console.log(`${this.board.choicePrompt()}: ${TTTGame.joinOr(validChoices, ',', 'or')}`);
    let choice = readline.question().trim();

    while (!validChoices.includes(choice)) {
      console.log(`Sorry, your input was invalid. ${this.board.choicePrompt()}. ${TTTGame.joinOr(validChoices, ',', 'or')}`);
      choice = readline.question().trim();
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.board.squares['5'].isUnused() ? '5' : null;

    if (!choice) {
      choice = this.findOffensiveChoice();
    }
    if (!choice) {
      choice = this.findDefensiveChoice();
    }
    if (!choice) {
      let validChoices = this.board.availableSquares();
      let idx = Math.floor(Math.random() * validChoices.length);

      choice = validChoices[idx];
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  findDefensiveChoice() {
    return this.findCriticalSquare(this.human);
  }

  findOffensiveChoice() {
    return this.findCriticalSquare(this.computer);
  }

  findCriticalSquare(player) {
    for (let idx = 0; idx < TTTGame.WIN_CONDITIONS.length; idx++) {
      let row = TTTGame.WIN_CONDITIONS[idx];
      let atRiskSquare = this.criticalSquare(row, player);

      if (atRiskSquare) return atRiskSquare;
    }
    return null;
  }

  criticalSquare(row, player) {
    if (this.board.countMarkersFor(player, row) === 2) {
      return row.find(square => {
        return this.board.squares[square].isUnused();
      }) || null;
    }
    return null;
  }

  isRoundWinner(player) {
    return TTTGame.WIN_CONDITIONS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  someoneWon() {
    return this.isRoundWinner(this.human) || this.isRoundWinner(this.computer);
  }

  roundOver() {
    return this.board.isFull() || this.someoneWon();
  }

  displayRoundResults() {
    if (this.isRoundWinner(this.human)) {
      console.log("You win the round!");
    } else if (this.isRoundWinner(this.computer)) {
      console.log(`You lost the round :(`);
    } else {
      console.log("Its a tie!");
    }
  }

  updateMatchScore() {
    if (this.isRoundWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isRoundWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_POINT;
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  displayMatchScore() {
    let humanScore = this.human.getScore();
    let computerScore = this.computer.getScore();

    console.log(`The score is you: ${humanScore}, computer: ${computerScore}.`);
  }

  displayMatchResults() {
    if (this.isMatchWinner(this.human)) {
      console.log('You win the match!');
    } else {
      console.log('You lost the match :(');
    }
  }

  currentPlayerMoves() {
    if (this.currentPlayer === this.human) {
      this.humanMoves();

    } else if (this.currentPlayer === this.computer) {
      this.computerMoves();
    }
  }

  togglePlayer() {
    this.currentPlayer = (this.currentPlayer === this.human) ?
      this.computer : this.human;
  }

  toggleFirstPlayer() {
    if (this.firstPlayer === this.human) {
      this.setFirstPlayer(this.computer);
    } else {
      this.setFirstPlayer(this.human);
    }
  }
}

let game = new TTTGame();
game.play();