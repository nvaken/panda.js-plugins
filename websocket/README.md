## WebSocket plugin for Panda.js

Use WebSocket for multiplayer games on Panda.js

### Install

Copy `websocket.js` into `src/plugins/` folder.

### Example

Client

    SceneGame = game.Scene.extend({
        init: function() {
            game.websocket.open = this.socketOpen.bind(this);
            game.websocket.message = this.socketMessage.bind(this);
            game.websocket.connect('ws://localhost:5000');
        },

        socketOpen: function() {
            // Connected to server
        },

        socketMessage: function(message) {
            // Message from server
        }
    });

Server (node.js)

    var WebSocketServer = require('ws').Server;
    var port = process.env.PORT || 5000;

    var wss = new WebSocketServer({port: port});

    wss.on('connection', function(client) {
        // Client connected

        client.on('message', function(data, flags) {
            // Message from client
        });

        client.on('close', function() {
            // Client disconnected
        });

        // Send message to client
        client.send('ping');
    });