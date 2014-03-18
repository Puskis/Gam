var Gam = Gam || {};
Gam.UI = Gam.UI || {};

///menuBoxes - menu boxes which supports details
Gam.UI.DetailsPanel = function (menuBoxes, context, position, width, height) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = width;
    this.height = height;
    this.menuBoxes = menuBoxes;

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

        //draw details
        for (var i = 0; i < this.menuBoxes.length; i++) {
            for (var j = 0; j < this.menuBoxes[i].length; j++) {
               if (this.menuBoxes[i][j].selected) {
                   this.context.font = "12px Arial Bold";
                   this.context.fillText(this.menuBoxes[i][j].details.Name, this.x + 20, this.y + 20);
                   this.context.font = "12px Arial";
                   this.context.fillText("Cost: ", this.x + 40, this.y + 40);
                   this.context.fillText(this.menuBoxes[i][j].details.Cost, this.x + 100, this.y + 40);
                   this.context.fillText("Income: ", this.x + 40, this.y + 55);
                   this.context.fillText(this.menuBoxes[i][j].details.Income, this.x + 100, this.y + 55);
               }
            }
        }
      
        context.restore();
    };
};