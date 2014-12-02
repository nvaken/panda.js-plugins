game.module(
    'plugins.worker'
)
.body(function() {
    
game.createClass('Worker', {
    init: function(file) {
        if (!window.Worker) throw('Web Worker not supported');

        this.worker = new Worker(file);
    },

    onMessage: function(callback) {
        this.worker.onmessage = callback;
    },

    send: function(data) {
        this.worker.postMessage(data);
    },

    stop: function() {
        this.worker.terminate();
    }
});

});
