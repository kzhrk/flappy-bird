/*!
 * @fileOverview PlayState
 * @author Kazuhiro Kobayashi
 */
function PlayState () {}

PlayState.prototype = {
  create: function () {
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
    this.scoreText.visible = false;
  }
};

module.exports = PlayState;
