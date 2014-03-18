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

    //Used for registering canvas bounding boxes for different modules (menu panel, tile map, etc)
Gam.BoundRegister = (function() {
    var bounds = [];

    var handler = function(handlerFunc) {
        var pointerPos = { x: Gam.pointer.canvasX, y: Gam.pointer.canvasY };
        for (var i = 0; i < bounds.length; i++) {
            if (bounds[i].trans != null) {
                pointerPos = bounds[i].trans.transformBack(Gam.pointer.canvasX,Gam.pointer.canvasY);
            }
            if (pointerPos.x > bounds[i].rect.left &&
                pointerPos.x < bounds[i].rect.right &&
                pointerPos.y > bounds[i].rect.top &&
                pointerPos.y < bounds[i].rect.bottom) {

                bounds[i][handlerFunc]();
                Gam.pointer.hoveredBox = bounds[i].control;
                return;
            }
        }
        Gam.pointer.hoveredBox = "none";
    };

    //public members
    return {
        register: function(control, boundRect, transformation, hoverHandler, clickHandler, clearHoverHandler) {
            var bound = {
                control: control,
                rect: boundRect,
                trans: transformation,

                hoverHandler: hoverHandler,
                clickHandler: clickHandler,
                clearHoverHandler: clearHoverHandler
            };
            bounds.push(bound);
        },

        callHoverHandler: function() {
            this.clearAllHovers();
            handler("hoverHandler");
        },

        callClickHandler: function() {
            handler("clickHandler");
        },

        clearAllHovers: function() {
            for (var i = 0; i < bounds.length; i++) {
                if (bounds[i].clearHoverHandler !== undefined && bounds[i].clearHoverHandler !== null) {
                    bounds[i].clearHoverHandler();
                }
            }
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

    BuildPanel: {
        x: 70,
        y: 20,
        width: 110,
        height: 200
    },
    
    InfoList: {
        x: 20,
        y: 500,
        width: 1160,
        height: 90
    },
    
    Tiles: (function() {
        var tileSize = 30;
        var tileCountH = 25;
        var tileCountV = 20;
        return {
            tileSize: tileSize,
            tileCountH: tileCountH,
            tileCountV: tileCountV,

            x: 170,
            y: 50,
            width: tileSize * tileCountH,
            height: tileSize * tileCountV
        };
    })()
};