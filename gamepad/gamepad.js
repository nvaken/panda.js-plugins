game.module(
    'plugins.gamepad'
)
.require(
    'engine.scene'
)
.body(function() {
    
game.createClass('GamePad', {
    init: function(data) {
        this.index = data.index;
        this.buttons = game.copy(data.buttons);
        this.axes = game.copy(data.axes);
    },

    _buttonDown: function(index) {
        if (typeof this.buttonDownCallback === 'function') {
            this.buttonDownCallback(index);
        }
    },

    _buttonUp: function(index) {
        if (typeof this.buttonUpCallback === 'function') {
            this.buttonUpCallback(index);
        }
    },

    onButtonDown: function(callback) {
        this.buttonDownCallback = callback;
    },

    onButtonUp: function(callback) {
        this.buttonUpCallback = callback;
    },

    update: function(data) {
        for (var i = 0; i < data.buttons.length; i++) {
            if (!this.buttons[i].pressed && data.buttons[i].pressed) {
                this.buttons[i].pressed = true;
                this._buttonDown(i);
            }
            if (this.buttons[i].pressed && !data.buttons[i].pressed) {
                this.buttons[i].pressed = false;
                this._buttonUp(i);
            }
        }
        
        for (var i = 0; i < data.axes.length; i++) {
            this.axes[i] = data.axes[i];
        }
    }
});

if (navigator.getGamepads || navigator.webkitGetGamepads) {
    game.Scene.inject({
        run: function() {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
            for (var i = 0; i < gamepads.length; i++) {
                var gamepad = gamepads[i];
                if (gamepad) {
                    if (!game.gamepads[gamepad.index]) {
                        game.gamepads[gamepad.index] = new game.GamePad(gamepad);
                        game.gamepad._connect(game.gamepads[gamepad.index]);
                    }
                    else {
                        game.gamepads[gamepad.index].update(gamepad);
                    }
                }
            }
            this._super();
        }
    });
}

game.gamepads = {};

game.gamepad = {
    onConnect: function(callback) {
        this._onConnect = callback;
    },

    _connect: function(gamepad) {
        if (typeof this._onConnect === 'function') this._onConnect(gamepad);
    }
};

});
