game.module(
    'plugins.websocket'
)
.body(function() {

game.WebSocket = game.Class.extend({
    connection: null,

    init: function() {
        game.websocket = this;
    },

    connect: function(host) {
        host = host || game.WebSocket.host;
        if(!host) throw('Host not defined');

        this.connection = new WebSocket(host);
        this.connection.binaryType = game.WebSocket.binaryType;
        this.connection.onopen = this.open.bind(this);
        this.connection.onclose = this.close.bind(this);
        this.connection.onmessage = this.message.bind(this);
        this.connection.onerror = this.error.bind(this);
    },

    send: function(data) {
        this.connection.send(data);
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
        throw('Error connecting to ' + error.target.url);
    }
});

game.WebSocket.host = '';
game.WebSocket.binaryType = 'arraybuffer';

game.plugins.websocket = game.WebSocket;

});