
var createCanvas = function (width, height) {
    var c = document.createElement("canvas");
    c.id = "worldCanvas";
    c.width = width;
    c.height = height;
    document.body.appendChild(c);

    return context = c.getContext("2d");
};

function drawTiles(_context, _transformation, _worldParams) {
    _context.save();
    _context.setTransform(_transformation.scaleX,
       _transformation.skewX,
       _transformation.skewY,
       _transformation.scaleY,
       _transformation.posX,
       _transformation.posY);

    _context.beginPath();
    _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;

    var tiles = tileRepo.tiles;

    for (var i = 0; i < tiles.length; i++) {
        _context.rect(tiles[i].x, tiles[i].y, tiles[i].size, tiles[i].size);
    }
    _context.stroke();

    var hoveredTile = tileRepo.getHoveredTile();
    if (hoveredTile != undefined || hoveredTile != null) {
        _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyleHover;
        _context.strokeRect(hoveredTile.x, hoveredTile.y, hoveredTile.size, hoveredTile.size);
    }

    _context.restore();

    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].object != null) {
            var pos = _transformation.transform(tiles[i].x, tiles[i].y+ _worldParams.tileSize);
            tiles[i].object.draw(_context, pos.x, pos.y);
        }
    }

    //if (hoveredTile !== undefined) {
    //   var pos = _transformation.transform(hoveredTile.x, hoveredTile.y);
    //    _context.drawImage(img_factory, pos.x-27, pos.y-32);
    //}
};

function updateTiles(dt) {
    tileRepo.setHoveredTileFlag();
    for (var i = 0; i < tileRepo.tiles.length; i++) {
        if (tileRepo.tiles[i].object != null && tileRepo.tiles[i].object != undefined) {
            tileRepo.tiles[i].object.update(dt);
        }
    }

};
