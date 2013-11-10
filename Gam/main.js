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
    var animationLoop = function (worldParams, transformation, boxes) {
        Gam.mainLoop(worldParams, transformation, boxes);
        animFrame(function () { animationLoop(worldParams, transformation, boxes); });
    };
} else {
    setInterval(Gam.mainLoop, 1000/60);
}

Gam.hookEventHandlers = function (axoTransformation) {
 Gam.mainCtx.canvas.addEventListener("mousemove", function (event) { Gam.pointer.mouseLocationReader(event); });
    Gam.mainCtx.canvas.addEventListener("click", function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {     
            var spriteData = Gam.Repositories.spriteRepo.getSpriteData("harvester");
            hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
        }
    });
    Gam.mainCtx.canvas.oncontextmenu = function () {
        var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        if (hoveredTile != null) {
            var spriteData = Gam.Repositories.spriteRepo.getSpriteData("shield");
            hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
        }
        return false;
    };

};

//Initialization
$().ready(function() {

    //setting game language
    Gam.Localization.current = Gam.Localization.english;
    Gam.Engine.GameMessages.add(Gam.Localization.current.GameStarted);

    var worldParams = new Gam.World.WorldParams(1200, 600, 20, 25, 30, 170, 50);
    var axoTransformation = new Gam.World.Transformation(1, 0, -0.7, 0.6, 300, 100);

    Gam.mainCtx = Gam.createCanvas(worldParams.width, worldParams.height);

    Gam.hookEventHandlers(axoTransformation);

    Gam.Repositories.tileRepo.createTiles(worldParams, axoTransformation);

    //populate sprite repository with game buildings
    Gam.Repositories.spriteRepo.add("harvester", "img/harvester.png", 450, 36, 50, [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1, 0, 0, 0, 0], 100, 1, Gam.BuildingTypeEnum.Unit);
    Gam.Repositories.spriteRepo.add("canon", "img/canon.png", 294, 40, 50, [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1, 0], 50, 1, Gam.BuildingTypeEnum.Unit);
    Gam.Repositories.spriteRepo.add("shield", "img/shield.png", 300, 101, 150, [0], 0, 9, Gam.BuildingTypeEnum.Armour);

    Gam.Repositories.spriteRepo.add("cs", "img/cs.png", 50, 57, 50, [0], 0, 1, Gam.BuildingTypeEnum.Unit);


    //add control station
    var tile = Gam.Repositories.tileRepo.getTile(241);
    var spriteData = Gam.Repositories.spriteRepo.getSpriteData("cs");
    tile.addBuilding(new Gam.Engine.Sprite(spriteData));

    //populate image repository for using in menu and so on
    Gam.Repositories.imageRepo.add(Gam.MenuImagesEnum.menu_Build, "img/menu_Build.png", 60, 30, 30);
    Gam.Repositories.imageRepo.add(Gam.MenuImagesEnum.menu_Demolish, "img/menu_Demolish.png", 60, 30, 30);

    //Create boxes
    var infoList = new Gam.UI.InfoList(Gam.Engine.GameMessages.messages, Gam.mainCtx, { x: Gam.BoxPositions.InfoList.x, y: Gam.BoxPositions.InfoList.y }, Gam.BoxPositions.InfoList.width, Gam.BoxPositions.InfoList.height);
    var menuPanel = new Gam.UI.MenuPanel(Gam.mainCtx, { x: Gam.BoxPositions.MenuPanel.x, y: Gam.BoxPositions.MenuPanel.y }, Gam.BoxPositions.MenuPanel.width, Gam.BoxPositions.MenuPanel.height);

    //register all boxes (all containments, like menu, infolist and so on). Tiles are considered base containment and do not need registration
    //register position is important in multilayered boxing! first registered box is checked first, if it is within boundaries other boxes are no more checked
    var ns = Gam.BoxPositions;
    Gam.BoundRegister.register("InfoList",
        {
            left: ns.InfoList.x,
            top: ns.InfoList.y,
            right: ns.InfoList.x + ns.InfoList.width,
            bottom: ns.InfoList.y + ns.InfoList.height
        },
        function() {
        }, function() {
        });
    Gam.BoundRegister.register("MenuPanel",
        {
            left: ns.MenuPanel.x,
            top: ns.MenuPanel.y,
            right: ns.MenuPanel.x + ns.MenuPanel.width,
            bottom: ns.MenuPanel.y + ns.MenuPanel.height
        },
        menuPanel.updateMenuItemHoveredFlag.bind(menuPanel),
        null,
        menuPanel.clearHoverHandler.bind(menuPanel)
    );

    //start the main loop      
    animFrame(function() { animationLoop(worldParams, axoTransformation, [infoList, menuPanel]); });
});



Gam.mainLoop = function (worldParams, transformation, boxes) {
    //update timespan
    var dt = Date.now() - Gam.time;
    Gam.time = Date.now();

    //set hovered object
    Gam.BoundRegister.callHoverHandler();

    //update game logic
    Gam.Repositories.tileRepo.update(dt);

    //draw frame
    Gam.mainCtx.clearRect(0, 0, worldParams.width, worldParams.height);
    Gam.Repositories.tileRepo.draw(Gam.mainCtx, transformation);

    //draw boxes
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draw();
    }

    //For debugging purposes
    Gam.Helper.ShowCoordinates(Gam.mainCtx, worldParams, transformation);
    Gam.Helper.showFPS(Gam.mainCtx, dt);

    //var t = new Gam.World.Transformation(1, 0, 0, 1, 0, 0);
    //Gam.Repositories.tileRepo.draw(Gam.mainCtx, t);
};
