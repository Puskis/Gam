//Scripts for tile logic
var Gam = Gam || {};
Gam.Engine = Gam.Engine || {};
Gam.Repositories = Gam.Repositories || {};

Gam.Engine.Tile = function(row, column, x, y, size) {
    this.row = row;
    this.column = column;
    this.hovered = false;
    this.x = x;
    this.y = y;
    this.size = size;
    this.object = null;
};

//Repository where all tiles are stored
Gam.Repositories.tileRepo = {
    tiles: [],

    //Creates tile array by given worldParams
    createTiles: function (_worldParams) {
        for (var i = 0; i < _worldParams.tilesVertical; i++) {
            for (var j = 0; j < _worldParams.tilesHorizontal; j++) {
                var cX = _worldParams.marginLeft + j * _worldParams.tileSize;
                var cY = _worldParams.marginTop + i * _worldParams.tileSize;

                this.tiles.push(new Gam.Engine.Tile(j, i, cX, cY, _worldParams.tileSize));
            }
        }
    },
    
    //Updates tiles
    updateTiles: function(dt, transformation) {
       Gam.Repositories.tileRepo.UpdateTilesHoveredFlag(transformation);
       for (var i = 0; i < Gam.Repositories.tileRepo.tiles.length; i++) {
           if (Gam.Repositories.tileRepo.tiles[i].object != null && Gam.Repositories.tileRepo.tiles[i].object != undefined) {
               Gam.Repositories.tileRepo.tiles[i].object.update(dt);
            }
        }

    },
    
    //Draws tiles to canvas context
    drawTiles: function(_context, _transformation, _worldParams) {
        _context.save();
        _context.setTransform(_transformation.scaleX,
            _transformation.skewX,
            _transformation.skewY,
            _transformation.scaleY,
            _transformation.posX,
            _transformation.posY);

        _context.beginPath();
        _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;

        var tiles = this.tiles;

        for (var i = 0; i < tiles.length; i++) {
            _context.rect(tiles[i].x, tiles[i].y, tiles[i].size, tiles[i].size);
        }
        _context.stroke();

        var hoveredTile = this.getHoveredTile(_transformation);
        if (hoveredTile != undefined || hoveredTile != null) {
            _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyleHover;
            _context.lineWidth = 3;
            _context.strokeRect(hoveredTile.x, hoveredTile.y, hoveredTile.size, hoveredTile.size);
        }

        _context.restore();

        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].object != null) {
                tiles[i].object.draw(_context, _transformation, _worldParams.tileSize, tiles[i].x, tiles[i].y);
            }
        }
    },

    //Finds out on which tile cursor is placed curently and sets its Hovered flag
    UpdateTilesHoveredFlag: function (transformation) {
        var pointerTransformed = Gam.pointer.getTransformedPosition(transformation);
        var pX = pointerTransformed.x;
        var pY = pointerTransformed.y;

        var tX, tY;
        var tSize;

        for (var i = 0; i < this.tiles.length; i++) {
            tX = this.tiles[i].x;
            tY = this.tiles[i].y;
            tSize = this.tiles[i].size;
            if (pX > tX && pX < tX + tSize && pY > tY && pY < tY + tSize) {
                this.tiles[i].hovered = true;
            }
            else {
                this.tiles[i].hovered = false;
            }
        }
    },

    //Gets tile on which cursor resides
    getHoveredTile: function (transformation) {
        this.UpdateTilesHoveredFlag(transformation);
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].hovered) {
                return this.tiles[i];
            }
        }
        return null;
    }
};