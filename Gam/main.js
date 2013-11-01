

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

$().ready(function (context) {

    var worldParams = {
        width: 1200,
        height: 600,
        tilesVertical: 15,
        tilesHorizontal: 25,
        tileSize: 30,
        marginLeft: 225,
        marginTop: 100,

        axonometry: {
            scaleX: 1,
            skewX: 0,
            skewY: -0.8,
            scaleY: 0.7,
            posX: 250,
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
                    x * (-(this.skewX))/(this.scaleX*this.scaleY-this.skewX*this.skewY)+
                    y * (this.scaleX/(this.scaleX*this.scaleY-this.skewX*this.skewY))+
                    (-(this.scaleX*this.posY-this.skewX*this.posX)/(this.scaleX*this.scaleY-this.skewX*this.skewY))))
            }
        },

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

    var context = createCanvas(worldParams.width, worldParams.height);
    drawWorld(context, worldParams);
    ShowCoordinates(context, worldParams);


});


