var Gam = Gam || {};
Gam.UI = Gam.UI || {};

Gam.UI.MenuPanel = function(menuItems, context, position, width, height) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = width;
    this.height = height;
    this.menuItems = menuItems;

};