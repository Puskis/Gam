var Gam = Gam || {};
Gam.UI = Gam.UI || {};


Gam.UI.InfoList = function (messages, context, position, width, height) {
    this.messages = messages;
    this.context = context;
    this.x = position.x;
    this.y = position.y;
    this.width = 250;
    this.height = 200;
    
    if (width != undefined && height != undefined) {
        this.width = width;
        this.height = height;
    }


    this.draw = function() {

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

        this.context.font = "12px Monospace";

        //take last 5 messages and draw it on the screen
        var length = this.messages.length;
        for (var i = length, j=1; i >= 0 && i > length-5; i--, j++) {
            if (this.messages[i-1] === undefined) {
                break;
            }
            this.context.fillText(this.messages[i - 1], this.x + 6, this.y + j * 16);
        }

        this.context.restore();
    };
};
