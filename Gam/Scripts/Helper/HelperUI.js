var Gam = Gam || {};
Gam.Helper = Gam.Helper || {};

Gam.Helper.ShowCoordinates = function (context, worldParams, transformation) {
    var x = 900;
    var y = 20;
    var width = 150;
    var height = 60;

    context.clearRect(x, y, width, height);
    context.fillStyle = "black";
    context.font = "12pt Monospace";
    var rect = worldParams.getTileBoundaries();

    var lx = Gam.pointer.canvasX;
    var ly = Gam.pointer.canvasY;

    var transformedBackPos = transformation.transformBack(lx, ly);
    var cartX = transformedBackPos.x;
    var cartY = transformedBackPos.y;

    if (cartX > rect.right || cartX < rect.left || cartY > rect.bottom || cartY < rect.top) {
        context.fillText("out of bounds", x, y);
    }
    else {
        context.fillText("Ort: [" + lx + "," + ly + "]", x, y);
        context.fillText("Car: [" + cartX + "," + cartY + "]", x, y + 20);
    }
    context.fillText(Gam.pointer.hoveredBox, x, y + 40);

};

(function () {
    var fpsWatch_dtArr = [];
    var x = 1100;
    var y = 20;
    var width = 50;
    var height = 10;

    Gam.Helper.showFPS = function(context, dt) {
        if (fpsWatch_dtArr.length >= 60) {
            fpsWatch_dtArr.shift();
            fpsWatch_dtArr.push(dt);
        } else {
            fpsWatch_dtArr.push(dt);
        }

        var avg_dt = 0;
        for (var i = 0; i < fpsWatch_dtArr.length; i++) {
            avg_dt += fpsWatch_dtArr[i];
        }
        avg_dt = avg_dt / fpsWatch_dtArr.length;

        context.clearRect(x, y, width, height);
        context.fillStyle = "black";
        context.font = "12pt Monospace";
        context.fillText("fps: " + Math.ceil(1 / avg_dt * 1000), 1100, y);
    };
})();
