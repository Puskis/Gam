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

//Used for registering canvas bounding boxes for different modules (menu panel, tile map, etc)
Gam.BoundRegister = {    
    bounds: [],
    
    register: function (boundRect, transformation, hoverHandler, clickHandler) {
        var bound = {
            rect: boundRect,
            transformation: transformation,
            
            hoverHandler: function(pointerPos) {
                hoverHandler(pointerPos);
            },
            clickHandler: function (pointerPos) {
                clickHandler(pointerPos);
            }          
        };
    },
    
    callHoverHandler: function(pointerPos) {
        for (var i = 0; i < this.bounds.length; i++) {
            if (this.bounds[i].transformation != null) {
                pointerPos = this.bounds[i].transformBack(pointerPos);
            }
            if (pointerPos.x > this.bounds[i].rect.left &&
                pointerPos.x < this.bounds[i].rect.right &&
                pointerPos.y > this.bounds[i].rect.top &&
                pointerPos.y < this.bounds[i].rect.bottom) {

                this.bounds[i].hoverHandler(pointerPos);
            }
        }
    },
    
    callClickHandler: function(pointerPos) {
    for (var i = 0; i < this.bounds.length; i++) {
        if (this.bounds[i].transformation != null) {
            pointerPos = this.bounds[i].transformBack(pointerPos);
        }
        if (pointerPos.x > this.bounds[i].rect.left &&
            pointerPos.x < this.bounds[i].rect.right &&
            pointerPos.y > this.bounds[i].rect.top &&
            pointerPos.y < this.bounds[i].rect.bottom) {

            this.bounds[i].clickHandler(pointerPos);
        }
    }
}
};

//Used for positioning all boxes around the canvas
Gam.BoxPositions = {    
    TilesBox: {
 
    }
};