## EasyStar.js plugin for Panda.js

http://www.easystarjs.com/

### Install

Copy `easystar.js` into `src/plugins/` folder.

### Example

    var easystar = new game.EasyStar();

    var grid = [[0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0]];

    easystar.setGrid(grid);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(0, 0, 4, 0, function( path ) {
        if (path === null) {
            alert("Path was not found.");
        } else {
            alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        }
    });

    game.scene.addObject(easystar);

### Example with tiled.js plugin

    var tilemap = new game.TileMap('desert.json');
    tilemap.addTo(game.scene.stage);

    // Get some much needed info from Tiled.js 
    // You'll need to set the Tile properties in the Tiled map editor
    // in this example these are added as "walkable" and "movementCost"
    var grid = tilemap.getLayerMatrix('layer');
    var tileData = tilemap.getTileProperties();

    // Setup EasyStar
    var easystar = new game.EasyStar();
    easystar.setGrid(grid);

    // Set the acceptable tiles and set movement cost
    var acceptableTiles = [];
    for (var i in tileData) {
        if (tileData[i].walkable === true) {
            i = parseInt(i);

            acceptableTiles.push(i + 1);
            easystar.setTileCost(i + 1, tileData[i].movementCost);
        }
    }
    easystar.setAcceptableTiles(acceptableTiles);

    easystar.findPath(18, 0, 18, 50, function( path ) {
        if (path === null) {
            alert("Path was not found.");
        } else {
            alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        }
    });
    
    game.scene.addObject(easystar);
