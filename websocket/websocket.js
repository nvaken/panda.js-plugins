game.module(
    'plugins.websocket'
)
.body(function() {

game.createClass('WebSocket', {
    connection: null,

    connect: function(host) {
        if (!window.WebSocket) throw('WebSocket not supported');

        this.connection = new WebSocket(host || game.WebSocket.host);
        this.connection.binaryType = game.WebSocket.binaryType;
        this.connection.onopen = this.open.bind(this);
        this.connection.onclose = this.close.bind(this);
        this.connection.onmessage = this.message.bind(this);
        this.connection.onerror = this.error.bind(this);
    },

    connected: function() {
        return (this.connection.readyState === this.connection.OPEN);
    },

    send: function(data) {
        if (this.connected()) {
            this.connection.send(data);
            return true;
        }
        return false;
    },

    open: function() {},
    close: function() {},
    message: function() {},
    error: function() {}
});

game.WebSocket.host = '';
game.WebSocket.binaryType = 'arraybuffer';

game.websocket = new game.WebSocket();

});
