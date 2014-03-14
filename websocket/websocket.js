game.module(
    'plugins.websocket'
)
.body(function() {

game.WebSocket = game.Class.extend({
    connection: null,

    init: function() {
        game.websocket = this;
    },

    connect: function(host, port) {
        host = host || game.WebSocket.host;
        port = port || game.WebSocket.port;

        this.connection = new WebSocket('ws://' + host + ':' + port + '/');
        this.connection.onopen = this.open.bind(this);
        this.connection.onclose = this.close.bind(this);
        this.connection.onmessage = this.message.bind(this);
        this.connection.onerror = this.error.bind(this);
    },

    open: function() {
        // Connection opened
    },

    close: function() {
        // Connection closed
    },

    message: function(message) {
        // Message received
    },

    error: function(error) {
        throw(error);
    }
});

game.WebSocket.host = '';
game.WebSocket.port = '';

game.plugins.websocket = game.WebSocket;

});