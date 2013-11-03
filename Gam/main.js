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

    //create canvas and add hook mousemove event to pointer object
    mainCtx = createCanvas(worldParams.width, worldParams.height);
    mainCtx.canvas.addEventListener("mousemove", function (event) { pointer.mouseLocationReader(event) });
    mainCtx.canvas.addEventListener("click", function (event) {
        var hoveredTile = tileRepo.getHoveredTile();
        if (hoveredTile != null) {     
            hoveredTile.object = imageRepo.get("factory");
        }
    });
  
    tileRepo.createTiles(worldParams);

    //start the main loop   
    
    img_factory = new Image(50, 50);
    img_factory.src = "img/factory.png";
    img_factory.name = "factory";
    imageRepo.add(img_factory);

    animFrame(animationLoop);
});

function mainLoop() {
    var dt = Date.now() - time;
    time = Date.now();

    tileRepo.setHoveredTileFlag();

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
