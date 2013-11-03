//Scripts for tile logic

function Tile(row, column, x, y, size) {
    this.row = row;
    this.column = column;
    this.hovered = false;
    this.x = x;
    this.y = y;
    this.size = size;
    this.object = null;
};

var tileRepo = {
    tiles: [],

    createTiles: function (_worldParams) {
        for (var i = 0; i < _worldParams.tilesHorizontal; i++) {
            for (var j = 0; j < _worldParams.tilesVertical; j++) {
                var cX = _worldParams.marginLeft + i * _worldParams.tileSize;
                var cY = _worldParams.marginTop + j * _worldParams.tileSize

                this.tiles.push(new Tile(i, j, cX, cY, _worldParams.tileSize));
            }
        }
    },

    setHoveredTileFlag: function () {
        var pointerTransformed = pointer.getTransformedPosition(transformation);
        var pX = pointerTransformed.x;
        var pY = pointerTransformed.y;

        var tX, tY;
        var tSize;
        var hoveredTile = null;

        for (var i = 0; i < this.tiles.length; i++) {
            tX = this.tiles[i].x;
            tY = this.tiles[i].y;
            tSize = this.tiles[i].size;
            if (pX > tX && pX < tX + tSize && pY > tY && pY < tY + tSize) {
                this.tiles[i].hovered = true;
                hoveredTile = this.tiles[i];
            }
            else {
                this.tiles[i].hovered = false;
            }
        }
        return hoveredTile;
    },

    getHoveredTile: function () {
        this.setHoveredTileFlag();
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].hovered) {
                return this.tiles[i];
            }
        }
        return null;
    }
};