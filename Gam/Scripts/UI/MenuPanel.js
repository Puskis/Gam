var Gam = Gam || {};
Gam.UI = Gam.UI || {};


Gam.UI.MenuPanel = function (context, position) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = 50;
    this.height = 200;


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
       var image = Gam.Repositories.imageRepo.get(Gam.MenuImagesEnum.menu_Build);
       if (image != null) {
           this.context.drawImage(
               image,
               0, 0,
               image.frameWidth, image.height,
               this.x + (this.width - image.frameWidth) / 2, this.y+10,
               image.frameWidth, image.height);
        }

        context.restore();
    };
};
