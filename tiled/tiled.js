game.module(
    'plugins.tiled'
)
.body(function() {

game.createClass('TileMap', {
    layers: {},
    tiles: [],
    tileWidth: 0,
    tileHeight: 0,

    /**
        Constructor tiled.js
        @method init
        @param {String} url URL to the Tiled JSON file
    **/
    init: function(url) {
        this.json = game.getJSON(url);
        if (!this.json) throw 'Tilemap JSON not found';

        this.tileWidth = this.json.tilewidth;
        this.tileHeight = this.json.tileheight;

        this.container = new game.Container();

        this._initTiles();
        this._initLayers();

        if (game.TileMap.cacheAsBitmap) this.container.cacheAsBitmap = true;
    },

    /**
        Init tiles, internal use only
        @method _initTiles
    **/
    _initTiles: function() {
        for (var i = 0; i < this.json.tilesets.length; i++) {
            var tileset = this.json.tilesets[i];

            var path = game.config.mediaFolder ? game.config.mediaFolder + '/' + tileset.image : tileset.image;

            var tilesInRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
            var tilesInCol = Math.floor(tileset.imageheight / tileset.tileheight);
            var tileCount = tilesInRow * tilesInCol;

            for (var index = 0; index < tileCount; index++) {
                var currentRow = Math.floor(index / tilesInRow);
                var currentCol = Math.floor(index % tilesInRow);

                var x = tileset.tilewidth * Math.floor(index % tilesInRow);
                x += tileset.margin;
                x += tileset.spacing * currentCol;

                var y = tileset.tileheight * Math.floor(index / tilesInRow);
                y += tileset.margin;
                y += tileset.spacing * currentRow;

                var texture = new game.Texture(game.TextureCache[path], new game.PIXI.Rectangle(x, y, tileset.tilewidth, tileset.tileheight));

                this.tiles[index] = texture;
            }
        }
    },

    /**
        Init layers, internal use only
        @method _initLayers
    **/
    _initLayers: function() {
        for (var i = 0; i < this.json.layers.length; i++) {
            var layer = this.json.layers[i];
            var container = new game.Container();

            for (var o = 0; o < layer.data.length; o++) {
                if (layer.data[o] === 0) continue;

                var tile = this.getTile(layer.data[o]);
                var x = this.tileWidth * (o % layer.width);
                var y = this.tileHeight * Math.floor(o / layer.height);
                tile.position.x = x;
                tile.position.y = y;
                tile.addTo(container);
            }

            container.position.set(layer.x, layer.y);
            container.alpha = layer.opacity;
            container.visible = layer.visible;
            if (game.TileMap.cacheLayersAsBitmap) container.cacheAsBitmap = true;
            container.addTo(this.container);

            this.layers[layer.name] = container;
        }
    },

    /**
        Creates a new tile Sprite and returns it
        @method getTile
        @param {Number} index
        @return {game.Sprite} New tile Sprite
    **/
    getTile: function(index) {
        return new game.Sprite(this.tiles[index - 1]);
    },

    /**
        Add the tiled map container to container...
        @method addTo
        @param {game.Container} container
    **/
    addTo: function(container) {
        this.container.addTo(container);
    },

    /**
        Get the layer names defined in the JSON source
        @method getLayerNames
        @return {Array} An array with the layer names
    **/
    getLayerNames: function () {
        return Object.keys(this.json.layers);
    },

    /**
        Get the tile ID at specific coordinates
        @method getTileIdAt
        @param {String} layerName The layer name from which we should get the data
        @param {Number} x x coordinate
        @param {Number} y y coordinate
        @return {Mixed} The ID or false when not found
    **/
    getTileIdAt: function (layerName, x, y) {
        var layer = this.getLayer(layerName);
        var index = y * layer.width + x;

        if (typeof layer.data[index] != 'undefined')
            return layer.data[index] - 1;
        return false;
    },

    /**
        Gets the layer's tile id's presented in a matrix style array
        @method getLayerMatrix
        @param {String} layerName The layer name from which we should get the data
        @return {Array} Multi-dimensional array, rows and columns, containing tile ID's
    **/
    getLayerMatrix: function (layerName) {
        var layer = this.getLayer(layerName);

        var colCount  = layer.width;
        var rowCount = Math.ceil(layer.data.length / colCount);
        var matrix = [];
        var i = 0;
        for (var y = 0; y < rowCount; y++) {
            var row = [];
            for (var x = 0; x < colCount; x++) {
                row.push(layer.data[i]);
                i++;
            }
            matrix.push(row);
        }
        return matrix;
    },

    /**
        Get the tile properties defined in the JSON's tilesets
        @method getLayerMatrix
        @return {Object} Tile properties object
    **/
    getTileProperties: function () {
        // @TODO Currently, the Tiled editor seems to only be able to store one
        // tileset's data to the JSON. Hopefully, this will change in the
        // future and then this should be adjusted accordingly.
        return this.json.tilesets[0].tileproperties;
    },

    /**
        Get a specific layer from the JSON file
        @method getLayer
        @return {Mixed} Layer object or false when not found
    **/
    getLayer: function (layerName) {
        for (var i = 0; i < this.json.layers.length; i++) {
            var layer = this.json.layers[i];
            if (layer.name == layerName)
                return layer;
            else
                return false;
        }
    },

    /**
        Remove the container from it's parent
        @method remove
    **/
    remove: function() {
        if (this.container.parent) this.container.parent.removeChild(this.container);
    }
});

game.TileMap.cacheLayersAsBitmap = false;
game.TileMap.cacheAsBitmap = false;

});
