Gam = Gam || {};
Gam.Engine = Gam.Engine || {};

//; (function () {

//    var myPrivate = 5;

//    var privateFunc = function() {
//        return myPrivate * myPrivate;
//    };

//    Gam.Engine.Menu = {
//        menu: [],
//        getMenuBox: function (id) {
//            console.log(myPrivate);
//            return this.menu[id];
//        },
//        exposed: privateFunc
//    };

//})();

//Gam.Engine.Menu.getMenuBox(5);

//var func = Gam.Engine.Menu.getMenuBox;
//// wrong
//func(5);

    Gam.Engine.Menu = function() {
        //dependencies
        var menuBoxesEnum = Gam.MenuBoxesEnum;

        this.menu = [];
        
        //Main menu panel items
        this.menu[menuBoxesEnum.mainMenu] = new Array();

        var imageEnum = Gam.MenuImagesEnum.menu_Build;
        var mi = {};
        mi.imageEnum = imageEnum,
        mi.selected = false;
        this.menu[menuBoxesEnum.mainMenu].push(mi);

        imageEnum = Gam.MenuImagesEnum.menu_Demolish;
        mi = {};
        mi.imageEnum = imageEnum;
        mi.selected = false;
        this.menu[menuBoxesEnum.mainMenu].push(mi);
        
        //build menu items
        this.menu[menuBoxesEnum.buildMenu] = new Array();
        
    };

    Gam.Engine.Menu.prototype.getMenuBox = function (id) {
        return this.menu[id];
    };

