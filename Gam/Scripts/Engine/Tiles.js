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
};

Gam.Engine.Tile.prototype = {
    addBuilding: function(sprite) {
        switch (sprite.spriteType) {
        case Gam.BuildingTypeEnum.Unit:
            if (this.unit === null && (this.occupied == false || this.armour != null)) {
                    this.unit = sprite;
                    this.occupied = true;
            }
            else {
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
Gam.Repositories.tileRepo = {
    tiles: [],
    worldParams: null,

    //Creates tile array by given worldParams
    createTiles: function(worldParams, transformation) {
        this.worldParams = worldParams;
        this.transformation = transformation;
        
        for (var i = 0; i < worldParams.tilesVertical; i++) {
            for (var j = 0; j < worldParams.tilesHorizontal; j++) {
                var cX = worldParams.marginLeft + j * worldParams.tileSize;
                var cY = worldParams.marginTop + i * worldParams.tileSize;

                this.tiles.push(new Gam.Engine.Tile(i, j, cX, cY, worldParams.tileSize));
            }
        }
    },
    
    //Updates tiles
    update: function(dt) {
        for (var i = 0; i < Gam.Repositories.tileRepo.tiles.length; i++) {
            if (Gam.Repositories.tileRepo.tiles[i].unit != null && Gam.Repositories.tileRepo.tiles[i].unit != undefined) {
                Gam.Repositories.tileRepo.tiles[i].unit.update(dt);
            }
        }
    },
    
    //Draws tiles to canvas context
    draw: function(context, transformation) {

        context.save();

        context.setTransform(transformation.scaleX,
            transformation.skewX,
            transformation.skewY,
            transformation.scaleY,
            transformation.posX,
            transformation.posY);

        context.beginPath();

        //draw empty tiles
        context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;
        var tiles = this.tiles;
        for (var i = 0; i < tiles.length; i++) {
            context.rect(tiles[i].x, tiles[i].y, tiles[i].size, tiles[i].size);
        }
        context.stroke();

        //draw border across hovered tile
        var hoveredTile = this.getHoveredTile(transformation);
        if (hoveredTile != undefined || hoveredTile != null) {
            context.strokeStyle = worldStyles.worldSkewedTileStrokeStyleHover;
            context.lineWidth = 3;
            context.strokeRect(hoveredTile.x, hoveredTile.y, hoveredTile.size, hoveredTile.size);
        }

        context.restore();

        //draw sprites
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].unit != null) {
                tiles[i].unit.draw(context, transformation, this.worldParams.tileSize, tiles[i].x, tiles[i].y);
            }
            if (tiles[i].armour != null) {
                tiles[i].armour.draw(context, transformation, this.worldParams.tileSize, tiles[i].x, tiles[i].y);
            }
        }
    },

    //Finds out on which tile cursor is placed curently and sets its Hovered flag
    updateTilesHoveredFlag: function() {
        var pointerTransformed = Gam.pointer.getTransformedPosition(this.transformation);
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
            } else {
                this.tiles[i].hovered = false;
            }
        }
    },

    //Gets tile on which cursor resides
    getHoveredTile: function(transformation) {
        this.updateTilesHoveredFlag(transformation);
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].hovered) {
                return this.tiles[i];
            }
        }
        return null;
    },

    checkIfOccupied: function(tilesPosition) {
        var occupied = false;
        for (var i = 0; i < tilesPosition.length; i++) {
            var index = tilesPosition[i].row * this.worldParams.tilesHorizontal + tilesPosition[i].column;
            if (index >= 0 && index <= Gam.Repositories.tileRepo.tiles.length && tilesPosition[i].column >=0 && tilesPosition[i].column < this.worldParams.tilesHorizontal) {
                if (Gam.Repositories.tileRepo.tiles[index].unit != null || Gam.Repositories.tileRepo.tiles[index].armour != null || Gam.Repositories.tileRepo.tiles[index].occupied == true) {
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
            var index = tilesPosition[i].row * this.worldParams.tilesHorizontal + tilesPosition[i].column;
            Gam.Repositories.tileRepo.tiles[index].occupied = true;
        }
    }
};