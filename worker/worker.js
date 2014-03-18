game.module(
    'plugins.worker'
)
.body(function() {
    
game.Worker = game.Class.extend({
    worker: null,
    callback: null,

    init: function(file) {
        if(!window.Worker) throw('WebWorker not supported');

        this.worker = new Worker(file);
    },

    onMessage: function(callback) {
        if(!this.worker) return;

        if(this.callback) this.worker.removeEventListener('message', this.callback, false);
        this.callback = callback;
        this.worker.addEventListener('message', this.callback, false);
    },

    send: function(data) {
        if(!this.worker) return;

        this.worker.postMessage(data);
    }
});

});