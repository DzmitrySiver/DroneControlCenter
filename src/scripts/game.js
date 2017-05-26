/**
 * Created by Dzmitry Siver on 23.05.2017.
 */

window.onload = function () {

    var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'game-wrapper', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var drone,
        movementThrust = 300,
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
        game.time.advancedTiming = true;

        /**
         * creating drone
         */
        drone = game.add.sprite(game.world.centerX, game.world.centerY, 'drone');
        drone.anchor.setTo(0.5, 0.5);
        game.physics.p2.enable(drone);
        drone.body.collideWorldBounds = true;
        drone.body.angularDamping = 0.1;
        drone.body.damping = 0.1;

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

    function stabilizeDrone() {
        var velocityX = drone.body.velocity.x,
            velocityY = drone.body.velocity.y,
            velocityAngular = drone.body.angularVelocity,
            stabilizationVelocity = 2;

        if (Math.abs(velocityAngular) < rotationThrust ) {
            drone.body.angularVelocity = 0;
        } else {
            if (velocityAngular > 0) {
                drone.body.angularVelocity -= rotationThrust;
            } else if (velocityAngular < 0) {
                drone.body.angularVelocity += rotationThrust;
            }
        }

        // TODO: Damping velocity based on X/Y coords causes incorrect body positioning;
        // TODO: Create complex damping function based on body angle and using only Trhust() functions.
        // Velocity X
        if (Math.abs(velocityX) < stabilizationVelocity ) {
            drone.body.velocity.x = 0;
        } else {
            if (velocityX > 0) {
                drone.body.velocity.x -= stabilizationVelocity;
            } else if (velocityX < 0) {
                drone.body.velocity.x += stabilizationVelocity;
            }
        }

        // Velocity Y
        if (Math.abs(velocityY) < stabilizationVelocity ) {
            drone.body.velocity.y = 0;
        } else {
            if (drone.body.velocity.y > 0) {
                drone.body.velocity.y -= stabilizationVelocity;
            } else if (drone.body.velocity.y < 0) {
                drone.body.velocity.y += stabilizationVelocity;
            }
        }
    }

    function update() {

        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            drone.body.angularVelocity -= rotationThrust;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            drone.body.angularVelocity += rotationThrust;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            drone.body.thrustLeft(movementThrust);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            drone.body.thrustRight(movementThrust);
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            drone.body.thrust(movementThrust);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            drone.body.thrust(-movementThrust);
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            stabilizeDrone();
        }
    }

    function render() {

        // Camera
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteInfo(drone, 32, 700);
        game.debug.text(drone.body.velocity.x || '--', 800, 32, "#00ff00");
        game.debug.text(game.time.fps || '--', 800, 700, "#00ff00");

    }

};