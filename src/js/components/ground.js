/*!
 * @fileOverview Ground
 * @author Kazuhiro Kobayashi
 */

var Ground = function (game, x, y, width, height) {
  'use strict';

  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // start scroll
  this.autoScroll(-200, 0);

  // physics
  this.game.physics.arcade.enableBody(this);

  // not to be affected by gravity
  this.body.allowGravity = false;

  // stop moving
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

module.exports = Ground;
