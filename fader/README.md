## Fader plugin for Panda.js

Fade between scenes.

### Install

1. Copy `fader.js` into `src/plugins/` folder.

2. Require plugin from game module.

### Example

    game.module(
        'game.main'
    )
    .require(
        'plugins.fader'
    )
    .body(function() {
        
    game.createScene('Main', {
        init: function() {
            var fader = new game.Fader({
                color: 0xff0000,
                speed: 2000
            });

            fader.fadeIn(function() {
                console.log('Fade completed');
            });
        }
    });
    
    });

### Documentation

Methods

- `fadeIn(callback)`

    _callback_ Callback function, when fader is complete
    
- `fadeOut(callback)`

    _callback_ Callback function, when fader is complete

Properties

- `color` _Number_

    Color of fader _(default: 0x000000)_
    
- `speed` _Number_

    Speed of fader in ms _(default: 500)_

- `fading` _Boolean_

    Is fader currently fading _(default: false)_
