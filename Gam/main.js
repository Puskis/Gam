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
            var spriteData = spriteRepo.get("canonSprite");
            hoveredTile.object = new Sprite(spriteData.frameWidth, spriteData.frameSequence, spriteData.speed, spriteData.img);
        }
    });
  
    tileRepo.createTiles(worldParams);

    spriteRepo.add("factory", "img/factory.png", 50, 25, 25, [0], 1000);
    spriteRepo.add("canonSprite", "img/canonSprite.png" , 294, 40, 50, [0,1,2,3,4,5,6,6,6,6,6,6,6,6,5,4,3,2,1,0], 50);

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
