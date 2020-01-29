const Turn = require('../src/Turn.js');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.index = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.deck.cards[this.index];
  }

  takeTurn(guess) {
    var turn = new Turn(guess, this.deck.cards[this.index]);
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.deck.cards[this.index].id);
    }

    console.log(turn.giveFeedback());
    this.turns += 1;
    this.index += 1;
  }

  calculatePercentCorrect() {
    var numOfIncorrect = this.incorrectGuesses.length;
    return Math.floor((((this.turns - numOfIncorrect) / this.turns) * 100));
  }

  endRound() {
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
  }
}
module.exports = Round;
