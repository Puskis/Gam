//scripts for sprite logic

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
        if (this.speed != 0) {
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
            x,
            y - this.img.height,
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