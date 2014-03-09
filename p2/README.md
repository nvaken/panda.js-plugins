## p2.js plugin for Panda.js

[p2.js](https://github.com/schteppe/p2.js) 2D rigid body physics engine written in JavaScript.

### Install

Copy `p2.js` into `src/plugins/` folder.

### Usage

    game.module(
        'game.main'
    )
    .require(
        'engine.core',
        'plugins.p2'
    )
    .body(function() {

    Box = game.Class.extend({
        init: function() {
            // Add body and shape
            var boxShape = new game.Rectangle(2,1);
            this.boxBody = new game.Body({
                mass: 1,
                position: [
                    // Center on stage
                    game.system.width / 2 / game.scene.zoom,
                    game.system.height / 2 / game.scene.zoom
                ],
                angularVelocity: 1
            });
            this.boxBody.addShape(boxShape);

            // Add graphics
            this.graphics = new PIXI.Graphics();
            this.graphics.lineStyle(2 / game.scene.zoom, 0x000000);
            this.graphics.beginFill(0xff0000);
            this.graphics.drawRect(-boxShape.width / 2, -boxShape.height / 2, boxShape.width, boxShape.height);

            this.update();
            game.scene.world.addBody(this.boxBody);
            game.scene.container.addChild(this.graphics);
        },

        update: function() {
            this.graphics.position.x = this.boxBody.position[0];
            this.graphics.position.y = this.boxBody.position[1];
            this.graphics.rotation = this.boxBody.angle;
        }
    });

    SceneGame = game.Scene.extend({
        backgroundColor: 0x808080,
        zoom: 50,

        init: function() {
            // Add container
            this.container = new game.Container();
            this.container.position.x = 0;
            this.container.position.y = game.system.height;
            this.container.scale.x = this.zoom;
            this.container.scale.y = -this.zoom; // Flip container
            this.stage.addChild(this.container);

            // Init world
            this.world = new game.World();

            // Add plane
            var planeShape = new game.Plane();
            var planeBody = new game.Body({
                position: [0, 0]
            });
            planeBody.addShape(planeShape);
            this.world.addBody(planeBody);

            // Add box
            var box = new Box();
            this.addObject(box);
        }
    });

    game.start();

    });