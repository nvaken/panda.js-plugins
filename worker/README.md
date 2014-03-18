## Web Worker plugin for Panda.js

### Install

Copy `worker.js` into `src/plugins/` folder.

### Example

    var worker = new game.Worker('test.js');
    worker.onMessage(function(message) {
        console.log('Received: ' + message.data);
    });
    worker.send('hello');