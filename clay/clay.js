game.module(
    'plugins.clay'
)
.body(function() {

game.Clay = {};
game.Clay.debug = false;
game.Clay.hideUI = false;
game.Clay.key = '';
game.Clay.ready = false;

game.Clay.init = function(key) {
    window.Clay = window.Clay || {};
    Clay.gameKey = key || game.Clay.key;
    Clay.readyFunctions = [];
    Clay.ready = function( fn ) {
        Clay.readyFunctions.push( fn );
    };
    Clay.options = {
        debug: game.Clay.debug,
        hideUI: game.Clay.hideUI,
        fail: function() {
            console.log('Error connecting to Clay.io');
        }
    };
    Clay.ready(function() {
        game.Clay.ready = true;
    });

    ( function() {
        var clay = document.createElement('script'); clay.async = true;
        clay.src = ( 'https:' === document.location.protocol ? 'https://' : 'http://' ) + 'clay.io/api/api.js';
        var tag = document.getElementsByTagName('script')[0]; tag.parentNode.insertBefore(clay, tag);
    } )();
};

});