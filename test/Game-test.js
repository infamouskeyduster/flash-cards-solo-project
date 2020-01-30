const chai = require('chai');
const expect = chai.expect;
const Round = require('../src/Round.js');
const Game = require('../src/Game.js');

describe('Game', function () {

  it('should be a function', function () {
    expect(Game).to.be.a('function');
  });

  it('should keep track of the current round', function () {
    const game = new Game();
    expect(game.currentRound).to.equal(null);
  });

  it('should contain a method that starts everything…', function () {
    const game = new Game();
    game.start();
    expect(game.currentRound).to.be.an.instanceof(Round);
  });
});
