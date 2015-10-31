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
      this.text = this.game.add.text(0, 0, 'Flappy Bird', {
        font: '32px Arial',
        fill: '#333',
        wordWrap: true,
        wordWrapWidth: this.ground.width,
        align: 'center'
      });
      this.text.x = this.game.world.width / 2 - this.text.width/2;
      this.text.y = this.game.world.height / 2 - this.text.height/2;

      // add event to text
      this.text.inputEnabled = true;
      this.text.events.onInputDown.add(this.onClickStart, this);

      // add bird
      this.bird = this.add.sprite(200, 5, 'bird');

      // bird animation
      this.bird.animations.add('flap');
      this.bird.animations.play('flap', 12, true);
    },
    update : function () {
    },
    onClickStart: function () {
      this.game.state.start('play');
    }
  };
}

module.exports = Menu;
