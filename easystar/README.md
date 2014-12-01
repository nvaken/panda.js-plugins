## EasyStar.js plugin for Panda.js

http://www.easystarjs.com/

### Install

Copy `easystar.js` into `src/plugins/` folder.

### Example

    var grid = [[0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0]];

    // Setup grid and add it as an object to scene to run update on it
    var easystar = new game.EasyStar();
    game.scene.addObject(easystar); 

    easystar.setGrid(grid);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(0, 0, 4, 0, function( path ) {
        if (path === null) {
            alert("Path was not found.");
        } else {
            alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        }
    });

### Combination with Tile.js plugin example

    this.tilemap = new game.TileMap('desert.json');
    this.tilemap.addTo(game.scene.stage);

    // Get some much needed info from Tiled.js 
    // You'll need to set the Tile properties in the Tiled map editor
    // in this example these are added as "walkable" and "movementCost"
    var grid = this.tilemap.getLayerMatrix('Tile Layer 1');
    var tileData = this.tilemap.getTileProperties();

    // Setup easystar
    var easystar = new game.EasyStar();
    easystar.setGrid(grid);

    // Set the acceptable tiles and set movement cost
    var acceptableTiles = [];
    for (var i in tileData) {
        if (typeof tileData[i].walkable != 'undefined' && tileData[i].walkable == true){
            i = parseInt(i);

            acceptableTiles.push(i + 1);
            easystar.setTileCost(i + 1, tileData[i].movementCost);
        }
    }
    easystar.setAcceptableTiles(acceptableTiles);
    this.addObject(easystar);

    easystar.findPath(18, 0, 18, 50, function( path ) {
        if (path === null) {
            alert("Path was not found.");
        } else {
            alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        }
    }));
