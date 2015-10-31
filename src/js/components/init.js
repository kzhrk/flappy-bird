/*!
 * @fileOverview Menu
 * @author Kazuhiro Kobayashi
 */
function Init () {
  this.asset = null;
  this.ready = false;
}

Init.prototype = {
  preload: function () {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('background', 'assets/img/bg.png');
    this.load.image('ground', 'assets/img/ground.png');
    this.load.spritesheet('bird', 'assets/img/bird.png', 36,26,3);
    this.load.spritesheet('pipe', 'assets/img/pipes.png', 52,320,2);
    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.audio('score', 'assets/audio/score.wav');
    this.load.audio('flap', 'assets/audio/flap.wav');
    this.load.audio('pipeHit', 'assets/audio/pipe-hit.wav');
    this.load.audio('groundHit', 'assets/audio/ground-hit.wav');
  },
  create: function () {
    this.asset.cropEnabled = false;
  },
  update : function () {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Init;
