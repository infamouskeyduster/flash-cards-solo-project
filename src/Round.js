const Turn = require('../src/Turn.js');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  takeTurn(guess) {
    var turn = new Turn(guess, this.returnCurrentCard());
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.deck[this.turns].id);
    }

    this.turns += 1;
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    var numOfIncorrect = this.incorrectGuesses.length;
    return Math.round((((this.turns - numOfIncorrect) / this.turns) * 100));
  }

  returnCurrentCard() {
    return this.deck[this.turns];
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`);
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
  }
}
module.exports = Round;
