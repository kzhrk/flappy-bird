/*!
 * @fileOverview Pipe
 * @author Kazuhiro Kobayashi
 */
function Pipe (game, x, y, frame) {
  'use strict';

  var result = new Phaser.Sprite(game, x, y, 'pipe', frame);

  result.anchor.setTo(0.5, 0.5);
  result.game.physics.arcade.enableBody(result);

  result.body.allowGravity = false;
  result.body.immovable = true;

  return result;
}

module.exports = Pipe;
