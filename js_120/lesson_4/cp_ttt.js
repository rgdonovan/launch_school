const readline = require('readline-sync');
const clear = require('clear');

function Square(marker = Square.INITIAL_MARKER) {
  this.marker = marker;
}

Square.INITIAL_MARKER = ' ';
Square.HUMAN_MARKER = 'X';
Square.COMPUTER_MARKER = 'O';

Square.prototype = {
  toString() {
    return this.marker;
  },

  getMarker() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.INITIAL_MARKER;
  }
};

function Board() {
  this.squares = {};

  for (let count = 1; count <= 9; count++) {
    this.squares[count] = new Square();
  }
}

Board.prototype = {
  display() {
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
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return markers.length;
  },
};

function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  return this.marker;
};

function Human(marker) {
  Player.call(this, marker);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer(marker) {
  Player.call(this, marker);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human('X');
  this.computer = new Computer('O');
}

TTTGame.WINNING_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];

TTTGame.prototype = {
  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.displayBoardWithClear();
    }

    this.displayBoardWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },

  displayBoardWithClear() {
    clear();
    console.log('');
    this.board.display();
  },

  displayWelcomeMessage() {
    clear();
    console.log('Welcome to Tic Tac Toe!');
  },

  displayGoodbyeMessage() {
    console.log('Thank you for playing Tic Tac Toe! Goodbye!');
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You win the game!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('Its a tie');
    }
  },

  humanMoves() {
    let validChoices = this.board.unusedSquares();

    console.log(`Pick an available square. (${validChoices.join(', ')}):`);
    let choice = parseInt(readline.question(''), 10);
    choice = String(choice);

    while (!validChoices.includes(choice)) {
      console.log(`Sorry, your choice was invalid. Please pick from ${validChoices.join(', ')}`);
      choice = parseInt(readline.question(''), 10);
      choice = String(choice);
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let validChoices = this.board.unusedSquares();

    let idx = Math.floor(validChoices.length * Math.random());
    let choice = validChoices[idx];

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return TTTGame.WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(this.human, row) === 3 ||
        this.board.countMarkersFor(this.computer, row) === 3;
    });
  },

  isWinner(player) {
    return TTTGame.WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
};

let game = new TTTGame();
game.play();