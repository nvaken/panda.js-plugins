game.module(
    'plugins.fader'
)
.body(function() {
    
game.Fader = game.Class.extend({
    speed: 500,
    color: 0x000000,
    fading: false,
    sprite: null,
    callback: null,

    init: function(settings) {
        game.merge(this, settings);

        this.sprite = new game.Graphics();
        this.sprite.beginFill(this.color);
        this.sprite.drawRect(0, 0, game.system.width, game.system.height);
    },

    fadeIn: function(callback) {
        game.TweenEngine.stopAllForObject(this.sprite);

        this.callback = callback;
        if(this.sprite.alpha === 0) this.sprite.alpha = 1;
        game.system.stage.addChild(this.sprite);

        var tween = new game.Tween(this.sprite);
        tween.to({alpha: 0}, this.speed);
        tween.onComplete(this.fadeComplete.bind(this, true));
        tween.start();

        this.fading = true;
    },

    fadeOut: function(callback) {
        game.TweenEngine.stopAllForObject(this.sprite);

        this.callback = callback;
        if(this.sprite.alpha === 1) this.sprite.alpha = 0;
        game.system.stage.addChild(this.sprite);

        var tween = new game.Tween(this.sprite);
        tween.to({alpha: 1}, this.speed);
        tween.onComplete(this.fadeComplete.bind(this));
        tween.start();

        this.fading = true;
    },

    fadeComplete: function(remove) {
        this.fading = false;
        if(typeof(this.callback) === 'function') this.callback();
        if(remove) game.system.stage.removeChild(this.sprite);
    }
});

});