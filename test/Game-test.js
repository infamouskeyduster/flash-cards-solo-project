const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card.js');
const Deck = require('../src/Deck.js');
// const Turn = require('../src/Turn.js');
const Round = require('../src/Round.js');
const Game = require('../src/Game.js');

describe('Game', function () {

  it('should be a function', function () {
    expect(Game).to.be.a('function');
  });

  it('should keep track of the current round', function () {
    const game = new Game();
    expect(game.currentRound()).to.equal(round);
  });
});

// Your Game class should meet these other requirements:
// Should keep track of the currentRound
// start: method that starts everything
//  Creates Cards
//  Puts Cards in a Deck
//  Creates a new Round using the Deck
// invokes printMessage to display the message in the CLI
// invokes printQuestion to kick off our helper functions that allow interaction via the CLI
