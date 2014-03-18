Gam = Gam || {};
Gam.Engine = Gam.Engine || {};


Gam.Engine.Menu = function () {
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

    imageEnum = Gam.MenuImagesEnum.menu_Build;
    mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);

    imageEnum = Gam.MenuImagesEnum.menu_Demolish;
    mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);

};

Gam.Engine.Menu.prototype.getMenuBox = function (id) {
    return this.menu[id];
};

