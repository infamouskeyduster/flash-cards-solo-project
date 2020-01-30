const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card.js');
const Deck = require('../src/Deck.js');
const Turn = require('../src/Turn.js');
const Round = require('../src/Round.js');

describe('Round', function () {
  it('should be a function', function () {
    var deck = new Deck();
    const round = new Round(deck);
    expect(Round).to.be.a('function');
  });

  it('the current deck of cards should be passed into the new round', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.deck).to.deep.equal([card1, card2, card3]);
  });

  it('The currentCard should be the first Card in the Deck (the array of Cards) at the start of the Round', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.deck[round.turns]).to.equal(card1);
  });

  it('the turns should be updated every time that the takeTurn function is ran', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.turns).to.equal(0);
    round.takeTurn('pug');
    expect(round.turns).to.equal(1);
    round.takeTurn('capybara');
    expect(round.turns).to.equal(2);
  });

  it('it should keep track of incorrect guesses & iterate to the next card in deck', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.incorrectGuesses.length).to.equal(0);
    round.takeTurn('pug');
    expect(round.incorrectGuesses.length).to.equal(1);
    round.takeTurn('spleen');
    expect(round.incorrectGuesses.length).to.equal(2);
    round.takeTurn('Fitzgerald');
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.turns).to.equal(3);
  });

  it('it should provide feedback based on the guess being correct / incorrect', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    let turn = new Turn('pug', card1);
    round.takeTurn('pug');
    expect(turn.giveFeedback()).to.equal('😞 INCORRECT! No Dice! Try Again!');
    turn = new Turn('gallbladder', card2);
    round.takeTurn('gallbladder');
    expect(turn.giveFeedback()).to.equal('🤩 CORREECT! Boo-Yah! Yahtzee! Eureka!');
  });

  it('it should calculate the percentage of correct answers', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const card4 = new Card(15, 'What is John\'s favorite ungulate?', ['Deer', 'Elk', 'Pronghorn'], 'Elk');
    const deck = new Deck([card1, card2, card3, card4]);
    const round = new Round(deck);
    expect(round.incorrectGuesses.length).to.equal(0);
    round.takeTurn('pug');
    expect(round.incorrectGuesses.length).to.equal(1);
    round.takeTurn('spleen');
    expect(round.incorrectGuesses.length).to.equal(2);
    round.takeTurn('Fitzgerald');
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.turns).to.equal(3);
    expect(round.calculatePercentCorrect()).to.equal(33);
    round.takeTurn('Elk');
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.turns).to.equal(4);
    expect(round.calculatePercentCorrect()).to.equal(50);
  });

  it('at the end of a round, it should return the percentage correct as a message', function () {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const card4 = new Card(15, 'What is John\'s favorite ungulate?', ['Deer', 'Elk', 'Pronghorn'], 'Elk');
    const deck = new Deck([card1, card2, card3, card4]);
    const round = new Round(deck);
    expect(round.incorrectGuesses.length).to.equal(0);
    round.takeTurn('pug');
    expect(round.incorrectGuesses.length).to.equal(1);
    round.takeTurn('spleen');
    expect(round.incorrectGuesses.length).to.equal(2);
    round.takeTurn('Fitzgerald');
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.turns).to.equal(3);
    expect(round.calculatePercentCorrect()).to.equal(33);
    round.takeTurn('Elk');
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.turns).to.equal(4);
    expect(round.calculatePercentCorrect()).to.equal(50);
    expect(round.endRound()).to.equal(`** Round over! ** You answered 50% of the questions correctly!`);
  });

});
