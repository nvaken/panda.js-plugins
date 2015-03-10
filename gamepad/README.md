## Gamepad plugin for Panda.js

### Install

Copy `gamepad.js` into `src/plugins/` folder.

### Example

    game.module(
        'game.main'
    )
    .require(
        'plugins.gamepad'
    )
    .body(function() {

    game.gamepad.onConnect(function(gamepad) {
        console.log('Gamepad ' + gamepad.index + ' connected');

        gamepad.onButtonDown(function(button) {
            console.log('Button ' + button + ' pressed');
        });
        gamepad.onButtonUp(function(button) {
            console.log('Button ' + button + ' released');
        });
    });

    game.createClass('Player', {
        update: function() {
            // Read gamepad axes
            if (game.gamepads[0].axes[1] === 1) {
                
            }
        }
    });

    });
