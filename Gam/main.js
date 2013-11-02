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
   
    //start the main loop   
    animFrame(animationLoop);

});

function mainLoop() {
    var dt = Date.now() - time;
    time = Date.now();

    drawWorld(mainCtx, worldParams, transformation);
    
    //For debugging purposes
    ShowCoordinates(mainCtx, worldParams, transformation);
    showFPS(mainCtx, worldParams, dt);
};
