/*!
 * @fileOverview Bird
 * @author Kazuhiro Kobayashi
 */
function Bird (game, x, y, frame) {
  'use strict';

  var result = new Phaser.Sprite(game, x, y, 'bird', frame);
  result.anchor.setTo(0.5, 0.5);
  result.animations.add('flap');
  result.animations.play('flap', 12, true);

  game.physics.arcade.enableBody(result);

  result.checkWorldBounds = true;
  result.outOfBoundsKill = true;

  result.flap = function () {
    result.body.velocity.y = -400;
    game.add.tween(this).to({angle: -40}, 100).start();
  };

  result.update = function (){
    if(result.angle < 90) {
      result.angle += 2.5;
    }
  };

  return result;
}

module.exports = Bird;
