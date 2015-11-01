/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    'use strict';

	    var Init     = __webpack_require__(1);
	    var Menu     = __webpack_require__(2);
	    var Play     = __webpack_require__(3);
	    var GameOver = __webpack_require__(8);

	    var game = new Phaser.Game(288, 496, Phaser.AUTO);

	    game.state.add('init', Init);
	    game.state.add('menu', Menu);
	    game.state.add('play', Play);
	    game.state.add('gameover', GameOver);

	    game.state.start('init');

	})(window.App = window.App || {});


/***/ },
/* 1 */
/***/ function(module, exports) {

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

	    // load image
	    this.load.image('background', 'assets/img/bg.png');
	    this.load.image('ground', 'assets/img/ground.png');
	    this.load.image('gameover', 'assets/img/gameover.png');
	    this.load.image('startButton', 'assets/img/btn_start.png');
	    this.load.spritesheet('bird', 'assets/img/bird.png', 36,26,3);
	    this.load.spritesheet('pipe', 'assets/img/pipes.png', 52,320,2);


	    // load fonts
	    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

	    // load audio
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * @fileOverview Play
	 * @author Kazuhiro Kobayashi
	 */

	var Bird = __webpack_require__(4);
	var Ground = __webpack_require__(5);
	var Pipe = __webpack_require__(6);
	var PipeGroup = __webpack_require__(7);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * @fileOverview Bird
	 * @author Kazuhiro Kobayashi
	 */
	function Bird (game, x, y, frame) {
	  'use strict';

	  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

	  this.anchor.setTo(0.5, 0.5);

	  this.name = 'bird';
	  this.alive = false;
	  this.onGround= false;

	  // add animation
	  this.animations.add('flap');
	  this.animations.play('flap', 12, true);

	  this.game.physics.arcade.enableBody(this);
	  this.body.allowGravity = true;
	  this.body.collideWorldBounds = true;

	  this.events.onKilled.add(this.onKilled, this);
	}

	Bird.prototype = Object.create(Phaser.Sprite.prototype);
	Bird.prototype.constructor = Bird;

	Bird.prototype.update = function () {
	  if(this.angle < 90 && this.alive) {
	    this.angle += 2.5;
	  }
	  if (!this.alive) {
	    this.body.velocity.x = 0;
	  }
	};
	Bird.prototype.flap = function () {
	  if (!!this.alive) {
	    this.body.velocity.y = -400;
	    this.game.add.tween(this).to({angle: -40}, 100).start();
	  }
	};
	Bird.prototype.onKilled = function () {
	  this.exists = true;
	  this.visible = true;
	  this.animations.stop();
	  this.game.add.tween(this).to({angle: 90}, (90/this.y*300)).start();
	};

	module.exports = Bird;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*!
	 * @fileOverview Pipe
	 * @author Kazuhiro Kobayashi
	 */
	var Pipe = function (game, x, y, frame) {
	  'use strict';

	  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
	  this.anchor.setTo(0.5, 0.5);
	  this.game.physics.arcade.enableBody(this);

	  this.body.allowGravity = false;
	  this.body.immovable = true;
	};

	Pipe.prototype = Object.create(Phaser.Sprite.prototype);
	Pipe.prototype.constructor = Pipe;

	Pipe.prototype.update = function() {
	  // write your prefab's specific update code here

	};

	module.exports = Pipe;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * @fileOverview PipeGroup
	 * @author Kazuhiro Kobayashi
	 */
	var Pipe = __webpack_require__(6);

	var PipeGroup = function (game, parent) {
	  'use strict';

	  Phaser.Group.call(this, game, parent);

	  this.topPipe = new Pipe(this.game, 0, 0, 0);
	  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
	  this.add(this.topPipe);
	  this.add(this.bottomPipe);

	  this.hasScored = false;

	  this.setAll('body.velocity.x', -200);
	};

	PipeGroup.prototype             = Object.create(Phaser.Group.prototype);
	PipeGroup.prototype.constructor = PipeGroup;

	PipeGroup.prototype.update = function () {
	  this.checkWorldBounds();
	};
	PipeGroup.prototype.checkWorldBounds = function () {
	  if (!this.topPipe.inWorld) {
	    this.exists = false;
	  }
	};
	PipeGroup.prototype.reset = function (x, y) {
	  this.topPipe.reset(0,0);
	  this.bottomPipe.reset(0,440);
	  this.x = x;
	  this.y = y;
	  this.setAll('body.velocity.x', -200);
	  this.hasScored = false;
	  this.exists = true;
	};
	PipeGroup.prototype.stop = function () {
	  this.setAll('body.velocity.x', 0);
	};

	module.exports = PipeGroup;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*!
	 * @fileOverview GameOver
	 * @author Kazuhiro Kobayashi
	 */
	function GameOver () {"use strict";}

	GameOver.prototype = {
	  preload: function () {

	  },
	  create: function () {
	    // var style = { font: '48px Arial', fill: '#ffffff', align: 'center'};
	    // this.titleText = this.game.add.text(this.game.world.centerX, 200, 'Game Over!', style);
	    // this.titleText.anchor.setTo(0.5, 0.5);

	    this.title = this.game.add.bitmapText(this.game.world.centerX, 200, 'flappyfont', 'GAME OVER', 42);
	    this.title.anchor.setTo(0.5, 0.5);

	    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
	    this.instructionText.anchor.setTo(0.5, 0.5);
	  },
	  update: function () {
	    if(this.game.input.activePointer.justPressed()) {
	      this.game.state.start('play');
	    }
	  }
	};

	module.exports = GameOver;


/***/ }
/******/ ]);