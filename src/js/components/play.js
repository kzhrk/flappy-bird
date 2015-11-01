/*!
 * @fileOverview Play
 * @author Kazuhiro Kobayashi
 */

var Bird = require('./bird');
var Ground = require('./ground');
var Pipe = require('./pipe');
var PipeGroup = require('./pipeGroup');

function Play () {}

Play.prototype = {
  create: function () {
    // add gravity
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // gravity
    this.game.physics.arcade.gravity.y = 1200;

    // add a background
    this.background = this.game.add.sprite(0,0,'background');

    // pipe group
    this.pipes = this.game.add.group();

    // add a bard
    this.bird = new Bird(this.game, 100, 100);
    this.game.add.existing(this.bird);

    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    // add a ground
    this.ground = new Ground(this.game, 0, 384, 335, 112);
    this.game.add.existing(this.ground);

    //
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    //
    this.game.input.onDown.add(this.bird.flap, this.bird);

    //
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add score
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
    this.scoreText.visible = true;

    // add a timer
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();

    // add sound
    this.scoreSound = this.game.add.audio('score');

    this.gameover = false;
  },
  update: function () {
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

    if (!this.gameover) {
      this.pipes.forEach(function (pipeGroup) {
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this);
    }
  },
  checkScore: function (pipeGroup) {
    if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
      pipeGroup.hasScored = true;
      this.score ++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  },
  generatePipes: function () {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);

    if (!this.pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  },
  deathHandler: function (bird, enemy) {
    if (enemy instanceof Ground && !this.bird.onGround) {
      this.bird.onGround = true;
      this.shutdown();
    }

    if (!this.gameover) {
      this.gameover = true;
      this.bird.kill();
      this.pipes.callAll('stop');
      this.pipeGenerator.timer.stop();
      this.ground.stopScroll();
    }
  },
  shutdown: function () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
    this.game.state.start('gameover');
  }
};

module.exports = Play;
