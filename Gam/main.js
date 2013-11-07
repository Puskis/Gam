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
    Gam.Localization.current = Gam.Localization.english;
    Gam.Engine.GameMessages.add(Gam.Localization.current.GameStarted);

    var worldParams = new Gam.World.WorldParams(1200, 600, 20, 25, 30, 170, 50);
    var axoTransformation = new Gam.World.Transformation(1, 0, -0.7, 0.6, 300, 100);

    Gam.mainCtx = Gam.createCanvas(worldParams.width, worldParams.height);
    Gam.mainCtx.canvas.addEventListener("mousemove", function (event) { Gam.pointer.mouseLocationReader(event); });
    Gam.mainCtx.canvas.addEventListener("click", function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {     
            var spriteData = Gam.Repositories.spriteRepo.get("harvester");
            hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
        }
    });
    Gam.mainCtx.canvas.oncontextmenu = function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {
            var spriteData = Gam.Repositories.spriteRepo.get("shield");
            hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
        }
        return false;
    };
  
   Gam.Repositories.tileRepo.createTiles(worldParams);

    Gam.Repositories.spriteRepo.add("harvester", "img/harvester.png", 450, 36, 50, [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,2,1,1,2,1,2,1,2,3,4,5,6,7,8,1,1,1,1,1,0,0,0,0], 100, 1, Gam.BuildingType.Unit);
    Gam.Repositories.spriteRepo.add("canon", "img/canon.png", 294, 40, 50, [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1, 0], 50, 1, Gam.BuildingType.Unit);
    Gam.Repositories.spriteRepo.add("shield", "img/shield.png", 150, 100, 150, [0], 0, 9, Gam.BuildingType.Armour);

    //start the main loop      
    animFrame(function () { animationLoop(worldParams, axoTransformation); });
});

function mainLoop(worldParams, transformation) {
    //update timespan
    var dt = Date.now() - Gam.time;
    Gam.time = Date.now();

    //update game logic
    Gam.Repositories.tileRepo.update(dt, transformation);

    //draw frame
    Gam.mainCtx.clearRect(0, 0, worldParams.width, worldParams.height);
    Gam.Repositories.tileRepo.draw(Gam.mainCtx, transformation);

    var infoList = new Gam.UI.InfoList(Gam.mainCtx, { x: 20, y: worldParams.height - 100 }, worldParams.width-460,90);
    infoList.draw(Gam.Engine.GameMessages.messages);

    //For debugging purposes
    Gam.Helper.ShowCoordinates(Gam.mainCtx, worldParams, transformation);
    Gam.Helper.showFPS(Gam.mainCtx, worldParams, dt);
};
