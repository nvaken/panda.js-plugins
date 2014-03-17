## Fader plugin for Panda.js

Fade between scenes.

### Install

Copy `fader.js` into `src/plugins/` folder.

### Example

```javascript
SceneGame = game.Scene.extend({
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
```

### API

Methods

- `fadeIn(callback)`

    _callback_ Function that is called, when fader is complete
    
- `fadeOut(callback)`

    _callback_ Callback function, when fader is complete

Properties

- `color` _Number_

    Color of fader _(default: 0x000000)_
    
- `speed` _Number_

    Speed of fader in ms _(default: 500)_

- `fading` _Boolean_

    Is fader currently fading _(default: false)_
