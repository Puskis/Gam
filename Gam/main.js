
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
    context.setTransform(1, 0, -1, 1, 0, 0);

    for (var i = 400; i < 1100; i = i + 30) {
        for (var j = 0; j < 400; j = j + 30) {           
            context.strokeStyle = "#DDDDDD";
            context.strokeRect(i, j, 30, 30);
        }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);

    for (var i = 400; i < 1100; i = i + 30) {
        for (var j = 0; j < 400; j = j + 30) {
            context.strokeStyle = "#DADADA";
            context.strokeRect(i, j, 30, 30);
        }
    }
}();

var ShowCoordinates = function() {
    context.canvas.addEventListener("mousemove", function(event) {
        context.clearRect(500, 0, 150, 60);
        var boundingRect = context.canvas.getBoundingClientRect();
        context.fillStyle = "black";
        context.font = "12pt Monospace";
        var lx = (event.clientX - boundingRect.left);
        var ly = (event.clientY - boundingRect.top);
        context.fillText("Ort: [" + lx + "," + ly + "]", 510, 20);
        
       // context.transform()

        context.fillText("Axo: [" + (lx - ly) + "," + ly + "]", 510, 40);
    });
}();


