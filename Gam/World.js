
var createCanvas = function (width, height) {
    var c = document.createElement("canvas");
    c.id = "worldCanvas";
    c.width = width;
    c.height = height;
    document.body.appendChild(c);

    var context = c.getContext("2d");
    return context;
};

var drawWorld = function (context, worldParams) {
    context.setTransform(worldParams.axonometry.scaleX,
       worldParams.axonometry.skewX,
       worldParams.axonometry.skewY,
       worldParams.axonometry.scaleY,
       worldParams.axonometry.posX,
       worldParams.axonometry.posY);

    for (var i = 0; i < worldParams.tilesHorizontal; i++) {
        for (var j = 0; j < worldParams.tilesVertical; j++) {
            context.strokeStyle = worldStyles.worldSkewedTileStrokeStyle;
            context.strokeRect(worldParams.marginLeft + i * worldParams.tileSize,
                worldParams.marginTop + j * worldParams.tileSize,
                worldParams.tileSize,
                worldParams.tileSize);
        }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);

    for (var i = 0; i < worldParams.tilesHorizontal; i++) {
        for (var j = 0; j < worldParams.tilesVertical; j++) {
            context.strokeStyle = worldStyles.worldOrtogonalTileStrokeStyle;
            context.strokeRect(worldParams.marginLeft + i * worldParams.tileSize,
                worldParams.marginTop + j * worldParams.tileSize,
                worldParams.tileSize,
                worldParams.tileSize);
        }
    }
};

