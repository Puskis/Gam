Gam = Gam || {};
Gam.Engine = Gam.Engine || {};


Gam.Engine.Menu = function () {
    //dependencies
    var menuBoxesEnum = Gam.MenuBoxesEnum;
    var balance = Gam.Engine.GameBalance;

    this.menu = [];

    //Main menu panel items
    this.menu[menuBoxesEnum.mainMenu] = new Array();

    var imageEnum = Gam.MenuImagesEnum.menu_Build;
    var mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);

    imageEnum = Gam.MenuImagesEnum.menu_Build;
    mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);

    imageEnum = Gam.MenuImagesEnum.menu_Build;
    mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);

    imageEnum = Gam.MenuImagesEnum.menu_Build;
    mi = {};
    mi.imageEnum = imageEnum;
    mi.selected = false;
    this.menu[menuBoxesEnum.mainMenu].push(mi);
    

    //Build submenu panel items
    this.menu[menuBoxesEnum.buildMenu] = new Array();

    var subImageEnum = Gam.MenuImagesEnum.menu_Demolish;
    var submi = {};
    submi.imageEnum = subImageEnum;
    submi.selected = false;
    submi.details = {
        Name: balance.Mine.Name,
        Cost: balance.Mine.Cost,
        Income: balance.Mine.Income
    };
    submi.subMenu = [];
    this.menu[menuBoxesEnum.buildMenu].push(submi);

    subImageEnum = Gam.MenuImagesEnum.menu_Demolish;
    submi = {};
    submi.imageEnum = subImageEnum;
    submi.selected = false;
    submi.details = {
        Name: "Standard mine",
        Cost: balance.Mine.Cost,
        Income: balance.Mine.Income
    };
    submi.subMenu = [];
    this.menu[menuBoxesEnum.buildMenu].push(submi);

    subImageEnum = Gam.MenuImagesEnum.menu_Demolish;
    submi = {};
    submi.imageEnum = subImageEnum;
    submi.selected = false;
    submi.details = {
        Name: "Big mine",
        Cost: 300,
        Income: 50
    };
    submi.subMenu = [];
    this.menu[menuBoxesEnum.buildMenu].push(submi);

    subImageEnum = Gam.MenuImagesEnum.menu_Demolish;
    submi = {};
    submi.imageEnum = subImageEnum;
    submi.selected = false;
    submi.details = {
        Name: "Not a mine",
        Cost: 50,
        Income: 0
    };
    submi.subMenu = [];
    this.menu[menuBoxesEnum.buildMenu].push(submi);

    subImageEnum = Gam.MenuImagesEnum.menu_Demolish;
    submi = {};
    submi.imageEnum = subImageEnum;
    submi.selected = false;
    submi.details = {
        Name: balance.Mine.Name,
        Cost: balance.Mine.Cost,
        Income: balance.Mine.Income
    };
    submi.subMenu = [];
    this.menu[menuBoxesEnum.buildMenu].push(submi);

};

Gam.Engine.Menu.prototype.getMenuBox = function (id) {
    return this.menu[id];
};

