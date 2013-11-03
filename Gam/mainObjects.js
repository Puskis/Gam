
var worldParams = {
    width: 1200,
    height: 600,
    tilesVertical: 20,
    tilesHorizontal: 25,
    tileSize: 30,
    marginLeft: 170,
    marginTop: 50,

    getTileBoundaries: function () {

        var rect = {
            left: this.marginLeft,
            right: this.marginLeft + (this.tileSize * this.tilesHorizontal),
            top: this.marginTop,
            bottom: this.marginTop + (this.tileSize * this.tilesVertical)
        }
        return rect;
    }
};

var transformation = {
    scaleX: 1,
    skewX: 0,
    skewY: -0.7,
    scaleY: 0.60,
    posX: 300,
    posY: 100,

    transform: function (x, y) {
        return {
            x: (Math.round(x * this.scaleX + y * this.skewY + this.posX)),
            y: (Math.round(x * this.skewX + y * this.scaleY + this.posY))
        }
    },

    transformBack: function (x, y) {
        return {
            x: (Math.round(
                x * (this.scaleY / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
                y * (-(this.skewY / (this.scaleX * this.scaleY - this.skewX * this.skewY))) +
                (this.skewY * this.posY - this.scaleY * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY))),

            y: (Math.round(
                x * (-(this.skewX)) / (this.scaleX * this.scaleY - this.skewX * this.skewY) +
                y * (this.scaleX / (this.scaleX * this.scaleY - this.skewX * this.skewY)) +
                (-(this.scaleX * this.posY - this.skewX * this.posX) / (this.scaleX * this.scaleY - this.skewX * this.skewY))))
        }
    }
};

var pointer = {
    canvasX: 0,
    canvasY: 0,
    mouseLocationReader: function (event) {
        var boundingRect = mainCtx.canvas.getBoundingClientRect();
        this.canvasX = (event.clientX - boundingRect.left);
        this.canvasY = (event.clientY - boundingRect.top);
    },
    getTransformedPosition: function (_transformation) {
        return position = _transformation.transformBack(this.canvasX, this.canvasY);
    }
};

function Tile(row, column, x, y, size) {
    this.row = row;
    this.column = column;
    this.hovered = false;
    this.x = x;
    this.y = y;
    this.size = size;
    this.object = null;
};


var spriteRepo = {
    objects: [],
    add: function (id, src, imageWidth, imageHeight, frameWidth, frameSequence, speed) {
        var img = new Image(imageWidth, imageHeight);
        img.src = src;
        img.loaded = false;
        img.onload = function () { this.loaded = true; };

        var spriteData = new SpriteData(id, img, frameWidth, frameSequence, speed);
        this.objects.push(spriteData);
    },

    get: function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == id) {
                return this.objects[i];
            }
        }
        return null;
    }
};
 
function Sprite(frameWidth, frameSequence, speed, image) {
    this.currentFrame = 0,
    this.frameWidth = frameWidth,
    this.frameSequence = frameSequence,
    this.speed = speed,
    this.img = image
    this.lastUpdated = 0;
    this.frameCount = image.width / frameWidth;
};

Sprite.prototype = {
    update: function (dt) {
        if (this.lastUpdated >= this.speed) {
            this.lastUpdated = 0;
            this.currentFrame++;
            if (this.currentFrame >= this.frameSequence.length) {
                this.currentFrame = 0;
            }
        }
        else {
            this.lastUpdated += dt;
        }
    },

    draw: function (context, x, y) {
        context = mainCtx;
        context.drawImage(
            this.img,
            this.frameSequence[this.currentFrame] * this.frameWidth,
            0,
            this.frameWidth,
            this.img.height,
            x - (this.frameWidth / 2) + 5,
            y - (this.img.height / 2) - 3,
            this.frameWidth,
            this.img.height
        );
    }
};

function SpriteData(id, img, frameWidth, frameSequence, speed) {
    this.id = id;
    this.img = img;
    this.frameWidth = frameWidth;
    this.frameSequence = frameSequence; // f.e.: [0,1,2,3,2,1,0]
    this.speed = speed;                 // miliseconds between each frame
};