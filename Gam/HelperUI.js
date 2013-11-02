
var ShowCoordinates = function (context, worldParams) {
    
        context.clearRect(0, 0, 150, 80);
        context.fillStyle = "black";
        context.font = "12pt Monospace";
        var rect = worldParams.getTileBoundaries();

        var lx = pointer.canvasX;
        var ly = pointer.canvasY;

        var cartX = worldParams.axonometry.getCartesianX(lx, ly);
        var cartY = worldParams.axonometry.getCartesianY(lx, ly);

        if (cartX > rect.right || cartX < rect.left || cartY > rect.bottom || cartY < rect.top) {
            context.fillText("out of bounds", 10,20);
        }
        else {
            context.fillText("Ort: [" + lx + "," + ly + "]", 10, 20);
            context.fillText("Axo: [" + worldParams.axonometry.getAxonometricX(lx, ly) + "," + worldParams.axonometry.getAxonometricY(lx, ly) + "]", 10, 40);
            context.fillText("Car: [" + cartX + "," + cartY + "]", 10, 60);
        }
};

(function () {
    var fpsWatch_dtArr = [];

    showFPS = function (dt) {
        if (fpsWatch_dtArr.length >= 60) {
            fpsWatch_dtArr.shift();
            fpsWatch_dtArr.push(dt);
        }
        else {
            fpsWatch_dtArr.push(dt);
        }

        var avg_dt = 0;
        for (var i = 0; i < fpsWatch_dtArr.length; i++) {
            avg_dt += fpsWatch_dtArr[i];
        }
        avg_dt = avg_dt / fpsWatch_dtArr.length;

        var context = CONTEXT;
        context.clearRect(WORLD_PARAMS.width - 100, 0, 450, 80);
        context.fillStyle = "black";
        context.font = "12pt Monospace";
        context.fillText("fps: " + Math.ceil(1 / avg_dt * 1000), WORLD_PARAMS.width - 100, 20);
    }
})();