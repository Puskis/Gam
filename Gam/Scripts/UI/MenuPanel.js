var Gam = Gam || {};
Gam.UI = Gam.UI || {};


Gam.UI.MenuPanel = function (context, position, width, height) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = width;
    this.height = height;
    this.menuItems = [];

        //add "build" menu item
        var image = Gam.Repositories.imageRepo.get(Gam.MenuImagesEnum.menu_Build);
        var mi = {};
        mi.left = this.x + (this.width - image.frameWidth) / 2;
        mi.top = this.y + 10;
        mi.right = mi.left + image.frameWidth;
        mi.bottom = mi.top + image.height;
        mi.image = image;
        mi.hovered = false;
        this.menuItems.push(mi);

        //add "demolish" menu item
        image = Gam.Repositories.imageRepo.get(Gam.MenuImagesEnum.menu_Demolish);
        mi = {};
        mi.left = this.x + (this.width - image.frameWidth) / 2;
        mi.top = (this.y + 12)*2;
        mi.right = mi.left + image.frameWidth;
        mi.bottom = mi.top + image.height;
        mi.image = image;
        mi.hovered = false;
        this.menuItems.push(mi);


    this.draw = function () {

        this.context.save();
        
        //draw border
        this.context.strokeStyle = "#808080";
        this.context.beginPath();
        this.context.moveTo(this.x + 10, this.y);
        this.context.lineTo(this.x + this.width - 10, this.y);
        this.context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + 10, 10);
        this.context.lineTo(this.x + this.width, this.y + this.height - 10);
        this.context.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - 10, this.y + this.height, 10);
        this.context.lineTo(this.x + 10, this.y + this.height);
        this.context.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - 10, 10);
        this.context.lineTo(this.x, this.y + 10);
        this.context.arcTo(this.x, this.y, this.x + 10, this.y, 10);
        this.context.stroke();

        //draw menu items
        for (var i = 0; i < this.menuItems.length; i++) {
            var img = this.menuItems[i].image;
            var xStart = 0;
            if (this.menuItems[i].hovered === true) {
                xStart = img.frameWidth;
            }
            this.context.drawImage(
              img,
              xStart, 0,
              img.frameWidth, img.height,
              this.menuItems[i].left, this.menuItems[i].top,
              img.frameWidth, img.height);
        }

        context.restore();
    };

    this.updateMenuItemHoveredFlag = function() {
        var pointerPos = { x: Gam.pointer.canvasX, y: Gam.pointer.canvasY };
        for (var i = 0; i < this.menuItems.length; i++) {
            var item = this.menuItems[i];
            if (pointerPos.x > item.left &&
                pointerPos.x < item.right &&
                pointerPos.y > item.top &&
                pointerPos.y < item.bottom) {

                item.hovered = true;
                return;
            }
        }
    };

    this.clearHoverHandler = function() {
        for (var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].hovered = false;
        }
    };
};
