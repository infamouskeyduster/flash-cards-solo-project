const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Deck = require('../src/Deck.js');
const Round = require('../src/Round.js');

class Game {
  constructor() {
    this.currentRound = null;
  }

  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`);
  }

  printQuestion(round) {
    util.main(round);
  }

  start() {
    const deck = new Deck(prototypeQuestions);
    const round = new Round(deck);
    this.printMessage(deck);
    this.printQuestion(round);
    this.currentRound = round;
  }
}

module.exports = Game;
