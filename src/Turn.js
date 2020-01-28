class Turn {
  constructor(playerGuess, card) {
    this.playerGuess = playerGuess;
    this.card = card;
  }

  returnGuess() {
    return this.playerGuess;
  }

  returnCard() {
    return this.card;
  }

  evaluateGuess() {
    if (this.playerGuess.toLowerCase() == this.card.correctAnswer.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

  giveFeedback() {
    if (this.evaluateGuess() == true) {
      return 'Boo-Yah! Yahtzee! Eureka!';
    } else {
      return 'No Dice! Try Again!';
    }
  }

}
module.exports = Turn;
