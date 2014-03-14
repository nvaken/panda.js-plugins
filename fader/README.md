## Fader plugin for Panda.js

### Install

Copy `fader.js` into `src/plugins/` folder.

### Example

    game.module(
        'game.main'
    )
    .require(
        'engine.core',
        'plugins.fader'
    )
    .body(function() {

    SceneGame = game.Scene.extend({
        init: function() {
            var fader = new game.Fader({
                color: 0xff0000,
                speed: 2000
            });

            fader.fadeIn(function() {
                console.log('Fade completed');
            });
        }
    });

    game.start();

    });

### Docs

Methods

- fadeIn(callback)
- fadeOut(callback)

Options

- color (default: 0x000000)
- speed (default: 500)