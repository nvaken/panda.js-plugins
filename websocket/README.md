## WebSocket plugin for Panda.js

### Install

Copy `websocket.js` into `src/plugins/` folder.

### Usage

    game.module(
        'game.main'
    )
    .require(
        'engine.core',
        'plugins.websocket'
    )
    .body(function() {

    SceneGame = game.Scene.extend({
        init: function() {
            game.websocket.open = function() {
                console.log('Connection opened');
            };

            game.websocket.message = function(message) {
                console.log('Received: ' + message.data);
            };

            game.websocket.connect('localhost', 8080);
        }
    });

    game.start();

    });