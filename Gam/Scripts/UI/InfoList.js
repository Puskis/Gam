var Gam = Gam || {};
Gam.UI = Gam.UI || {};

Gam.UI.InfoList = {
    width : 200,
    height: 200,
    
    draw: function(context, position) {

        context.save();

        //draw border
        context = Gam.mainCtx;
        context.strokeStyle = "#808080";
        context.beginPath();
        context.moveTo(position.x + 10, position.y);
        context.lineTo(position.x + this.width - 10, position.y);
        context.arcTo(position.x + this.width, position.y, position.x + this.width, position.y + 10, 10);
        context.lineTo(position.x + this.width, position.y + this.height - 10);
        context.arcTo(position.x + this.width, position.y + this.height, position.x + this.width - 10, position.y + this.height, 10);
        context.lineTo(position.x + 10, position.y + this.height);
        context.arcTo(position.x, position.y + this.height, position.x, position.y + this.height - 10, 10);
        context.lineTo(position.x, position.y + 10);
        context.arcTo(position.x, position.y, position.x + 10, position.y, 10);
        context.stroke();

        context.lineWidth = 1;
        context.font = "12px Monospace";
        context.fillText("Game started...", position.x + 6, position.y + 16);

        context.restore();
    }
};
