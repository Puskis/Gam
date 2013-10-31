
var context;

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

var createCanvas = function() {
    var c = document.createElement("canvas");
    c.width = 1200;
    c.height = 600;
    c.style = "border:1px solid #000000; margin-left: auto; margin-right: auto; display: block ";
    document.body.appendChild(c);

    context = c.getContext("2d");
}();

var drawWorld = function() {
    context.fillStyle = "#A0A0A0";
    for (var i = 0; i < 400; i = i + 20) {
        for (var j = 0; j < 400; j = j + 20) {
            context.setTransform(2, 0, -0.9, 0.7, 380, 280);
            context.strokeStyle = "#DDDDDD";
            context.strokeRect(i, j, 20, 20);
        }
    }
}();


