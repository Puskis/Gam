var Gam = Gam || {};
Gam.World = Gam.World || {};

Gam.mainCtx = null;
Gam.time = 0;

Gam.createCanvas = function (width, height) {
    var c = document.createElement("canvas");
    c.id = "worldCanvas";
    c.width = width;
    c.height = height;
    document.body.appendChild(c);

    return c.getContext("2d");
};

//Animation loop
var animFrame = window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           null;

if (animFrame !== null) {
    time = Date.now();
    var animationLoop = function (worldParams, transformation) {
        mainLoop(worldParams, transformation);
        animFrame(function () { animationLoop(worldParams, transformation); });
    };
} else {
    setInterval(mainLoop, 1000/60);
}

//Initialization
$().ready(function () {

    var worldParams = new Gam.World.WorldParams(1200, 600, 20, 25, 30, 170, 50);
    var axoTransformation = new Gam.World.Transformation(1, 0, -0.7, 0.6, 300, 100);

    Gam.mainCtx = Gam.createCanvas(worldParams.width, worldParams.height);
    Gam.mainCtx.canvas.addEventListener("mousemove", function (event) { Gam.pointer.mouseLocationReader(event); });
    Gam.mainCtx.canvas.addEventListener("click", function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {     
            var spriteData = Gam.Repositories.spriteRepo.get("harvester");
            hoveredTile.object = new Gam.Engine.Sprite(spriteData);
        }
    });
    Gam.mainCtx.canvas.oncontextmenu = function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {
            var spriteData = Gam.Repositories.spriteRepo.get("shield");
            hoveredTile.object = new Gam.Engine.Sprite(spriteData);
        }
        return false;
    };
  
   Gam.Repositories.tileRepo.createTiles(worldParams);

    Gam.Repositories.spriteRepo.add("harvester", "img/harvester.png", 450, 36, 50, [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,2,1,1,2,1,2,1,2,3,4,5,6,7,8,1,1,1,1,1,0,0,0,0], 100, 1);
    Gam.Repositories.spriteRepo.add("canon", "img/canon.png", 294, 40, 50, [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1, 0], 50, 1);
    Gam.Repositories.spriteRepo.add("shield", "img/shield.png", 150, 100, 150, [0], 0, 9);

    //start the main loop   
    animFrame(function () { animationLoop(worldParams, axoTransformation); });
});

function mainLoop(worldParams, transformation) {
    var dt = Date.now() - Gam.time;
    Gam.time = Date.now();
    Gam.Repositories.tileRepo.updateTiles(dt, transformation);

    Gam.mainCtx.clearRect(0, 0, worldParams.width, worldParams.height);
    Gam.Repositories.tileRepo.drawTiles(Gam.mainCtx, transformation, worldParams);

    //For debugging purposes
    Gam.Helper.ShowCoordinates(Gam.mainCtx, worldParams, transformation);
    Gam.Helper.showFPS(Gam.mainCtx, worldParams, dt);
};
