const READLINE = require('readline-sync');
const MATCH_POINT = 3;
const INITIAL_MARK = ' ';
const PLAYER_MARK = 'X';
const COMPUTER_MARK = '0';
const WIN_CONDITIONS = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]  // diagonals
];

function prompt(message) {
  return console.log(`=> ${message}`);
}

function getInput(message) {
  return READLINE.question(prompt(message));
}

function chooseFirstPlayer() {
  let choice = getInput('Do you want to want to go first? (y/n)').toLowerCase().trim();

  while (!['y','n'].includes(choice[0])) {
    choice = getInput('Do you want to want to go first? (y/n)').toLowerCase().trim();
  }

  return choice[0] === 'y' ? 'Player' : 'Computer';
}

function initalizeBoard() {
  let board = {};
  for (let square = 1; square <= 9; square++) {
    board[square] = INITIAL_MARK;
  }

  return board;
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${PLAYER_MARK}, Computer is ${COMPUTER_MARK}`);

  console.log('');
  console.log(`     |     |     `);
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}  `);
  console.log(`     |     |     `);
  console.log(`-----+-----+-----`);
  console.log(`     |     |     `);
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}  `);
  console.log(`     |     |     `);
  console.log(`-----+-----+-----`);
  console.log(`     |     |     `);
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}  `);
  console.log(`     |     |     `);
  console.log('');
}

function emptySquares(board) {
  return Object.keys(board).filter(square => board[square] === INITIAL_MARK);
}

function joinOr(array, separator = ', ', clause = 'or') {
  let len = array.length;
  switch (len) {
    case 1:
      return array.join('');
    case 2:
      return array.join(` ${clause} `);
    default:
      return `${array.slice(0, len - 1).join(separator)} ${clause} ${array[len - 1]}`;
  }
}

function playerChoosesSquare(board) {
  let square = getInput(`Pick a sqaure (${joinOr(emptySquares(board))})`).trim();

  while (!emptySquares(board).includes(square)) {
    square = getInput(`Sorry but your input was invalid. Please pick a square (${joinOr(emptySquares(board))})`).trim();
  }

  board[square] = PLAYER_MARK;
}

function findAtRiskSquare(board, line, marker) {
  let markArray = line.map(mark => board[mark]);

  if (markArray.filter(char => char === marker).length === 2) {
    if (markArray.includes(INITIAL_MARK)) {
      return line[markArray.indexOf(INITIAL_MARK)];
    }
  }
  return null;
}

function defensiveChoice(board) {
  for (let idx = 0; idx < WIN_CONDITIONS.length; idx++) {
    let line = WIN_CONDITIONS[idx];
    let square = findAtRiskSquare(board, line, PLAYER_MARK);
    if (square) return square;
  }
  return null;
}

function offensiveChoice(board) {
  for (let idx = 0; idx < WIN_CONDITIONS.length; idx++) {
    let line = WIN_CONDITIONS[idx];
    let square = findAtRiskSquare(board, line, COMPUTER_MARK);
    if (square) return square;
  }
  return null;
}

function computerChoosesSquare(board) {
  let square = offensiveChoice(board);

  if (!square) {
    square = defensiveChoice(board);
  }
  if (board[5] === INITIAL_MARK) {
    square = 5;
  }
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARK;
}

function alternatePlayer(player) {
  return player === 'Player' ? 'Computer' : 'Player';
}

function playerTurn(player, board) {
  if (player === 'Player') {
    displayBoard(board);
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WIN_CONDITIONS.length; line++) {
    let subArray = WIN_CONDITIONS[line];

    if (subArray.every(square => board[square] === PLAYER_MARK)) {
      return 'player';
    } else if (subArray.every(square => board[square] === COMPUTER_MARK)) {
      return 'computer';
    }
  }
  return null;
}

function displayWinner(board, score) {
  if (!detectWinner(board)) {
    prompt("It's a tie!");
  } else {
    let winner = detectWinner(board);
    prompt(`${winner[0].toUpperCase() + winner.slice(1)} wins!`);
    prompt(`the score is you: ${score.player}, Computer: ${score.computer}`);
  }
}

function updateScore(board, score) {
  if (detectWinner) score[detectWinner(board)] += 1;
}

function mainGameLoop(score, player) {
  let board = initalizeBoard();

  while (!detectWinner(board) && !boardFull(board)) {
    playerTurn(player, board);
    if (detectWinner(board) || boardFull(board)) break;
    playerTurn(alternatePlayer(player), board);

  }
  displayBoard(board);

  updateScore(board, score);

  displayWinner(board, score);

  if (!detectMatchWinner(score)) {
    getInput('Press any key to begin the next round');
  }
}

function playAgain() {
  let playAgain = getInput('Do you want to play again? (y/n).').toLowerCase().trim();

  while (!['y', 'n'].includes(playAgain[0])) {
    playAgain = getInput("Sorry, but your input was invalid. Please enter y or n.");
  }

  return playAgain[0] === 'y';
}

function detectMatchWinner(score) {
  if (score.player === MATCH_POINT) {
    return 'Player';
  } else if (score.computer === MATCH_POINT) {
    return 'Computer';
  } else {
    return null;
  }
}

function displayMatchWinner(score) {
  prompt(`${detectMatchWinner(score)} wins the match!!`);
}

function losingPlayerGoesFirst(score, player) {
  return score[player] >= score[alternatePlayer(player)] ?
    alternatePlayer(player) : player;
}

function playMatch() {
  let score = {
    player : 0,
    computer : 0
  };

  let player = chooseFirstPlayer();

  do {
    mainGameLoop(score, player);
    player = losingPlayerGoesFirst(score, player);
  } while (!detectMatchWinner(score));

  displayMatchWinner(score);
}

do {
  playMatch();
} while (playAgain());

prompt('Thanks for playing!');