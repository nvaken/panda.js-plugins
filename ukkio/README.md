## Ukkio plugin for Panda.js

### Install

Copy `ukkio.json` to your game's root folder and `ukkio.js` into `src/plugins/` folder.

### Usage

    game.module(
        'game.main'
    )
    .require(
        'engine.core',
        'plugins.ukkio'
    )
    .body(function() {

    SceneGame = game.Scene.extend({
        init: function() {
            game.ukkio.on('newGame', this.gameReady.bind(this));

            game.ukkio.ready({
                verbose: true,
                user: { coins: 3 }
            });
        },

        gameReady: function() {
            // Ready to insert coin
        },

        startGame: function() {
            // Start game
        },

        gameOver: function() {
            game.ukkio.gameOver(function() {
                // Ready to insert coin
            });
        },

        insertCoin: function() {
            game.ukkio.insertCoin(function(result) {
                if(result === 'success') game.scene.startGame();
            });
        },

        exitGame: function() {
            game.ukkio.exit();
        }
    });

    game.Ukkio.apiKey = 'insert-your-apiKey-here';

    game.start();

    });