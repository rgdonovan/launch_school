/* eslint-disable max-lines-per-function */
  const readline = require('readline-sync');

  function createPlayer() {
    return {
      history: createHistory(),
      move: null,
      score: 0,

      incrementScore() {
        this.score += 1;
      },

      resetScore() {
        this.score = 0;
      },

    };
  }

  function createHistory() {
    return {
      playerHistory: [],
      opponentHistory: [],

      createMoveHistory() {
        let moveHistory = [];

        for (let move = 0; move < this.playerHistory.length; move++) {
          moveHistory.push(
            [this.playerHistory[move], this.opponentHistory[move]]);
        }
        return moveHistory;
      },

      updateHistory(playerMove, opponentMove) {
        this.playerHistory.push(playerMove);
        this.opponentHistory.push(opponentMove);
      },

      getLosingHands(compareFunction) {
        return this.createMoveHistory().filter(pair => {
          let [playerMove, opponentMove] = pair;
          return compareFunction(playerMove, opponentMove) === opponentMove;
        }).map(pair => pair[0]);
      },

      getLosingMoves(losingHands, validMoves) {
        let losingMoves = [];

        for (let idx = 0; idx < validMoves.length; idx++) {
          let move = validMoves[idx];

          let losses = losingHands.filter(hand => hand === move).length;
          let uses = this.playerHistory.filter(hand => {
            return hand === move;
          }).length;

          if (losses === 0) continue;

          if (uses === losses || (uses - losses) / uses >= .60) {
              losingMoves.push(move);
          }
        }
        return losingMoves;
      },
    };
}

  function createComputer() {
    let playerObject = createPlayer('computer');

    let computerObject = {
      moveBias: [],

      choose(moves) {
        moves = moves.concat(this.moveBias);
        console.log('computer is choosing from', moves);
        let randomIdx = Math.floor(Math.random() * moves.length);
        this.move = moves[randomIdx];
      },

      changeMoveBias(compareFunction, validMoves) {
        let losingHands = this.history.getLosingHands(compareFunction);
        let losingMoves = this.history.getLosingMoves(losingHands, validMoves);
        let preferredMoves = validMoves.filter(move => {
          return !losingMoves.includes(move);
        });
        this.moveBias = preferredMoves;
      },
    };
    return Object.assign(playerObject, computerObject);
  }

  function createHuman() {
    let playerObject = createPlayer('human');

    let humanObject = {
      choose(moves) {
        let choice = readline.question(`Pick your move! ${moves.join(', ')}.\n`).toLowerCase().trim();
        choice = this.findAbbreviatedChoice(choice, moves);

        while (!moves.includes(choice)) {
          let errorMessage = 'Sorry, your choice was invalid.';
          if (typeof choice === 'number' && choice > 0) {
            errorMessage = 'Sorry, you need to be more specific!';
          }
          choice = readline.question(`${errorMessage} Please select from ${moves.join(', ')}.\n`).toLowerCase().trim();
          choice = this.findAbbreviatedChoice(choice, moves);
        }

        this.move = choice;
      },

      findAbbreviatedChoice(choice, moves) {
        let matches = moves.filter(move => {
          return move.slice(0, choice.length) === choice;
        });

        if (matches.length !== 1) {
          return matches.length;
        } else {
          return matches[0];
        }
      },
    };

    return Object.assign(playerObject, humanObject);
  }

  function createMoves() {
    return {
      moves: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
      winningPairs: [['scissors', 'paper'], ['paper', 'rock'], ['rock', 'lizard'], ['lizard', 'spock'], ['spock', 'scissors'],
                     ['scissors', 'lizard'], ['lizard', 'paper'], ['paper', 'spock'], ['spock', 'rock'], ['rock', 'scissors']],

      compareMoves(move1, move2) {
        if (move1 === move2) return 'tie';
        for (let pair = 0; pair < this.winningPairs.length; pair++) {
          let [winner, loser] = this.winningPairs[pair];

          if (move1 === winner && move2 === loser) {
            return move1;
          } else if (move2 === winner && move1 === loser) {
            return move2;
          }
        }
        return 'error';
      },
    };
  }

  function createRules() {
    let movesObject = createMoves();

    let rulesObject = {
      winningScore: 5,

      displayRules() {
        console.log('\nThe rules are simple:');
        console.log(`  Scissors beats paper, paper beats rock, rock beats lizard, lizard beats Spock,`);
        console.log(`  Spock beats scissors, scissors beats lizard, lizard beats paper,`);
        console.log(`  paper beats Spock, Spock beats rock, rock beats scissors.`);
        console.log(`\n  First to ${this.winningScore} wins!\n`);
      },
    };
    return Object.assign(rulesObject, movesObject);
  }

  const RPSGame = {
    rules: createRules(),
    history: createHistory(),
    human: createHuman(),
    computer: createComputer(),

    clearScreen() {
      console.clear();
    },

    startPrompt() {
      readline.question('Press enter to begin!\n');
      this.clearScreen();
    },

    displayWelcomeMessage() {
      console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!');
    },

    displayGoodbyeMessage() {
      console.log('Thanks for playing Rock, Paper, Scissors, Lizard, Spock!');
    },

    roundWinner() {
      return this.rules.compareMoves(this.human.move, this.computer.move);
    },

    displayRoundWinner(winner) {
      console.log(`You chose ${this.human.move}`);
      console.log(`Computer chose ${this.computer.move}`);

      if (winner === 'tie') {
        console.log("It's a tie!");
      } else if (winner === this.human.move) {
        console.log('You win!');
      } else {
        console.log('Computer wins!');
      }

      console.log(`The score is you: ${this.human.score}, computer: ${this.computer.score}`);
    },

    updatePlayerHistories() {
      let humanMove = this.human.move;
      let computerMove = this.computer.move;

      this.human.history.updateHistory(humanMove, computerMove);
      this.computer.history.updateHistory(computerMove, humanMove);
    },

    updateScore(winner) {
      if (winner === this.human.move) {
        this.human.incrementScore();
      } else if (winner === this.computer.move) {
        this.computer.incrementScore();
      }
    },

    biasComputerMoves() {
      let compareFunction = this.rules.compareMoves.bind(RPSGame.rules);
      this.computer.changeMoveBias(compareFunction, this.rules.moves);
    },

    isMatchWinner() {
      return this.human.score === this.rules.winningScore ||
             this.computer.score === this.rules.winningScore;
    },

    displayMatchWinner() {
      if (this.human.score === this.rules.winningScore) {
        console.log('You win the match!');
      } else {
        console.log('You lose the match :(');
      }
    },

    resetScores() {
      this.human.resetScore();
      this.computer.resetScore();
    },

    playAgain() {
      let answer = '';
      while (!['y', 'n'].includes(answer[0])) {
        answer = readline.question('Would you like to play again? (y)es or (n)o.\n').trim().toLowerCase();
      }

      return answer[0] === 'y';
    },

    playRound() {
      this.human.choose(this.rules.moves);
      this.computer.choose(this.rules.moves);
      let winner = this.roundWinner();

      this.updateScore(winner);
      this.updatePlayerHistories();
      this.biasComputerMoves();

      this.clearScreen();
      this.displayRoundWinner(winner);
    },

    play() {
      this.clearScreen();
      this.displayWelcomeMessage();
      this.rules.displayRules();

      do {
        this.startPrompt();
        this.resetScores();

        while (!this.isMatchWinner()) {
          this.playRound();
        }
        this.displayMatchWinner();
      } while (this.playAgain());

      this.displayGoodbyeMessage();
    },
  };


RPSGame.play();
