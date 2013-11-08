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
    
    register: function (control, boundRect, hoverHandler, clickHandler) {
        var bound = {
            control: control,
            rect: boundRect,
            
            hoverHandler: function(pointerPos) {
                hoverHandler(pointerPos);
            },
            clickHandler: function (pointerPos) {
                clickHandler(pointerPos);
            }          
        };
        this.bounds.push(bound);
    },
    
    getHoverHandler: function(pointerPos) {
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
    
    getClickHandler: function(pointerPos) {
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
    },
};

//Used for positioning all boxes around the canvas
//Tiles are not included. They take all the window and are processed last if no other bounding box takes control
Gam.BoxPositions = {
    MenuPanel: {
        x: 20,
        y: 20,
        width: 50,
        height: 200
    },
    InfoList: {
        x: 20,
        y: 500,
        width: 1160,
        height: 90
    },
};