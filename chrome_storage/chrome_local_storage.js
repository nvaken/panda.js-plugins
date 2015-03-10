game.module(
    'plugins.chrome_local_storage'
)
.require(
    'engine.storage'
)
.body(function() {
'use strict';

/**
    Storage manager for google chrome apps.
    @class Storage
    @extends game.Storage
**/
game.Storage = game.Storage.extend({
    // Quick store
    storageData: {},
    isChromeApp: false,

    init: function(id) {
        this.id = id;
        // Try work with chrome.storage
        try {
            var that = this;
            chrome.storage.local.get(null, function(result) {
                // Set quick store
                that.isChromeApp = true;
                for (var k in result) {
                    that.storageData[k] = result[k];
                }
            });
        } catch (err) {
        }
    },

    /**
        Set value to chrome.storage or local storage.
        @method set
        @param {String} key
        @param {*} value
    **/
    set: function(key, value) {
        if (this.isChromeApp) {
            var data = {};
            data[this.id + '.' + key] = value;

            chrome.storage.local.set(data);

            this.storageData[this.id + '.' + key] = value;
        }
        else {
            this._super(key, value);
        }
    },

    /**
        Get.
        @method get
        @param {String} key
        @param {*} [defaultValue]
        @return {*} value
    **/
    get: function(key, defaultValue) {
        if (this.isChromeApp) {
            var raw = this.storageData[this.id + '.' + key];
            if (raw === null) return defaultValue;
            return raw;
        }
        else {
            return this._super(key, defaultValue);
        }
    },

    /**
        Check if a key is in storage.
        @method has
        @param {String} key
        @return {Boolean}
    **/
    has: function(key) {
        if (this.isChromeApp) {
            return this.storageData[this.id + '.' + key] !== null;
        }
        else {
            return this._super(key);
        }
    },

    /**
        Remove key from storage.
        @method remove
        @param {String} key
    **/
    remove: function(key) {
        if (this.isChromeApp) {
            chrome.storage.local.remove(this.id + '.' + key, function (raw) {});
            delete this.storageData[this.id + '.' + key];
        }
        else {
            this._super(key);
        }
    },

    /**
        Reset storage. This removes ALL keys.
        @method reset
    **/
    reset: function() {
        if (this.isChromeApp) {
            chrome.storage.local.clear();
            this.storageData = {};
        }
        else {
            this._super();
        }
    }
});

});
