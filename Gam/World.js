
var createCanvas = function (width, height) {
    var c = document.createElement("canvas");
    c.id = "worldCanvas";
    c.width = width;
    c.height = height;
    document.body.appendChild(c);

    return context = c.getContext("2d");
};

var drawWorld = function (_context, _worldParams, _transformation) {
    _context.save();
    _context.setTransform(_transformation.scaleX,
       _transformation.skewX,
       _transformation.skewY,
       _transformation.scaleY,
       _transformation.posX,
       _transformation.posY);

    var _transformerBackPos = _transformation.transformBack(pointer.canvasX, pointer.canvasY);
    var pX = _transformerBackPos.x
    var pY = _transformerBackPos.y;

    _context.clearRect(0, 0, _worldParams.width, _worldParams.height);

    for (var i = 0; i < _worldParams.tilesHorizontal; i++) {
        for (var j = 0; j < _worldParams.tilesVertical; j++) {
            var cX = _worldParams.marginLeft + i * _worldParams.tileSize;
            var cY = _worldParams.marginTop + j * _worldParams.tileSize
            
            if (pX > cX && pX < cX + _worldParams.tileSize
                && pY > cY && pY < cY + _worldParams.tileSize) {
                _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyleHover;         
            }
            else {
                _context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;
            }

            _context.strokeRect(cX, cY, _worldParams.tileSize, _worldParams.tileSize);
        }
    }
    _context.restore();

    //for (var i = 0; i < _worldParams.tilesHorizontal; i++) {
    //    for (var j = 0; j < _worldParams.tilesVertical; j++) {
    //        var cX = _worldParams.marginLeft + i * _worldParams.tileSize;
    //        var cY = _worldParams.marginTop + j * _worldParams.tileSize

    //        if (pX > cX && pX < cX + _worldParams.tileSize
    //            && pY > cY && pY < cY + _worldParams.tileSize) {
    //            _context.strokeStyle = worldStyles.worldOrtogonalTileStrokeStyleHover;
    //            //_context.lineWidth = 10;
    //        }
    //        else {
    //            _context.strokeStyle = worldStyles.worldOrtogonalTileStrokeStyle;
    //        }

    //        _context.strokeRect(cX, cY, _worldParams.tileSize, _worldParams.tileSize);
    //    }
    //}
};

