var mainCtx;
var time;

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

    var worldParams = new WorldParams(1200, 600, 20, 25, 30, 170, 50);
    var axoTransformation = new Transformation(1, 0, -0.7, 0.6, 300, 100);

    mainCtx = createCanvas(worldParams.width, worldParams.height);
    mainCtx.canvas.addEventListener("mousemove", function (event) { pointer.mouseLocationReader(event); });
    mainCtx.canvas.addEventListener("click", function () {
        var hoveredTile = tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {     
            var spriteData = spriteRepo.get("harvester");
            hoveredTile.object = new Sprite(spriteData.frameWidth, spriteData.frameSequence, spriteData.speed, spriteData.img);
        }
    });
    mainCtx.canvas.oncontextmenu = function () {
        var hoveredTile = tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {
            var spriteData = spriteRepo.get("canon");
            hoveredTile.object = new Sprite(spriteData.frameWidth, spriteData.frameSequence, spriteData.speed, spriteData.img);
        }
        return false;
    };
  
    tileRepo.createTiles(worldParams);

    spriteRepo.add("harvester", "img/harvester.png", 450, 36, 50, [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,2,1,1,2,1,2,1,2,3,4,5,6,7,8,1,1,1,1,1,0,0,0,0], 100);
    spriteRepo.add("canon", "img/canon.png", 294, 40, 50, [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1, 0], 50);
    spriteRepo.add("shield", "img/shield.png", 150, 100, 150, [0], 0);

    //start the main loop   
    animFrame(function () { animationLoop(worldParams, axoTransformation); });
});

function mainLoop(worldParams, transformation) {
    var dt = Date.now() - time;
    time = Date.now();

    updateTiles(dt, transformation);

    mainCtx.clearRect(0, 0, worldParams.width, worldParams.height);
    drawTiles(mainCtx, transformation, worldParams);

    //For debugging purposes
    ShowCoordinates(mainCtx, worldParams, transformation);
    showFPS(mainCtx, worldParams, dt);
};
