
var worldParams = {
    width: 1200,
    height: 600,
    tilesVertical: 15,
    tilesHorizontal: 27,
    tileSize: 30,
    marginLeft: 225,
    marginTop: 100,

    getTileBoundaries: function () {

        var rect = {
            left: this.marginLeft,
            right: this.marginLeft + (this.tileSize * this.tilesHorizontal),
            top: this.marginTop,
            bottom: this.marginTop + (this.tileSize * this.tilesVertical)
        }
        return rect;
    }
};

var transformations = {
    scaleX: 1,
    skewX: 0,
    skewY: -1,
    scaleY: 0.7,
    posX: 300,
    posY: 100,
    getAxonometricX: function (x, y) { return (Math.round(x * this.scaleX + y * this.skewY + this.posX)) },
    getAxonometricY: function (x, y) { return (Math.round(x * this.skewX + y * this.scaleY + this.posY)) },
    getCartesianX: function (x, y) {
        return (Math.round(
            x * (this.scaleY / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
            y * (-(this.skewY / (this.scaleX * this.scaleY - this.skewX * this.skewY))) +
            (this.skewY * this.posY - this.scaleY * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY)))
    },
    getCartesianY: function (x, y) {
        return (Math.round(
            x * (-(this.skewX)) / (this.scaleX * this.scaleY - this.skewX * this.skewY) +
            y * (this.scaleX / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
            (-(this.scaleX * this.posY - this.skewX * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY))))
    }
};

var pointer = {
    canvasX: 0,
    canvasY: 0,
    mouseLocationReader: function (event) {
        var boundingRect = mainCtx.canvas.getBoundingClientRect();
        this.canvasX = (event.clientX - boundingRect.left);
        this.canvasY = (event.clientY - boundingRect.top);
    },
};