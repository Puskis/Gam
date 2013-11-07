var Gam = Gam || {};
Gam.UI = Gam.UI || {};


Gam.UI.InfoList = function (context, position, width, height) {
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = 250;
    this.height = 200;
    
    if (width != undefined && height != undefined) {
        this.width = width;
        this.height = height;
    }


    this.draw = function(messages) {

        context.save();

        //draw border
        context = Gam.mainCtx;
        context.strokeStyle = "#808080";
        context.beginPath();
        context.moveTo(this.x + 10, this.y);
        context.lineTo(this.x + this.width - 10, this.y);
        context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + 10, 10);
        context.lineTo(this.x + this.width, this.y + this.height - 10);
        context.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - 10, this.y + this.height, 10);
        context.lineTo(this.x + 10, this.y + this.height);
        context.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - 10, 10);
        context.lineTo(this.x, this.y + 10);
        context.arcTo(this.x, this.y, this.x + 10, this.y, 10);
        context.stroke();

        context.lineWidth = 1;
        context.font = "12px Monospace";

        //take last 12 messages and draw it on the screen
        var length = messages.length;
        for (var i = length, j=1; i >= 0 && i > length-12; i--, j++) {
            if (messages[i-1] === undefined) {
                break;
            }
            context.fillText(messages[i-1], this.x + 6, this.y + j*16);
        }

        context.restore();
    };
};
