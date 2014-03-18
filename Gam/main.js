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
        Gam.BoundRegister.callClickHandler();
        //var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
        //if (hoveredTile != null) {     
        //    var spriteData = Gam.Repositories.spriteRepo.getSpriteData("harvester");
        //    hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
        //}
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

    //setting main game parameters
    var worldParams = new Gam.World.WorldParams(1200, 600, Gam.BoxPositions.Tiles.tileCountV, Gam.BoxPositions.Tiles.tileCountH, Gam.BoxPositions.Tiles.tileSize, 170, 50);
    var axoTransformation = new Gam.World.Transformation(1, 0, -0.7, 0.6, 300, 100);

    //creating world
    Gam.mainCtx = Gam.createCanvas(worldParams.width, worldParams.height);
    Gam.Repositories.tileRepo.createTiles(worldParams, axoTransformation);

    //populate sprite repository with game buildings
    Gam.Repositories.spriteRepo.add("harvester", "img/harvester.png", 450, 36, 50, [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1, 0, 0, 0, 0], 100, 1, Gam.BuildingTypeEnum.Unit);
    Gam.Repositories.spriteRepo.add("canon", "img/canon.png", 294, 40, 50, [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1, 0], 50, 1, Gam.BuildingTypeEnum.Unit);
    Gam.Repositories.spriteRepo.add("shield", "img/shield.png", 150, 101, 150, [0], 0, 9, Gam.BuildingTypeEnum.Armour);
    Gam.Repositories.spriteRepo.add("cs", "img/cs.png", 50, 57, 50, [0], 0, 1, Gam.BuildingTypeEnum.Unit);

    //add control station
    var tile = Gam.Repositories.tileRepo.getTile(241);
    var spriteData = Gam.Repositories.spriteRepo.getSpriteData("cs");
    tile.addBuilding(new Gam.Engine.Sprite(spriteData));

    //populate image repository for using in menu and so on
    Gam.Repositories.imageRepo.add(Gam.MenuImagesEnum.menu_Build, "img/menu_Build.png", 60, 30, 30);
    Gam.Repositories.imageRepo.add(Gam.MenuImagesEnum.menu_Demolish, "img/menu_Demolish.png", 60, 30, 30);

    //create menu
    var menu = new Gam.Engine.Menu();
    //Create boxes
    var ns = Gam.BoxPositions;
    var infoList = new Gam.UI.InfoList(Gam.Engine.GameMessages.messages, Gam.mainCtx, { x: Gam.BoxPositions.InfoList.x, y: Gam.BoxPositions.InfoList.y }, Gam.BoxPositions.InfoList.width, Gam.BoxPositions.InfoList.height);
    var mainPanel = new Gam.UI.IconMenuPanel(menu.getMenuBox(Gam.MenuBoxesEnum.mainMenu), Gam.mainCtx, { x: ns.MainPanel.x, y: ns.MainPanel.y }, ns.MainPanel.width, ns.MainPanel.height);
    var buildPanel = new Gam.UI.IconMenuPanel(menu.getMenuBox(Gam.MenuBoxesEnum.buildMenu), Gam.mainCtx, { x: ns.BuildPanel.x, y: ns.BuildPanel.y }, ns.BuildPanel.width, ns.BuildPanel.height);
    var detailsPanel = new Gam.UI.DetailsPanel([menu.getMenuBox(Gam.MenuBoxesEnum.buildMenu)], Gam.mainCtx, { x: ns.DetailsPanel.x, y: ns.DetailsPanel.y }, ns.DetailsPanel.width, ns.DetailsPanel.height);

    //register all boxes (all containments, like menu, infolist, tiles and so on)
    //register position is important in multilayered boxing! first registered box is checked first, if it is within boundaries other boxes are no more checked  
    Gam.BoundRegister.register("InfoList",
        {
            left: ns.InfoList.x,
            top: ns.InfoList.y,
            right: ns.InfoList.x + ns.InfoList.width,
            bottom: ns.InfoList.y + ns.InfoList.height
        },
        null,
        function () { },
        function () { }
    );
    Gam.BoundRegister.register("DetailsPanel",
        {
            left: ns.DetailsPanel.x,
            top: ns.DetailsPanel.y,
            right: ns.DetailsPanel.x + ns.DetailsPanel.width,
            bottom: ns.DetailsPanel.y + ns.DetailsPanel.height
        },
        null,
        function () { },
        function () { }
    );
    Gam.BoundRegister.register("MainPanel",
        {
            left: ns.MainPanel.x,
            top: ns.MainPanel.y,
            right: ns.MainPanel.x + ns.MainPanel.width,
            bottom: ns.MainPanel.y + ns.MainPanel.height
        },
        null,
        mainPanel.updateMenuItemHoveredFlag.bind(mainPanel),
        mainPanel.clickHandler.bind(mainPanel),
        mainPanel.clearHoverHandler.bind(mainPanel)
    );
    Gam.BoundRegister.register("BuildPanel",
        {
            left: ns.BuildPanel.x,
            top: ns.BuildPanel.y,
            right: ns.BuildPanel.x + ns.BuildPanel.width,
            bottom: ns.BuildPanel.y + ns.BuildPanel.height
        },
        null,
        buildPanel.updateMenuItemHoveredFlag.bind(buildPanel),
        buildPanel.clickHandler.bind(buildPanel),
        buildPanel.clearHoverHandler.bind(buildPanel)
    );
    
    Gam.BoundRegister.register("Tiles",
        {
            left: ns.Tiles.x,
            top: ns.Tiles.y,
            right: ns.Tiles.x + ns.Tiles.width,
            bottom: ns.Tiles.y + ns.Tiles.height
        },
       axoTransformation,
       Gam.Repositories.tileRepo.setHoveredTilesFlag,
       function () {
           var hoveredTile = Gam.Repositories.tileRepo.getHoveredTile(axoTransformation);
           if (hoveredTile != null) {     
               var spriteData = Gam.Repositories.spriteRepo.getSpriteData("harvester");
               hoveredTile.addBuilding(new Gam.Engine.Sprite(spriteData));
           }
       },
       Gam.Repositories.tileRepo.clearAllTilesHoveredFlag
    );

    Gam.hookEventHandlers(axoTransformation);

    //start the main loop      
    animFrame(function() { animationLoop(worldParams, axoTransformation, [infoList, mainPanel, buildPanel, detailsPanel]); });
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
