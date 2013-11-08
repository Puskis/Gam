var Gam = Gam || {};

//object used for storing mouse position. updated on each mousemove event
Gam.pointer = {
    canvasX: 0,
    canvasY: 0,
    hoveredBox: "",
    mouseLocationReader: function (event) {
        var boundingRect = Gam.mainCtx.canvas.getBoundingClientRect();
        this.canvasX = (event.clientX - boundingRect.left);
        this.canvasY = (event.clientY - boundingRect.top);
    },
    getTransformedPosition: function (transformation) {
        return transformation.transformBack(this.canvasX, this.canvasY);
    }
};

(function () {
   
    //Used for registering canvas bounding boxes for different modules (menu panel, tile map, etc)
    Gam.BoundRegister = {
        bounds: [],

        _handler: function(handlerFunc) {
            var pointerPos = { x: Gam.pointer.canvasX, y: Gam.pointer.canvasY };
            for (var i = 0; i < this.bounds.length; i++) {
                if (this.bounds[i].transformation != null) {
                    pointerPos = this.bounds[i].transformBack({ x: Gam.pointer.canvasX, y: Gam.pointer.canvasY });
                }
                if (pointerPos.x > this.bounds[i].rect.left &&
                    pointerPos.x < this.bounds[i].rect.right &&
                    pointerPos.y > this.bounds[i].rect.top &&
                    pointerPos.y < this.bounds[i].rect.bottom) {

                    this.bounds[i][handlerFunc]();
                    Gam.pointer.hoveredBox = this.bounds[i].control;
                    return;
                }
               
            }
            Gam.pointer.hoveredBox = "base";
            Gam.Repositories.tileRepo.updateTilesHoveredFlag();
        },

        register: function(control, boundRect, hoverHandler, clickHandler) {
            var bound = {
                control: control,
                rect: boundRect,

                hoverHandler: hoverHandler ,
                clickHandler: clickHandler
            };
            this.bounds.push(bound);
        },

        callHoverHandler: function() {
            this._handler("hoverHandler");
        },

        callClickHandler: function() {
            this._handler("clickHandler");
        }
    };
})();

//Used for positioning all boxes around the canvas
//Tiles are not included. They take all the window and are processed last if no other bounding box takes control
Gam.BoxPositions = {
    MenuPanel: {
        x: 20,
        y: 20,
        width: 40,
        height: 200
    },
    InfoList: {
        x: 20,
        y: 500,
        width: 1160,
        height: 90
    },
};