/**
 * Created by Dzmitry Siver on 23.05.2017.
 */

window.onload = function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-wrapper', {preload: preload, create: create});

    function preload() {

        game.load.image('logo', 'sprites/phaser.png');

    }

    function create() {

        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

    }

};