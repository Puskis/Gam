//scripts for sprite logic

var Gam = Gam || {};
Gam.Repositories = Gam.Repositories || {};
Gam.Engine = Gam.Engine || {};

Gam.Repositories.spriteRepo = {
    objects: [],
    add: function (id, src, imageWidth, imageHeight, frameWidth, frameSequence, speed, spriteSizeInTiles, spriteType) {
        var img = new Image(imageWidth, imageHeight);
        img.src = src;
        img.loaded = false;
        img.onload = function () { this.loaded = true; };

        var spriteData = new Gam.Engine.SpriteData(id, img, frameWidth, frameSequence, speed, spriteSizeInTiles, spriteType);
        this.objects.push(spriteData);
    },

    getSpriteData: function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == id) {
                return this.objects[i];
            }
        }
        return null;
    }
};

 Gam.Engine.Sprite = function(spriteData) {
    this.currentFrame = 0,
    this.frameWidth = spriteData.frameWidth,
    this.frameSequence = spriteData.frameSequence,
    this.speed = spriteData.speed,
    this.img = spriteData.img,
    this.lastUpdated = 0;
    this.frameCount = spriteData.img.width / spriteData.frameWidth;
    this.spriteSizeInTiles = spriteData.spriteSizeInTiles;
     this.spriteType = spriteData.spriteType;
 };

 Gam.Engine.Sprite.prototype = {
     update: function(dt) {
         if (this.speed != 0) {
             if (this.lastUpdated >= this.speed) {
                 this.lastUpdated = 0;
                 this.currentFrame++;
                 if (this.currentFrame >= this.frameSequence.length) {
                     this.currentFrame = 0;
                 }
             } else {
                 this.lastUpdated += dt;
             }
         }
     },

     draw: function (context, transformation, tileSize, x, y) {
         var currentFrame = this.frameSequence[this.currentFrame];
         this._drawSprite(context, transformation, tileSize, x, y, currentFrame);
     },
     
     drawBase: function(context, transformation, tileSize, x, y) {
         var currentFramePlusOne = this.frameSequence[this.currentFrame] + 1;
         this._drawSprite(context, transformation, tileSize, x, y, currentFramePlusOne);
     },
     
     _drawSprite: function (context, transformation, tileSize, x, y, frame) {
         var pos;
         switch (this.spriteSizeInTiles) {
             case 9:
                 pos = transformation.transform(x - tileSize, y + 2 * tileSize);
                 break;
             case 1:
             default:
                 pos = transformation.transform(x, y + tileSize);
                 break;
         }
         context.drawImage(
             this.img,
             frame * this.frameWidth,
             0,
             this.frameWidth,
             this.img.height,
             pos.x,
             pos.y - this.img.height,
             this.frameWidth,
             this.img.height
         );
     }
 };

Gam.Engine.SpriteData = function (id, img, frameWidth, frameSequence, speed, spriteSizeInTiles, spriteType) {
    this.id = id;
    this.img = img;
    this.frameWidth = frameWidth;
    this.frameSequence = frameSequence;             // f.e.: [0,1,2,3,2,1,0]
    this.speed = speed;                             // miliseconds between each frame
    this.spriteSizeInTiles = spriteSizeInTiles;     //How many tiles image occupies
    this.spriteType = spriteType;
};