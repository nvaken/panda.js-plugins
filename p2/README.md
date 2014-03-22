## p2.js plugin for Panda.js

[p2.js](https://github.com/schteppe/p2.js) is 2D rigid body physics engine written in JavaScript.

### Install

Copy `p2.js` into `src/plugins/` folder.

### Example

    game.module(
        'game.main'
    )
    .require(
        'engine.core',
        'plugins.p2'
    )
    .body(function() {

    PhysicsObject = game.Class.extend({
        size: 64,

        init: function(x, y) {
            // Add body and shape
            var shape = Math.random() > 0.5 ?
                new game.Circle(this.size / 2 / game.scene.world.ratio) :
                new game.Rectangle(this.size / game.scene.world.ratio, this.size / game.scene.world.ratio);

            this.body = new game.Body({
                mass: 1,
                position: [
                    x / game.scene.world.ratio,
                    y / game.scene.world.ratio
                ],
                angularVelocity: 1
            });
            this.body.addShape(shape);

            // Apply velocity
            var force = 5;
            var angle = Math.random() * Math.PI * 2;
            this.body.velocity[0] = Math.sin(angle) * force;
            this.body.velocity[1] = Math.cos(angle) * force;

            game.scene.world.addBody(this.body);
            game.scene.addTimer(5000, this.remove.bind(this));
        },

        remove: function() {
            game.scene.world.removeBody(this.body);
        }
    });

    SceneGame = game.Scene.extend({
        backgroundColor: 0x808080,

        init: function() {
            // Init world
            this.world = new game.World({gravity: [0, 9]});
            this.world.ratio = 100;

            // Add walls
            var wallShape, wallBody;

            wallShape = new game.Rectangle(50 / this.world.ratio, game.system.height * 2 / this.world.ratio);
            wallBody = new game.Body({
                position: [0, game.system.height / 2 / this.world.ratio]
            });
            wallBody.addShape(wallShape);
            this.world.addBody(wallBody);

            wallShape = new game.Rectangle(50 / this.world.ratio, game.system.height * 2 / this.world.ratio);
            wallBody = new game.Body({
                position: [game.system.width / this.world.ratio, game.system.height / 2 / this.world.ratio]
            });
            wallBody.addShape(wallShape);
            this.world.addBody(wallBody);

            wallShape = new game.Rectangle(game.system.width / this.world.ratio, 50 / this.world.ratio);
            wallBody = new game.Body({
                position: [game.system.width / 2 / this.world.ratio, game.system.height / this.world.ratio]
            });
            wallBody.addShape(wallShape);
            this.world.addBody(wallBody);

            this.addTimer(200, function() {
                var object = new PhysicsObject(game.system.width / 2, game.system.height / 2);
                game.scene.addObject(object);
            }, true);
        }
    });

    game.start();

    });