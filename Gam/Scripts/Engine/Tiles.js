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
    this.unit = null;
    this.armour = null;
    this.occupied = false;
    this.isControlStation = false;
};

Gam.Engine.Tile.prototype = {
    addBuilding: function(sprite, isControlStation) {
        switch (sprite.spriteType) {
        case Gam.BuildingTypeEnum.Unit:
            if (this.unit === null && (this.occupied == false || this.armour != null)) {
                this.unit = sprite;
                this.occupied = true;
                if (isControlStation) {
                    this.isControlStation = true;
                }
            } else {
                Gam.Engine.GameMessages.add(Gam.Localization.current.CannotAddBuilding);
            }
            break;
        case Gam.BuildingTypeEnum.Armour:
            if (this.armour === null) {
                if (sprite.spriteSizeInTiles == 9) {
                    var neighboursOccupied = true;
                    var neighbouringTiles = [
                        { row: this.row - 1, column: this.column - 1 },
                        { row: this.row - 1, column: this.column },
                        { row: this.row - 1, column: this.column + 1 },
                        { row: this.row, column: this.column - 1 },
                        { row: this.row, column: this.column + 1 },
                        { row: this.row + 1, column: this.column - 1 },
                        { row: this.row + 1, column: this.column},
                        { row: this.row + 1, column: this.column + 1 }
                    ];
                    try {
                        neighboursOccupied = Gam.Repositories.tileRepo.checkIfOccupied(neighbouringTiles);
                    }
                    catch(exception)
                    {
                        if (exception === "OutOfBoundsException") {
                            Gam.Engine.GameMessages.add(Gam.Localization.current.CannotAddBuilding_OutOfBound);
                            return;
                        }
                    }
                    if (neighboursOccupied) {
                        Gam.Engine.GameMessages.add(Gam.Localization.current.CannotAddBuilding_NeighboursOccupied);
                        return;
                    }
                    else {
                        Gam.Repositories.tileRepo.setOccupied(neighbouringTiles);
                    }
                }
                this.armour = sprite;
                this.occupied = true;
            }
            else {
                Gam.Engine.GameMessages.add(Gam.Localization.current.CannotAddBuilding);
            }
            break;
        }
    }
};

//Repository where all tiles are stored
Gam.Repositories.tileRepo = (function() {
    var tiles = [];
    var wParams = null;
    var trans = null;

    return {
        //Creates tile array by given worldParams
        createTiles: function(worldParams, transformation) {
            wParams = worldParams;
            trans = transformation;

            for (var i = 0; i < wParams.tilesVertical; i++) {
                for (var j = 0; j < wParams.tilesHorizontal; j++) {
                    var cX = wParams.marginLeft + j * wParams.tileSize;
                    var cY = wParams.marginTop + i * wParams.tileSize;

                    tiles.push(new Gam.Engine.Tile(i, j, cX, cY, wParams.tileSize));
                }
            }
        },
    
        //Updates tiles
        update: function(dt) {
            for (var i = 0; i < tiles.length; i++) {
                if (tiles[i].unit != null && tiles[i].unit != undefined) {
                    tiles[i].unit.update(dt);
                }
            }
        },
    
        //Draws tiles to canvas context
        draw: function(context) {

            context.save();

            context.setTransform(trans.scaleX,
                trans.skewX,
                trans.skewY,
                trans.scaleY,
                trans.posX,
                trans.posY);

            context.beginPath();

            //draw empty tiles
            context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;
            for (var i = 0; i < tiles.length; i++) {
                context.rect(tiles[i].x, tiles[i].y, tiles[i].size, tiles[i].size);
            }
            context.stroke();

            //draw border across hovered tile
            var hoveredTile = this.getHoveredTile();
            if (hoveredTile != undefined || hoveredTile != null) {
                context.strokeStyle = worldStyles.worldSkewedTileStrokeStyleHover;
                context.lineWidth = 3;
                context.strokeRect(hoveredTile.x, hoveredTile.y, hoveredTile.size, hoveredTile.size);
            }

            context.restore();

            //draw sprites
            for (var i = 0; i < tiles.length; i++) {
                if (tiles[i].armour != null && tiles[i].armour.spriteSizeInTiles > 1) {
                    tiles[i].armour.drawBase(context, trans, wParams.tileSize, tiles[i].x, tiles[i].y);
                }
                if (tiles[i].unit != null) {
                    tiles[i].unit.draw(context, trans, wParams.tileSize, tiles[i].x, tiles[i].y);
                }
                if (tiles[i].armour != null) {
                    tiles[i].armour.draw(context, trans, wParams.tileSize, tiles[i].x, tiles[i].y);
                }
            }
        },

        //Finds out on which tile cursor is placed curently and sets its Hovered flag
        setHoveredTilesFlag: function() {
            var pointerTransformed = Gam.pointer.getTransformedPosition(trans);
            var pX = pointerTransformed.x;
            var pY = pointerTransformed.y;

            var tX, tY;
            var tSize;

            for (var i = 0; i < tiles.length; i++) {
                tX = tiles[i].x;
                tY = tiles[i].y;
                tSize = tiles[i].size;
                if (pX > tX && pX < tX + tSize && pY > tY && pY < tY + tSize) {
                    tiles[i].hovered = true;
                    return;
                }
            }
        },

        clearAllTilesHoveredFlag: function() {
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].hovered = false;
            }
        },

        //Gets tile on which cursor resides
        getHoveredTile: function() {
            //this.setHoveredTilesFlag();
            for (var i = 0; i < tiles.length; i++) {
                if (tiles[i].hovered) {
                    return tiles[i];
                }
            }
            return null;
        },

        getTile: function(index) {
            return tiles[index];
        },

        checkIfOccupied: function(tilesPosition) {
            var occupied = false;
            for (var i = 0; i < tilesPosition.length; i++) {
                var index = tilesPosition[i].row * wParams.tilesHorizontal + tilesPosition[i].column;
                if (index >= 0 && index <= tiles.length && tilesPosition[i].column >= 0 && tilesPosition[i].column < wParams.tilesHorizontal) {
                    if (tiles[index].unit != null || tiles[index].armour != null || tiles[index].occupied == true) {
                        occupied = true;
                    }
                } else {
                    throw "OutOfBoundsException";
                }
            }
            return occupied;
        },

        setOccupied: function(tilesPosition) {
            for (var i = 0; i < tilesPosition.length; i++) {
                var index = tilesPosition[i].row * wParams.tilesHorizontal + tilesPosition[i].column;
                tiles[index].occupied = true;
            }
        }
    };
})();