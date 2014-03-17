## WebSocket plugin for Panda.js

Use WebSocket for multiplayer games on Panda.js

### Install

Copy `websocket.js` into `src/plugins/` folder.

### Example

    SceneGame = game.Scene.extend({
        init: function() {
            game.websocket.open = this.socketOpen.bind(this);
            game.websocket.message = this.socketMessage.bind(this);
            game.websocket.connect('ws://localhost:8080');
        },

        socketOpen: function() {
            console.log('Connection opened');

            // Send binary data
            var data = new Uint8Array([0,0,2]);
            game.websocket.send(data);
        },

        socketMessage: function(message) {
            if(message.data instanceof ArrayBuffer) {
                // Receive binary data
                var data = new Uint8Array(message.data);
                console.log(data);
            } else {
                console.log('Received message ' + message.data);
            }
        }
    });