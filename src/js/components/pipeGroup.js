/*!
 * @fileOverview PipeGroup
 * @author Kazuhiro Kobayashi
 */

function PipeGroup (game, parent) {
  'use strict';

  var Pipe = require('./pipe');

  var result = new Phaser.Group(game, parent);

  result.topPipe = new Pipe(game, 0, 0, 0);
  result.add(result.topPipe);

  result.bottomPipe = new Pipe(game, 0, 440, 1);
  result.add(result.bottomPipe);

  result.hasScored = false;

  result.reset = function (x, y) {
    // Step 1
    result.topPipe.reset(0,0);

    // Step 2
    result.bottomPipe.reset(0,440);

    // Step 3
    result.x = x;
    result.y = y;

    // Step 4
    result.setAll('body.velocity.x', -200);

    // Step 5
    result.hasScored = false;

    // Step 6
    result.exists = true;
  };
  result.checkWorldBounds = function () {
    if (!result.topPipe.inWorld) {
      result.exists = false;
    }
  };
  result.update = function () {
    result.checkWorldBounds();
  };


  return result;
}

module.exports = PipeGroup;
