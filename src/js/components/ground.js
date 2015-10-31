/*!
 * @fileOverview Ground
 * @author Kazuhiro Kobayashi
 */
function Ground (game, x, y, width, height, frame) {
  'use strict';

  var result = new Phaser.TileSprite(game, x, y, width, height, 'ground', frame);

  // start scroll
  result.autoScroll(-200, 0);

  // physics
  game.physics.arcade.enableBody(result);

  // not to be affected by gravity
  result.body.allowGravity = false;

  // stop moving
  result.body.immovable = true;

  return result;
}

module.exports = Ground;
