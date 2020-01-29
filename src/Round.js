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

    turn.giveFeedback();
    this.turns += 1;
    this.index += 1;
  }

  calculatePercentCorrect() {
    var numOfIncorrect = this.incorrectGuesses.length;
    return (((this.turns - numOfIncorrect) / this.turns) * 100);
  }

  endRound() {
    console.log(`** Round over! ** You answered ${calculatePercentCorrect()}% of the questions correctly!`);
  }
}
module.exports = Round;
