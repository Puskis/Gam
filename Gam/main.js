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
    var animationLoop = function () {
        mainLoop();
        animFrame(animationLoop);
    };
} else {
    setInterval(mainLoop, 1000/60);
}

//Initialization
$().ready(function () {

    mainCtx = createCanvas(worldParams.width, worldParams.height);
    mainCtx.canvas.addEventListener("mousemove", function (event) { pointer.mouseLocationReader(event) });
    mainCtx.canvas.addEventListener("click", function () {
        var hoveredTile = tileRepo.getHoveredTile();
        if (hoveredTile != null) {     
            var spriteData = spriteRepo.get("canon");
            hoveredTile.object = new Sprite(spriteData.frameWidth, spriteData.frameSequence, spriteData.speed, spriteData.img);
        }
    });
    mainCtx.canvas.oncontextmenu = function () {
        var hoveredTile = tileRepo.getHoveredTile();
        if (hoveredTile != null) {
            var spriteData = spriteRepo.get("harvester");
            hoveredTile.object = new Sprite(spriteData.frameWidth, spriteData.frameSequence, spriteData.speed, spriteData.img);
        }
        return false;
    };
  
    tileRepo.createTiles(worldParams);

    spriteRepo.add("harvester", "img/harvester.png", 50, 26, 50, [0], 0);
    spriteRepo.add("canon", "img/canon.png" , 294, 40, 50, [0,1,2,3,4,5,6,6,6,6,6,6,6,6,5,4,3,2,1,0], 50);

    //start the main loop   
    animFrame(animationLoop);
});

function mainLoop() {
    var dt = Date.now() - time;
    time = Date.now();

    updateTiles(dt);

    mainCtx.clearRect(0, 0, worldParams.width, worldParams.height);
    drawTiles(mainCtx, transformation, worldParams);
    


    //For debugging purposes

    //var trans = {
    //    scaleX: 1,
    //    skewX: 0,
    //    skewY: 0,
    //    scaleY: 1,
    //    posX: 0,
    //    posY: 0
    //}
    //drawTiles(mainCtx, trans, worldParams);

    ShowCoordinates(mainCtx, worldParams, transformation);
    showFPS(mainCtx, worldParams, dt);
};
