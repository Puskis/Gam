function WorldParams(width, height, tileVcount, tileHcount, tileSize, marginLeft, marginTop) {
    this.width = width;
    this.height = height;
    this.tilesVertical = tileVcount;
    this.tilesHorizontal = tileHcount;
    this.tileSize = tileSize;
    this.marginLeft = marginLeft;
    this.marginTop = marginTop; 
};

WorldParams.prototype = {
      getTileBoundaries: function () {
        var rect = {
            left: this.marginLeft,
            right: this.marginLeft + (this.tileSize * this.tilesHorizontal),
            top: this.marginTop,
            bottom: this.marginTop + (this.tileSize * this.tilesVertical)
        };
        return rect;
    }
};

function Transformation(scaleX, skewX, skewY, scaleY, posX, posY) {
    this.scaleX = scaleX;
    this.skewX = skewX;
    this.skewY = skewY;
    this.scaleY = scaleY;
    this.posX = posX;
    this.posY = posY;
};

Transformation.prototype = {
    transform: function(x, y) {
        return {
            x: (Math.round(x * this.scaleX + y * this.skewY + this.posX)),
            y: (Math.round(x * this.skewX + y * this.scaleY + this.posY))
        };
    },

    transformBack: function(x, y) {
        return {
            x: (Math.round(
                x * (this.scaleY / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
                    y * (-(this.skewY / (this.scaleX * this.scaleY - this.skewX * this.skewY))) +
                    (this.skewY * this.posY - this.scaleY * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY))),

            y: (Math.round(
                x * (-(this.skewX)) / (this.scaleX * this.scaleY - this.skewX * this.skewY) +
                    y * (this.scaleX / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
                    (-(this.scaleX * this.posY - this.skewX * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY))))
        };
    }
};