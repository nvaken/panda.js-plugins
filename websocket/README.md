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

                // Sending binary data
                var data = new Uint8Array([0,0,2]);
                game.websocket.send(data);
            };

            game.websocket.message = function(message) {
                if(message.data instanceof ArrayBuffer) {
                    console.log('Received binary');
                    var data = new Uint8Array(message.data);
                    console.log(data);
                } else {
                    console.log('Received message ' + message.data);
                }
            };

            game.websocket.connect('localhost', 8080);
        }
    });

    game.start();

    });