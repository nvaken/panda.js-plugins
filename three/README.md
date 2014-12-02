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
                color: 0xff0000,
                wireframe: true
            });
            this.mesh = new game.THREE.Mesh(this.geometry, this.material);
            game.system.scene.add(this.mesh);
        },

        update: function() {
            this.mesh.rotation.x += 1 * game.system.delta;
            this.mesh.rotation.y += 2 * game.system.delta;
        }
    });

    game.createScene('Main', {
        init: function() {
            var box = new game.Box(200, 200, 200);
            this.addObject(box);

            var box = new game.Box(100, 100, 100);
            this.addObject(box);
        }
    });

    });
