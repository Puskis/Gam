
var ShowCoordinates = function (_context, _worldParams, _transformations) {
    
        _context.clearRect(0, 0, 150, 80);
        _context.fillStyle = "black";
        _context.font = "12pt Monospace";
        var rect = _worldParams.getTileBoundaries();

        var lx = pointer.canvasX;
        var ly = pointer.canvasY;

        var cartX = _transformations.getCartesianX(lx, ly);
        var cartY = _transformations.getCartesianY(lx, ly);

        if (cartX > rect.right || cartX < rect.left || cartY > rect.bottom || cartY < rect.top) {
            _context.fillText("out of bounds", 10,20);
        }
        else {
            _context.fillText("Ort: [" + lx + "," + ly + "]", 10, 20);
            _context.fillText("Axo: [" + _transformations.getAxonometricX(lx, ly) + "," + _transformations.getAxonometricY(lx, ly) + "]", 10, 40);
            _context.fillText("Car: [" + cartX + "," + cartY + "]", 10, 60);
        }
};

(function () {
    var fpsWatch_dtArr = [];

    showFPS = function (_context, _worldParams, dt) {
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

        _context.clearRect(_worldParams.width - 100, 0, 450, 80);
        _context.fillStyle = "black";
        _context.font = "12pt Monospace";
        _context.fillText("fps: " + Math.ceil(1 / avg_dt * 1000), _worldParams.width - 100, 20);
    }
})();