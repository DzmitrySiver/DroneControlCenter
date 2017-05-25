/**
 * Created by Dzmitry Siver on 23.05.2017.
 */

window.onload = function () {

    var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'game-wrapper', {preload: preload, create: create, update: update, render: render});

    var drone,
        movementThrust = 200,
        rotationThrust = 0.03;

    function preload() {

        game.load.image('drone', 'sprites/drone.png');

    }

    function create() {

        /**
         * creating world
         */
        game.world.setBounds(0, 0, 5000, 5000);
        game.physics.startSystem(Phaser.Physics.P2JS);

        /**
         * creating drone
         */
        drone = game.add.sprite(game.world.centerX, game.world.centerY, 'drone');
        drone.anchor.setTo(0.5, 0.5);
        game.physics.p2.enable(drone);
        drone.body.collideWorldBounds = true;
        drone.body.angularDamping = 0.5;
        drone.body.damping = 0.5;

        /**
         * creating camera
         */
        game.camera.focusOnXY(game.world.centerX, game.world.centerY);

        // Prevent directions and space key events bubbling up to browser,
        // since these keys will make web page scroll which is not expected.
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);
    }

    function update() {

        // Check key states every frame.
        // Move ONLY one of the left and right key is hold.
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            drone.body.angularVelocity -= rotationThrust;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            drone.body.angularVelocity += rotationThrust;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (drone.body.angularVelocity > 0) {
                drone.body.angularVelocity -= 0.01;
            } else {
                drone.body.angularVelocity += 0.01;
            }

            if (drone.body.velocity.x > 0) {
                drone.body.velocity.x -= 0.5;
            } else {
                drone.body.velocity.x += 0.5;
            }

            if (drone.body.velocity.y > 0) {
                drone.body.velocity.y -= 0.5;
            } else {
                drone.body.velocity.y += 0.5;
            }


        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            drone.body.thrust(movementThrust);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            drone.body.thrust(-movementThrust);
        }
    }

    function render() {

        // Camera
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteInfo(drone, 32, 500);
        game.debug.text(drone.body.velocity.x, 600, 32);

    }

};