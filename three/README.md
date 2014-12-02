## three.js plugin for Panda.js

http://www.threejs.org/

### Install

Copy `three.js` into `src/plugins/` folder.

### Example

    game.module(
        'game.main'
    )
    .require(
        'plugins.three'
    )
    .body(function() {

    game.createClass('Box', {
        init: function(width, height, depth) {
            this.geometry = new game.THREE.BoxGeometry(width, height, depth);
            this.material = new game.THREE.MeshBasicMaterial({
                color: Math.round(Math.random() * 16777215),
            });
            this.mesh = new game.THREE.Mesh(this.geometry, this.material);
            game.scene.scene.add(this.mesh);
        },

        update: function() {
            this.mesh.rotation.x += 1 * game.system.delta;
            this.mesh.rotation.y += 2 * game.system.delta;
        }
    });

    game.createScene('Main', {
        init: function() {
            this.scene = new game.THREE.Scene();

            this.camera = new game.THREE.PerspectiveCamera(75, game.system.width / game.system.height, 1, 10000);
            this.camera.position.z = game.system.height;
            this.camera.position.x = game.system.width / 2;
            this.camera.position.y = game.system.height / 2;

            for (var i = 0; i < 10; i++) {
                var box = new game.Box(200, 200, 200);
                box.mesh.position.x = Math.random() * game.system.width;
                box.mesh.position.y = Math.random() * game.system.height;
                box.mesh.position.z = -Math.random() * 1000;
                this.addObject(box);
            }
        }
    });

    });
