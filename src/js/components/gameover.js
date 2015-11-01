/*!
 * @fileOverview GameOver
 * @author Kazuhiro Kobayashi
 */
function GameOver () {"use strict";}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    // var style = { font: '48px Arial', fill: '#ffffff', align: 'center'};
    // this.titleText = this.game.add.text(this.game.world.centerX, 200, 'Game Over!', style);
    // this.titleText.anchor.setTo(0.5, 0.5);

    this.title = this.game.add.bitmapText(this.game.world.centerX, 200, 'flappyfont', 'GAME OVER', 42);
    this.title.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = GameOver;
