var Gam = Gam || {};
Gam.UI = Gam.UI || {};


Gam.UI.MenuPanel = function (menuItems, context, position, width, height) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = width;
    this.height = height;
    this.menuItems = menuItems;
    
    //add main menu items
    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];
        item.image = Gam.Repositories.imageRepo.get(item.imageEnum);
        item.left = this.x + (this.width - item.image.frameWidth) / 2;
        item.top = this.y + 10 + (item.image.height + 5) * i;
        item.right = item.left + item.image.frameWidth;
        item.bottom = item.top + item.image.height;
    }
    
    function getItem(pointerPos) {
        for (var i = 0; i < menuItems.length; i++) {
            var mi = menuItems[i];
            if (pointerPos.x > mi.left &&
                pointerPos.x < mi.right &&
                pointerPos.y > mi.top &&
                pointerPos.y < mi.bottom) {

                return mi;
            }
        }
        return null;
    }

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
            if (this.menuItems[i].hovered === true || this.menuItems[i].selected === true) {
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
        var mi = getItem(pointerPos);
        if (mi != null) {
            mi.hovered = true;
        }
    };

    this.clearHoverHandler = function() {
        for (var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].hovered = false;
        }
    };

    this.clickHandler = function() {
        var pointerPos = { x: Gam.pointer.canvasX, y: Gam.pointer.canvasY };
        var mi = getItem(pointerPos);
        if (mi != null) {
            for (var i = 0; i < this.menuItems.length; i++) {
                menuItems[i].selected = false;
            }
            mi.selected = true;
            
        }
    };
};
