/*!
 * @fileOverview Menu
 * @author Kazuhiro Kobayashi
 */
function Menu () {
  'use strict';

  return {
    preload: function () {
    },
    create: function () {
      // add background
      this.background = this.game.add.sprite(0,0,'background');

      // add ground
      this.ground = this.game.add.tileSprite(0, 384, 335,112,'ground');
      this.ground.autoScroll(-200,0);

      // add text
      this.title = this.game.add.bitmapText(this.game.width/2, 180, 'flappyfont', 'Flappy Bird', 42);
      this.title.anchor.setTo(0.5, 0.5);

      // add bird
      this.bird = this.add.sprite(this.game.world.width/2, 300, 'bird');
      this.bird.anchor.setTo(0.5, 0.5);
      this.bird.animations.add('flap');
      this.bird.animations.play('flap', 12, true);

      // add start button
      this.startBtn = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'startButton');
      this.startBtn.anchor.setTo(0.5, 0.5);
      this.startBtn.inputEnabled = true;
      this.startBtn.events.onInputDown.add(this.onClickStart, this);
    },
    update : function () {
    },
    onClickStart: function () {
      this.game.state.start('play');
    }
  };
}

module.exports = Menu;
