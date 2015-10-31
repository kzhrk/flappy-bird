(function () {
    'use strict';

    var Init     = require('./components/init');
    var Menu     = require('./components/menu');
    var Play     = require('./components/play');
    var GameOver = require('./components/gameover');

    var game = new Phaser.Game(288, 496, Phaser.AUTO);

    game.state.add('init', Init);
    game.state.add('menu', Menu);
    game.state.add('play', Play);
    game.state.add('gameover', GameOver);

    game.state.start('init');

})(window.App = window.App || {});
