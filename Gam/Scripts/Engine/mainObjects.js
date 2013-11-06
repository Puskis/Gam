var Gam = Gam || {};

Gam.pointer = {
    canvasX: 0,
    canvasY: 0,
    mouseLocationReader: function (event) {
        var boundingRect = Gam.mainCtx.canvas.getBoundingClientRect();
        this.canvasX = (event.clientX - boundingRect.left);
        this.canvasY = (event.clientY - boundingRect.top);
    },
    getTransformedPosition: function (transformation) {
        return transformation.transformBack(this.canvasX, this.canvasY);
    }
};



